"use client";

import Image from "next/image";
import Link from "next/link";
import QuantityCounter from "./QuantityCounter";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import Loader from "../ui/Loader";
import { slideInCartState } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { formatNumber } from "@/libs/utils";
import { TCartItem } from "@/libs/database/models/cart.model";
import { removeProductFromCart } from "@/libs/actions/cart.actions";
import { usePathname } from "next/navigation";

type SlideInCartProps = {
  userId: string;
  userCart: TCartItem[];
};

const SlideInCart = ({ userId, userCart }: SlideInCartProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const theCart = useSelector(slideInCartState);
  const { showSlideInCart } = theCart;

  const [showLoader, setShowLoader] = useState(false);

  // Array to hold total amounts for each cart item
  const totals = userCart?.map((item) => {
    const total = item.price * item.quantity;
    return total;
  });

  // Use reduce to sum up the numbers
  const grandTotal =
    totals &&
    totals.reduce((a, b) => {
      return a + b;
    }, 0);

  // Close cart
  const handleCloseCart = () => {
    dispatch(setOverlay(false));
    dispatch(setSlideInCart(false));
    document.body.classList.remove("no_scroll");
  };

  const removeFromCart = async (product: UserCart) => {
    // Show loader
    setShowLoader(true);
    await removeProductFromCart({ product, userId, path: pathname });
    // Remove loader
    setShowLoader(false);
  };

  const windowSize = window.innerWidth;

  return (
    <section
      className="w-[35%] bottom-0 fixed top-0 right-0 ease-in-out transition duration-300 p-4 bg-white z-[56] drop-shadow-md animate-slideIn m:w-[100%] xl:w-[50%]"
      style={{ display: showSlideInCart ? "block" : "none" }}
    >
      <div>
        <div className="relative">
          <h1 className="border-b-[1px] p-4 text-center">Your Cart</h1>
          <button type="button">
            <Image
              className="absolute top-[15%] right-[5%]"
              src="/close.svg"
              width={30}
              height={30}
              alt="close"
              onClick={handleCloseCart}
            />
          </button>
        </div>
        <div className="custom-scrollbar overflow-y-scroll h-[19rem] w-full flex flex-col gap-4 items-start">
          {showLoader && (
            <section className="absolute w-full h-screen top-0 bottom-0 transition-[0.3] ease-in-out duration-300 left-0 right-0 bg-white opacity-70 z-[56]">
              <Loader className="loader3" />
            </section>
          )}
          {userCart.length >= 1 ? (
            userCart.map((item) => (
              <div
                key={item._id}
                className="w-full relative flex items-start gap-6 border-b-[1px] border-gray-300 pb-8 sm:pb-12 xl:pb-12"
              >
                <Image
                  src={item.photo}
                  width={windowSize && windowSize <= 290 ? 70 : 120}
                  height={windowSize && windowSize <= 290 ? 70 : 120}
                  alt="img"
                />
                <span className="flex flex-col items-start gap-6 pt-2">
                  <span className="flex flex-col gap-3">
                    <p className="text-sm capitalize font-semibold">
                      {item.name} - {item.model}
                    </p>
                    <p className="capitalize text-sm font-normal">
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
                  className="absolute bottom-[28%] right-2 flex items-center gap-1 m:bottom-[8%] sm:bottom-[4%] xl:bottom-[4%]"
                  type="button"
                  onClick={() => removeFromCart(item)}
                >
                  <Image src="/close.svg" width={20} height={20} alt="close" />
                  <p className="text-xs">remove</p>
                </button>
              </div>
            ))
          ) : (
            <div className="no_cart_item w-full flex flex-col gap-3 items-center justify-center">
              <p className="text-xl">Your cart is empty</p>
              <Link
                href={"/shop"}
                className="bg-[#272829] text-white p-4 w-fit hover:bg-black hover:transition"
                onClick={handleCloseCart}
              >
                Go shopping
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-12 mt-6">
          <span className="flex items-center justify-between">
            <p className="text-base capitalize text-black">Subtotal:</p>
            <p className="text-base capitalize text-black">
              {formatNumber(grandTotal, "₦")}
            </p>
          </span>
          <span className="w-full flex flex-col gap-2">
            <Link
              className="bg-[#272829] text-white capitalize p-4 text-center hover:bg-black hover:transition hover:duration-200"
              href={"/cart"}
              onClick={handleCloseCart}
            >
              View Cart
            </Link>
            <Link
              className="border-[1px] border-gray-400 bg-transparent capitalize p-4 text-center"
              href={"/checkout"}
              onClick={handleCloseCart}
              style={{
                display: userCart.length === 0 || !userCart ? "none" : "block",
              }}
            >
              Checkout
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SlideInCart;
