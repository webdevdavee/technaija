import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";

type MobileNavProp = {
  pathname: string;
};

const MobileNav = ({ pathname }: MobileNavProp) => {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    dispatch(setOverlay(true));
    document.body.classList.add("no_scroll");
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    dispatch(setOverlay(false));
    document.body.classList.remove("no_scroll");
  };

  const isProfileActive = pathname === "/profile";

  return (
    <section className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
      {openMenu && (
        <ul className="fixed top-0 bottom-0 left-0 w-[60%] h-screen bg-white py-32 px-3 ease-in-out transition duration-300 animate-slideInLeft">
          <div className="relative flex flex-col gap-5 items-center">
            <Image
              className="absolute -top-24 right-2"
              src="/close.svg"
              width={35}
              height={35}
              alt="close-menu"
              onClick={handleCloseMenu}
            />
            {mainNavigation.map((navigation) => {
              const isActive = pathname === navigation.link;
              return (
                <Link
                  key={navigation.id}
                  href={`${navigation.link}`}
                  className={`text-xl hover:text-red-400 hover:transition cursor-pointer ${
                    isActive && "text-red-400"
                  }`}
                  onClick={handleCloseMenu}
                >
                  {navigation.text}
                </Link>
              );
            })}
            <Link
              href="/profile"
              className={`hover:text-red-400 hover:transition cursor-pointer ${
                isProfileActive && "text-red-400"
              }`}
              onClick={handleCloseMenu}
            >
              <p className="text-xl">Profile</p>
            </Link>
          </div>
        </ul>
      )}
      <nav className="flex items-center justify-between">
        <Image
          src="/menu.svg"
          width={25}
          height={25}
          alt="menu"
          onClick={handleOpenMenu}
        />
        <Link href={"/"}>
          <Image
            className="cursor-pointer"
            width={40}
            height={40}
            quality={100}
            src="/technaija.svg"
            alt="logo"
            priority={true}
          />
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Image src="/user.svg" width={20} height={20} alt="user" />
          </Link>
        </SignedOut>
      </nav>
    </section>
  );
};

export default MobileNav;
