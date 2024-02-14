"use client";

import { IUser } from "@/libs/database/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { updateUser } from "@/libs/actions/user.action";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";

type WishListProps = {
  userId: string;
  fetchedUser: IUser;
};

const WishlistItem = ({ userId, fetchedUser }: WishListProps) => {
  const pathname = usePathname();

  const [showLoader, setShowLoader] = useState(false);

  const removeFromWishlist = async (item: UserWishlist) => {
    // Check if there is a current user logged in
    if (fetchedUser) {
      // Find the index of the item in the user's wishlist by matching the item's _id property
      const itemIndex = fetchedUser.wishlist.findIndex(
        (wishlistItem) => wishlistItem._id === item._id
      );

      // If the item is found in the wishlist, remove it using the splice method
      if (itemIndex !== -1) {
        fetchedUser.wishlist.splice(itemIndex, 1);
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
    <section className="mt-6">
      {showLoader && (
        <section className="absolute w-full h-screen top-0 bottom-0 transition-[0.3] ease-in-out duration-300 left-0 right-0 bg-white opacity-70 z-[56]">
          <Loader className="loader" />
        </section>
      )}
      {fetchedUser && fetchedUser.wishlist.length >= 1 ? (
        <table>
          <thead className="bg-slate-100">
            <tr>
              <th></th>
              <th></th>
              <th className="font-medium">Product</th>
              <th className="font-medium">Price</th>
            </tr>
          </thead>

          <tbody>
            {fetchedUser.wishlist.map((item) => (
              <tr key={item._id}>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item)}
                  >
                    <Image
                      src="/close.svg"
                      width={30}
                      height={30}
                      alt="close"
                    />
                  </button>
                </td>
                <td>
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt="product-img"
                  />
                </td>
                <td>{item.name}</td>
                <td>₦{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex flex-col gap-3 items-start justify-center">
          <p className="w-full bg-[#1E85BE] text-base p-4 text-white">
            Your wishlist is empty
          </p>
          <Link
            href={"/shop"}
            className="w-fit bg-[#272829] text-white p-4 hover:bg-black hover:transition"
          >
            Return to shop
          </Link>
        </div>
      )}
    </section>
  );
};

export default WishlistItem;
