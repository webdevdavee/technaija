"use client";

import Link from "next/link";
import Image from "next/image";
import QuantityCounter from "./QuantityCounter";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/libs/utils";
import { TCartItem } from "@/libs/database/models/cart.model";
import { removeProductFromCart } from "@/libs/actions/cart.actions";
import Loader from "../ui/Loader";

type CartList = {
  userId: string;
  userCart: TCartItem[];
};

const CartListItem = ({ userId, userCart }: CartList) => {
  const pathname = usePathname();

  const [showLoader, setShowLoader] = useState(false);

  // Array to hold total amounts for each cart item
  const totals = userCart.map((item) => {
    const total = item.price * item.quantity;
    return total;
  });

  // Use reduce to sum up the numbers
  const grandTotal =
    totals &&
    totals.reduce((a, b) => {
      return a + b;
    }, 0);

  const removeFromCart = async (product: UserCart) => {
    // Show loader
    setShowLoader(true);
    await removeProductFromCart({ product, userId, path: pathname });
    // Remove loader
    setShowLoader(false);
  };

  return (
    <section className="flex gap-20 mt-6">
      <div className="flex flex-col gap-6 w-full">
        {showLoader && (
          <section className="absolute w-full h-full top-0 bottom-0 left-0 right-0 transition-[0.3] ease-in-out duration-300 bg-white opacity-70 z-[56]">
            <Loader className="loader" />
          </section>
        )}
        {userCart.length >= 1 ? (
          userCart.map((item) => (
            <div
              key={item._id}
              className="w-full relative flex items-start gap-6 border-b-[1px] border-gray-300 pb-8"
            >
              <Image src={item.photo} width={120} height={120} alt="img" />
              <span className="w-full flex flex-col items-start gap-6 pt-2">
                <span className="w-full flex justify-between items-center gap-3">
                  <p className="text-sm capitalize font-semibold">
                    {item.name} - {item.model}
                  </p>
                  <p className="capitalize text-base font-medium">
                    {formatNumber(item.price, "₦")}
                  </p>
                </span>
                <QuantityCounter
                  item={item}
                  type="cart"
                  quantity={item.quantity}
                  setShowLoader={setShowLoader}
                />
              </span>
              <button
                className="absolute bottom-[28%] right-0 flex items-center gap-1"
                type="button"
                onClick={() => removeFromCart(item)}
              >
                <Image src="/close.svg" width={20} height={20} alt="close" />
                <p className="text-xs">remove</p>
              </button>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col gap-3 items-start justify-center">
            <p className="w-full bg-[#1E85BE] text-base p-4 text-white">
              Your cart is empty
            </p>
            <Link
              href={"/shop"}
              className="w-fit bg-[#272829] text-white p-4 hover:bg-black hover:transition"
            >
              Return to shop
            </Link>
          </div>
        )}
      </div>
      <div className="w-[60%] flex flex-col gap-6 sticky">
        <div className="w-full p-4 bg-[#F5F5F5]">
          <span className="flex justify-between items-center gap-12 border-b-[1px] border-gray-300 p-4">
            <p>Total</p>
            <p>{formatNumber(grandTotal, "₦")}</p>
          </span>
          <span className="flex justify-between items-center">
            <p></p>
            <p></p>
          </span>
        </div>
        <Link
          href={"/checkout"}
          className="bg-[#272829] text-center text-white p-3 w-full hover:bg-black hover:transition"
        >
          Proceed to checkout
        </Link>
      </div>
    </section>
  );
};

export default CartListItem;
