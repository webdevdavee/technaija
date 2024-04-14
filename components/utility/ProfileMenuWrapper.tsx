"use client";

import { useSearchParams } from "next/navigation";
import ProfileMenu from "../navigation/ProfileMenu";

const ProfileMenuWrapper = () => {
  const searchParams = useSearchParams();

  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentMenu = UrlSearchParams.get("menu");

  return (
    <>
      <ProfileMenu
        UrlSearchParams={UrlSearchParams}
        urlKey="menu"
        currentMenu={currentMenu}
      />
    </>
  );
};

export default ProfileMenuWrapper;
