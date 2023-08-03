"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import formatPrice from "@/utils/PriceFormat";
import { useCartStore } from "@/store/store";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity!,
    0,
  );

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setIsLoading(false);
      });
  };

  return (
    <form className="text-gray-600" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold">Total: {formattedPrice}</h1>
      <button
        className={`py-2 mt-4 w-full bg-teal-700 rounded-md text-white disabled:opacity-50`}
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing ...</span> : <span>Pay now</span>}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
