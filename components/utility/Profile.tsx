"use client";

import { useEffect } from "react";
import ProfileMenu from "../navigation/ProfileMenu";
import ProfileContent from "./ProfileContent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createURL } from "@/libs/utils";

type ProfileProps = {
  userId: string;
};

const Profile = ({ userId }: ProfileProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentMenu = UrlSearchParams.get("menu");

  // useEffect(() => {
  //   UrlSearchParams.set("menu", "Orders");
  //   // Call the function that creates a URL string with the data from UrlSearchParams
  //   const pageURL = createURL(pathname, UrlSearchParams);
  //   // Push the created URL string to the URL
  //   router.push(`${pageURL}`);
  // }, []);

  return (
    <section>
      <div className="pt-10 flex items-start justify-start gap-4">
        <ProfileMenu
          UrlSearchParams={UrlSearchParams}
          urlKey="menu"
          currentMenu={currentMenu}
        />
        <ProfileContent userId={userId} currentMenu={currentMenu} />
      </div>
    </section>
  );
};

export default Profile;
