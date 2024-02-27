"use client";

import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { setQuickview } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";

type AlertBoxProps = {
  type: "success" | "error";
  feature: "cart" | "wishlist";
};

const AlertBox = ({ type, feature }: AlertBoxProps) => {
  const dispatch = useDispatch();

  const handleQuickviewClose = () => {
    dispatch(setQuickview(false));
    dispatch(setOverlay(false));
  };

  return (
    <section
      className={`fixed top-[7rem] right-[5rem] animate-slideIn w-fit p-4 border-[1px] ${
        type === "success" ? "border-[#65B741]" : "border-red-500"
      }  ${type === "success" ? "bg-[#C1F2B0]" : "bg-red-400"}`}
    >
      <span className="flex flex-col gap-3 items-start justify-start">
        {type === "success" && feature === "cart" && (
          <p>You have successfully added product to cart</p>
        )}
        {type === "error" && feature === "cart" && <p>Item already in cart</p>}
        {type === "success" && feature === "wishlist" && (
          <p>You have successfully added product to wishlist</p>
        )}
        {type === "error" && feature === "wishlist" && (
          <p>Item already in wishlist</p>
        )}
        {type === "success" && (
          <Link
            href={feature === "cart" ? "/cart" : "/wishlist"}
            className="flex items-center gap-2"
            onClick={handleQuickviewClose}
          >
            <p>{feature === "cart" ? "View Cart" : "View Wishlist"}</p>
            <Image
              src="/arrow-right.svg"
              width={20}
              height={20}
              alt="go to cart"
            />
          </Link>
        )}
      </span>
    </section>
  );
};

export default AlertBox;
