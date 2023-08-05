"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store/store";
import { AiFillShopping } from "react-icons/ai";

const Nav = ({ user }: Session) => {
  const cartStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={"/"}>
        <h1>Stylized</h1>
      </Link>
      <ul className="flex items-center gap-12">
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={() => cartStore.toggleCart()}
        >
          <AiFillShopping />
          {/* //Animations */}

          {cartStore.cart.length > 0 && (
            <span className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
              {cartStore.cart.length}
            </span>
          )}
        </li>
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user.name as string}
              width={36}
              height={36}
              className="rounded-full"
            />
          </li>
        )}
      </ul>
      {/* Another animation */}
      {cartStore.isOpen && <Cart />}
    </nav>
  );
};

export default Nav;
