"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { setSlideInSearch } from "@/libs/redux-state/features/slide-in-search/slideInSearch";

const BottomNav = () => {
  const dispatch = useDispatch();

  const handleOpenCart = () => {
    dispatch(setSlideInCart(true));
    dispatch(setOverlay(true));
    document.body.classList.add("no_scroll");
  };

  const handleOpenSearch = () => {
    dispatch(setSlideInSearch(true));
    dispatch(setOverlay(true));
    document.body.classList.add("no_scroll");
  };

  return (
    <section className="fixed drop-shadow-2xl bottom-0 w-full p-3 bg-white flex items-center justify-between gap-3 z-50 xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
      <Link className="flex flex-col items-center" href="/">
        <Image src="/home.svg" width={20} height={20} alt="home" />
        <p className="text-sm">Home</p>
      </Link>
      <div
        className="flex flex-col items-center"
        onClick={() => handleOpenSearch()}
      >
        <Image src="/search.svg" width={20} height={20} alt="seach" />
        <p className="text-sm">Search</p>
      </div>
      <Link className="flex flex-col items-center" href="/shop">
        <Image src="/shop.svg" width={20} height={20} alt="shop" />
        <p className="text-sm">Shop</p>
      </Link>
      <Link className="flex flex-col items-center" href="/wishlist">
        <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
        <p className="text-sm">Wishlist</p>
      </Link>
      <div
        className="flex flex-col items-center"
        onClick={() => handleOpenCart()}
      >
        <Image src="/shopping-bag.svg" width={20} height={20} alt="cart" />
        <p className="text-sm">Cart</p>
      </div>
    </section>
  );
};

export default BottomNav;
