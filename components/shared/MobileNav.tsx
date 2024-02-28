import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setOpenMobileMenu } from "@/libs/redux-state/features/mobile-menu/mobileMenuSlice";

const MobileNav = () => {
  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    dispatch(setOpenMobileMenu(true));
    dispatch(setOverlay(true));
    document.body.classList.add("no_scroll");
  };

  return (
    <section className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
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
