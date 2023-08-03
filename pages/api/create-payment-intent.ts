import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AddCartType } from "@/types/AddCartType";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity!,
    0,
  );
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //Getting user

  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }
  //Get data from body
  const { items, payment_intent_id } = req.body;

  //Create order
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        image: item.image,
        price: parseFloat(item.unit_amount),
        quantity: item.quantity,
      })),
    },
  };

  if (payment_intent_id) {
    //update order
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id,
    );
    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) },
      );
      //fetch orders
      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentID: updatedIntent.id },
        include: { products: true },
      });
      if (!existingOrder) {
        res.status(400).json({ message: "Invalid Payment Intent" });
      }
      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              image: item.image,
              price: parseFloat(item.unit_amount),
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: updatedIntent });
      return;
    }
  } else {
    //create new order
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }
}
