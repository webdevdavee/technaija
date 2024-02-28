import Image from "next/image";
import Link from "next/link";
import { mainNavigation } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

type MobileNavProp = {
  pathname: string;
};

const MobileNav = ({ pathname }: MobileNavProp) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <section className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
      {openMenu && (
        <ul className="fixed top-0 bottom-0 left-0 w-[40%] h-screen bg-white py-20 px-3 ease-in-out transition duration-300 drop-shadow-md animate-slideInLeft">
          <div className="relative flex flex-col gap-5 items-center">
            <Image
              className="absolute -top-12 right-2"
              src="/close.svg"
              width={30}
              height={30}
              alt="close-menu"
              onClick={handleCloseMenu}
            />
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
      </nav>
    </section>
  );
};

export default MobileNav;
