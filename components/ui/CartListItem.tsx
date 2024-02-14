"use client";

import Link from "next/link";
import Image from "next/image";
import QuantityCounter from "./QuantityCounter";
import { IUser } from "@/libs/database/models/user.model";
import { useState } from "react";
import { updateUser } from "@/libs/actions/user.action";
import { formatNumber } from "@/libs/utils";

type CartListItemProps = {
  userId: string;
  fetchedUser: IUser;
};

const CartListItem = ({ userId, fetchedUser }: CartListItemProps) => {
  // Array to hold total amounts for each cart item
  const totals =
    fetchedUser &&
    fetchedUser.cart.map((item) => {
      const total = item.price * item.quantity;
      return total;
    });

  // Use reduce to sum up the numbers
  const grandTotal =
    totals &&
    totals.reduce((a, b) => {
      return a + b;
    }, 0);

  const [showLoader, setShowLoader] = useState(false);

  const removeFromCart = async (item: UserCart) => {
    // Check if there is a current user logged in
    if (fetchedUser) {
      // Find the index of the item in the user's cart by matching the item's _id property
      const itemIndex = fetchedUser.cart.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      // If the item is found in the cart, remove it using the splice method
      if (itemIndex !== -1) {
        fetchedUser.cart.splice(itemIndex, 1);
        // Show loader
        setShowLoader(true);
      }

      // Update the user's data on the server using the updateUser function
      // Pass the updated user object and the product's path as arguments
      await updateUser(userId, fetchedUser);
      // Remove loader
      setShowLoader(false);
    }
  };

  return (
    <section className="flex gap-20 mt-6">
      <div className="flex flex-col gap-6 w-full">
        {fetchedUser.cart.length >= 1 ? (
          fetchedUser.cart.map((item) => (
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
                  user={fetchedUser}
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
            <p>{formatNumber(grandTotal!, "₦")}</p>
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
