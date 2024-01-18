"use client";

import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "@/constants";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";

const Navbar = () => {
  const { isScrolled } = useScrollHeader();

  const dispatch = useDispatch();

  const handleOpenCart = () => {
    dispatch(setSlideInCart(true));
    dispatch(setOverlay(true));
  };

  return (
    <header
      className={`w-full px-20 py-4 flex items-center justify-between g-4 z-50 transition-[0.3s] fixed top-0 drop-shadow-sm ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <Link href={"/"}>
        <Image
          className="cursor-pointer"
          width={60}
          height={60}
          src="/technaija.svg"
          alt="logo"
        />
      </Link>
      <ul className="flex gap-10">
        {mainNavigation.map((navigation) => (
          <Link
            key={navigation.id}
            href={`${navigation.link}`}
            className="text-sm hover:text-red-400 hover:transition cursor-pointer"
          >
            {navigation.text}
          </Link>
        ))}
      </ul>
      <ul className="flex gap-4 items-center justify-center">
        <button type="button">
          <Image
            className="text-lg"
            width={20}
            height={20}
            src="/search.svg"
            alt="search"
          />
        </button>
        <Link href={"/wishlist"}>
          <Image
            className="text-lg"
            width={20}
            height={20}
            src="/heart.svg"
            alt="wishlist"
          />
        </Link>
        <button type="button" onClick={handleOpenCart}>
          <Image
            className="text-lg"
            width={20}
            height={20}
            src="/shopping-bag.svg"
            alt="cart"
          />
        </button>
      </ul>
    </header>
  );
};

export default Navbar;
