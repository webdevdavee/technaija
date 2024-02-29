"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { setSlideInSearch } from "@/libs/redux-state/features/slide-in-search/slideInSearch";
import { cartCountState } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const theCount = useSelector(cartCountState);
  const { cartCount } = theCount;

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

  const isHomeActive = pathname === "/";
  const isShopActive = pathname === "/shop";
  const isWishlistActive = pathname === "/wishlist";

  return (
    <section className="fixed drop-shadow-2xl bottom-0 w-full p-3 bg-white flex items-center justify-between gap-3 z-50 xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
      <Link
        className={`flex flex-col items-center ${
          isHomeActive && "text-red-400"
        }`}
        href="/"
      >
        <Image src="/home.svg" width={20} height={20} alt="home" />
        <p className="text-sm sm:text-xs">Home</p>
      </Link>
      <button
        type="button"
        className="flex flex-col items-center"
        onClick={() => handleOpenSearch()}
      >
        <Image src="/search.svg" width={20} height={20} alt="seach" />
        <p className="text-sm sm:text-xs">Search</p>
      </button>
      <Link
        className={`flex flex-col items-center ${
          isShopActive && "text-red-400"
        }`}
        href="/shop"
      >
        <Image src="/shop.svg" width={20} height={20} alt="shop" />
        <p className="text-sm sm:text-xs">Shop</p>
      </Link>
      <Link
        className={`flex flex-col items-center ${
          isWishlistActive && "text-red-400"
        }`}
        href="/wishlist"
      >
        <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
        <p className="text-sm sm:text-xs">Wishlist</p>
      </Link>
      <button
        type="button"
        className="relative flex flex-col items-center"
        onClick={() => handleOpenCart()}
      >
        <Image src="/shopping-bag.svg" width={20} height={20} alt="cart" />
        <p className="text-sm sm:text-xs">Cart</p>
        <span className="w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 bg-red-400 rounded-full">
          <p className="text-xs font-medium text-white text-center">
            {cartCount ? cartCount : 0}
          </p>
        </span>
      </button>
    </section>
  );
};

export default BottomNav;
