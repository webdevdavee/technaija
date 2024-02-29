import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { setSlideInSearch } from "@/libs/redux-state/features/slide-in-search/slideInSearch";

type LargeScreenNavProps = {
  pathname: string;
  cartCount: number;
};

const LargeScreenNav = ({ pathname, cartCount }: LargeScreenNavProps) => {
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
    <nav className="flex items-center justify-between m:hidden">
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
      <ul className="flex gap-10 xl:gap-6">
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
      <ul className="flex gap-4 items-center justify-center xl:gap-3">
        {/* <CurrencyConverter /> */}
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
        {pathname !== "/cart" && pathname !== "/checkout" ? (
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
                {cartCount ? cartCount : 0}
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
                {cartCount ? cartCount : 0}
              </p>
            </span>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default LargeScreenNav;
