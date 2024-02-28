"use client";

import { mainNavigation } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { mobileMenuState } from "@/libs/redux-state/features/mobile-menu/mobileMenuSlice";
import { setOpenMobileMenu } from "@/libs/redux-state/features/mobile-menu/mobileMenuSlice";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";

const MobileMenu = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menu = useSelector(mobileMenuState);
  const { openMobileMenu } = menu;

  const handleCloseMenu = () => {
    dispatch(setOpenMobileMenu(false));
    dispatch(setOverlay(false));
    document.body.classList.remove("no_scroll");
  };

  const isProfileActive = pathname === "/profile";

  return (
    <section>
      {openMobileMenu && (
        <ul className="fixed z-[56] top-0 bottom-0 left-0 w-[60%] h-screen bg-white py-32 px-3 ease-in-out transition duration-300 animate-slideInLeft xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
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
    </section>
  );
};

export default MobileMenu;
