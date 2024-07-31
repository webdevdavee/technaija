"use client";

import Link from "next/link";
import Image from "next/image";
import QuantityCounter from "../utility/QuantityCounter";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/libs/utils";
import { removeProductFromCart } from "@/libs/actions/cart.actions";
import Loader from "../ui/Loader";

type CartList = {
  userId: string;
  userCart: TCartItem[];
};

const CartListItem = ({ userId, userCart }: CartList) => {
  const pathname = usePathname();

  const [showLoader, setShowLoader] = useState(false);
  const [windowSize, setWindowSize] = useState<number>(0);

  // Array to hold total amounts for each cart item
  const totals = userCart.map((item) => {
    const total = item.price * item.quantity;
    return total;
  });

  // Use reduce to sum up the numbers
  const grandTotal = totals?.reduce((a, b) => a + b, 0);

  const removeFromCart = async (product: TCartItem) => {
    // Show loader
    setShowLoader(true);
    await removeProductFromCart({ product, userId, path: pathname });
    // Remove loader
    setShowLoader(false);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
  });

  return (
    <section className="flex gap-20 mt-6 m:flex-col">
      <div className="relative flex flex-col gap-6 w-full">
        {showLoader && (
          <section className="absolute w-full h-[13rem] flex items-center justify-center transition-[0.3] ease-in-out duration-300 bg-white opacity-70 z-[56]">
            <Loader className="loader3" />
          </section>
        )}
        {userCart.length >= 1 ? (
          userCart.map((item) => (
            <div
              key={item._id}
              className="w-full relative flex items-start gap-6 border-b-[1px] border-gray-300 pb-8 m:pb-16 xl:pb-12"
            >
              <Image
                src={item.photo}
                width={windowSize <= 290 ? 70 : 120}
                height={windowSize <= 290 ? 70 : 120}
                alt="img"
              />
              <span className="w-full flex flex-col items-start gap-6 pt-2">
                <span className="w-full flex justify-between items-center gap-3 m:flex-col m:items-start">
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
                className="absolute bottom-[28%] right-0 flex items-center gap-1 m:bottom-[7%] xl:bottom-[7%]"
                type="button"
                onClick={() => removeFromCart(item)}
              >
                <Image src="/close.svg" width={20} height={20} alt="close" />
                <p className="text-xs m:text-sm">remove</p>
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
      <div className="w-[60%] flex flex-col gap-6 m:w-full">
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
