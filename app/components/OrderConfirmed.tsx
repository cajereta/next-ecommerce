"use client";

import { useCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";
import { useEffect } from "react";

const OrderConfirmed = () => {
  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const handleCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };

  const cartStore = useCartStore();
  return (
    <div>
      <div className="flex items-center justify-center my-12 text-center rounded-md">
        <h1 className="text-xl font-medium">Your order has been placed</h1>
        <h2 className="font-sm my-4">Check your email for the receipt.</h2>
        <BsCheckCircleFill size={48} className="py-8" />
        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button
              className="font-medium"
              onClick={handleCheckoutOrder}
            >
              Check your order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
