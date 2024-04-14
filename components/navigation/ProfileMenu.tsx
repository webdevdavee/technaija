import { createURL } from "@/libs/utils";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

type ProfileMenuProp = {
  UrlSearchParams: URLSearchParams;
  urlKey: string;
  currentMenu: string | null;
};

const ProfileMenu = ({
  UrlSearchParams,
  urlKey,
  currentMenu,
}: ProfileMenuProp) => {
  const pathname = usePathname();
  const router = useRouter();

  const selectMenu = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const text = e.currentTarget.textContent;

    UrlSearchParams.set(urlKey, text ? text : "");
    // Call the function that creates a URL string with the data from UrlSearchParams
    const pageURL = createURL(pathname, UrlSearchParams);
    // Push the created URL string to the URL
    router.push(`${pageURL}`);
  };

  return (
    <aside className="w-[15%]">
      <nav>
        <ul className="flex flex-col gap-6">
          <Link
            href="/profile?menu=Orders"
            className={`cursor-pointer hover:duration-200 hover:transition hover:text-red-400 ${
              currentMenu === "Orders" ||
              (pathname !== "/profile/create-billing-details" &&
                pathname !== "/profile/edit-billing-details" &&
                currentMenu !== "Billing details")
                ? "text-red-400"
                : ""
            }`}
            onClick={(e) => selectMenu(e)}
          >
            Orders
          </Link>
          <Link
            href="/profile?menu=Billing+details"
            className={`cursor-pointer hover:duration-200 hover:transition hover:text-red-400 ${
              currentMenu === "Billing details" ||
              pathname === "/profile/create-billing-details" ||
              pathname === "/profile/edit-billing-details"
                ? "text-red-400"
                : ""
            }`}
            onClick={(e) => selectMenu(e)}
          >
            Billing details
          </Link>
          <Link
            href="/cart"
            className="cursor-pointer hover:duration-200 hover:transition hover:text-red-400"
          >
            Cart
          </Link>
          <Link
            href="/wishlist"
            className="cursor-pointer hover:duration-200 hover:transition hover:text-red-400"
          >
            Wishlist
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileMenu;
