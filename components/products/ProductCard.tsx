"use client";

import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/libs/redux-state/features/product/productSlice";
import { setQuickview } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { formatNumber } from "@/libs/utils";
import { TWishlistItem } from "@/libs/database/models/wishlist.model";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/libs/actions/wishlist.actions";
import { usePathname } from "next/navigation";
import { currencyState } from "@/libs/redux-state/features/currency/currencySlice";

type CardProp = {
  type: string;
  product: IProduct;
  userWishlist: TWishlistItem[];
  userId: string;
};

type WishlistItem = { name: string; image: string; price: number };

const ProductCard = ({ type, product, userWishlist, userId }: CardProp) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const theCurrentCurrency = useSelector(currencyState);
  const { currentCurrency } = theCurrentCurrency;

  const { _id, name, price, sales_price, featured_image } = product;

  // const [convertedSalesPrice, setConvertedSalesPrice] = useState<number>();
  // const [convertedPrice, setConvertedPrice] = useState<number>();

  // const storedCurrentCurrency = localStorage.getItem("current-currency");
  // const retrivedCurrentCurrency =
  //   storedCurrentCurrency && JSON.parse(storedCurrentCurrency);

  // const storedPreviousCurrency = localStorage.getItem("previous-currency");
  // const previousCurrency =
  //   storedPreviousCurrency && JSON.parse(storedPreviousCurrency);

  // useEffect(() => {
  //   const getConvertedValue = async () => {
  //     const convertedCurrency = await convertCurrency({
  //       salesPrice: sales_price,
  //       price: price,
  //       currentCurrency: retrivedCurrentCurrency.text,
  //       previousCurrency: previousCurrency.text,
  //     });

  //     setConvertedSalesPrice(convertedCurrency?.convertedSalePrice);
  //     setConvertedPrice(convertedCurrency?.convertedPrice);
  //   };
  //   getConvertedValue();
  // }, [currentCurrency]);

  const [itemExists, setItemExists] = useState(false);
  const [showIconLoader, setShowIconLoader] = useState(false);

  const handleQuickview = () => {
    dispatch(setProduct(product));
    dispatch(setQuickview(true));
    dispatch(setOverlay(true));
    document.body.classList.add("no_scroll");
  };

  // Check if the index of the product or item exists in user's wishlist
  const existingItem = userWishlist.find((item) => {
    return item.name === name;
  });

  useEffect(() => {
    if (existingItem) {
      setItemExists(true);
    } else {
      setItemExists(false);
    }
  }, [existingItem]);

  const addToWishlist = async (product: IProduct) => {
    // If item exists in wishlist
    if (existingItem) {
      setShowIconLoader(true);
      // Remove item from wishlist
      await removeProductFromWishlist({
        product: existingItem,
        userId,
        path: pathname,
      });
      setShowIconLoader(false);
    }
    // If item does not exist in wishlist
    else {
      // Create an object of type WishlistItem with the product's details
      const wishlistProduct: WishlistItem = {
        name: product.name,
        price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
        image: product.featured_image,
      };

      setShowIconLoader(true);
      // Add wishlistProduct to userWishlist array
      await addProductToWishlist({
        product: wishlistProduct,
        userId,
        path: pathname,
      });
      setShowIconLoader(false);
    }
  };

  return (
    <section className="w-fit group">
      <div className="relative mb-4 overflow-hidden">
        <Link href={`/product/${_id}`}>
          <Image
            width={type === "shop" ? 170 : 270}
            height={type === "shop" ? 570 : 670}
            quality={100}
            src={featured_image}
            alt="product"
            style={{ objectFit: "cover" }}
          />
        </Link>
        <div
          className="absolute bg-white drop-shadow-md p-2 transition duration-300 cursor-pointer top-[5%] right-[10%] rounded-full hover:bg-gray-100 translate-x-[1000%] group-hover:-translate-x-0 group-hover:transition group-hover:duration-300"
          onClick={() => addToWishlist(product)}
        >
          {showIconLoader ? (
            <Image
              className="animate-spin"
              width={20}
              height={20}
              src="/loading-spinner.svg"
              alt="wishlist"
            />
          ) : itemExists ? (
            <Image
              width={20}
              height={20}
              src="/full-heart-black.svg"
              alt="wishlist"
            />
          ) : (
            <Image width={20} height={20} src="/heart.svg" alt="wishlist" />
          )}
        </div>
        <button
          type="button"
          className="absolute translate-y-full transition duration-500 bg-[#272829] w-full p-2 cursor-pointer group-hover:-translate-y-full group-hover:transition group-hover:duration-500"
        >
          <p
            className="text-white capitalize text-center text-sm"
            onClick={handleQuickview}
          >
            quick view
          </p>
        </button>
      </div>
      <div>
        <Link href={`/product/${_id}`}>
          <p className="capitalize text-center font-semibold">{name}</p>
        </Link>
        <div className="text-center">
          {sales_price ? (
            <div>
              <span className="line-through font-medium text-red-500">
                {formatNumber(price, "₦")}
              </span>{" "}
              <span className="ml-3">{formatNumber(sales_price, "₦")}</span>
            </div>
          ) : (
            <p>{formatNumber(price, "₦")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
