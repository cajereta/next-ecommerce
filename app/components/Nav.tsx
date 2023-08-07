"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store/store";
import { AiFillShopping } from "react-icons/ai";
import DarkLight from "./DarkLight";

const Nav = ({ user }: Session) => {
  const cartStore = useCartStore();
  return (
    <nav className="flex justify-between items-center py-12 px-2">
      <Link href={"/"}>
        <h1 className="text-3xl">Stylized</h1>
      </Link>
      <ul className="flex items-center gap-8">
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={() => cartStore.toggleCart()}
        >
          <AiFillShopping />
          {cartStore.cart.length > 0 && (
            <span className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
              {cartStore.cart.length}
            </span>
          )}
        </li>
        <DarkLight />
        {!user && (
          <li className="bg-teal-600 py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-200 rounded-box w-72"
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>

      {cartStore.isOpen && <Cart />}
    </nav>
  );
};

export default Nav;
