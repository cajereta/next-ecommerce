"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";
const OrderConfirmed = () => {
  return (
    <div>
      <div className="flex items-center justify-center my-12 text-center rounded-md">
        <h1 className="text-xl font-medium">Your order has been placed</h1>
        <h2 className="font-sm my-4">Check your email for the receipt.</h2>
        <BsCheckCircleFill size={48} className="py-8" />
      </div>
      <div>
        <Link href={"/dashboard"}>
          <button className="font-medium">Check your order</button>
        </Link>
      </div>
      <button>
        Create a new order!
      </button>
    </div>
  );
};

export default OrderConfirmed;
