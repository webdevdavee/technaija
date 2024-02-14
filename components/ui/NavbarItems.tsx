"use client";

import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "@/constants";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useSelector, useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { usePathname } from "next/navigation";
import { cartCountState } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import { useEffect } from "react";
import { getUserById } from "@/libs/actions/user.action";
import { currentUserID } from "@/userID";
import { setCartCount } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import { setSlideInSearch } from "@/libs/redux-state/features/slide-in-search/slideInSearch";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

// type NavbarItemsProp = {
//   fetchedUser: IUser;
// };

const NavbarItems = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const theCount = useSelector(cartCountState);
  const { cartCount } = theCount;

  const { isScrolled } = useScrollHeader();

  // useEffect(() => {
  //   // Define an async function to get the user data
  //   const getUser = async () => {
  //     // Await the response from the getUserById function
  //     // The getUserById function takes the current user ID as an argument and returns an IUser object
  //     const currentUser: IUser = await getUserById(currentUserID);
  //     // Dispatch an action to update the cart count in the global state
  //     // The setCartCount action takes the length of the user's cart array as an argument
  //     dispatch(setCartCount(currentUser.cart.length));
  //   };
  //   getUser();
  // }, [pathname, fetchedUser]);
  // The pathname is the current URL of the browser
  // The fetchedUser is the user object returned by the getUserById function

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
          priority={true}
        />
      </Link>
      <ul className="flex gap-10">
        {mainNavigation.map((navigation) => {
          const isActive = pathname === navigation.link;
          return (
            <Link
              key={navigation.id}
              href={`${navigation.link}`}
              className={`text-sm hover:text-red-400 hover:transition cursor-pointer ${
                isActive && "text-red-400"
              }`}
            >
              {navigation.text}
            </Link>
          );
        })}
      </ul>
      <ul className="flex gap-4 items-center justify-center">
        <button type="button" onClick={handleOpenSearch}>
          <Image
            className="text-lg"
            width={20}
            height={20}
            src="/search.svg"
            alt="search"
          />
        </button>
        <SignedOut>
          <Link href="/sign-up">
            <Image
              className="text-lg"
              width={20}
              height={20}
              src="/user.svg"
              alt="user"
            />
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/profile">
            <Image
              className="text-lg"
              width={20}
              height={20}
              src="/user.svg"
              alt="user"
            />
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <Link href={"/wishlist"}>
          <Image
            className="text-lg"
            width={20}
            height={20}
            src="/heart.svg"
            alt="wishlist"
          />
        </Link>
        {pathname !== "/cart" ? (
          <button className="relative" type="button" onClick={handleOpenCart}>
            <Image
              className="text-lg"
              width={20}
              height={20}
              src="/shopping-bag.svg"
              alt="cart"
            />
            <span className="w-5 h-5 flex items-center justify-center absolute -top-3 -right-3 bg-red-400 rounded-full">
              <p className="text-xs font-medium text-white text-center">
                {cartCount}
              </p>
            </span>
          </button>
        ) : (
          <Link href={"/cart"} className="relative">
            <Image
              className="text-lg"
              width={20}
              height={20}
              src="/shopping-bag.svg"
              alt="cart"
            />
            <span className="w-5 h-5 flex items-center justify-center absolute -top-3 -right-3 bg-red-400 rounded-full">
              <p className="text-xs font-medium text-white text-center">
                {cartCount}
              </p>
            </span>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default NavbarItems;
