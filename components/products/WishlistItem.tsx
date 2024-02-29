"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loader from "../ui/Loader";
import { TWishlistItem } from "@/libs/database/models/wishlist.model";
import { removeProductFromWishlist } from "@/libs/actions/wishlist.actions";
import { formatNumber } from "@/libs/utils";

type Wishlist = {
  userId: string;
  userWishlist: TWishlistItem[];
};

const WishlistItem = ({ userId, userWishlist }: Wishlist) => {
  const pathname = usePathname();

  const [showLoader, setShowLoader] = useState(false);

  const removeFromWishlist = async (product: UserWishlist) => {
    setShowLoader(true);
    await removeProductFromWishlist({ product, userId, path: pathname });
    // Remove loader
    setShowLoader(false);
  };

  return (
    <section className="mt-6 sm:overflow-x-scroll">
      {showLoader && (
        <section className="absolute w-full h-screen top-0 bottom-0 transition-[0.3] ease-in-out duration-300 left-0 right-0 bg-white opacity-70 z-[56]">
          <Loader className="loader" />
        </section>
      )}
      {userWishlist && userWishlist.length >= 1 ? (
        <table className="sm:w-max">
          <thead className="bg-slate-100">
            <tr>
              <th></th>
              <th></th>
              <th className="font-medium sm:text-sm">Product</th>
              <th className="font-medium sm:text-sm">Price</th>
            </tr>
          </thead>

          <tbody>
            {userWishlist.map((item) => (
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
                <td className="text-sm">{item.name}</td>
                <td className="text-sm">{formatNumber(item.price, "₦")}</td>
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
