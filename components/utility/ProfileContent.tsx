"use client";

import Orders from "./Orders";
import BillingDetails from "./BillingDetails";
import { useSearchParams } from "next/navigation";

type ProfileContentProp = {
  userId: string;
};

const ProfileContent = ({ userId }: ProfileContentProp) => {
  const searchParams = useSearchParams();

  const UrlSearchParams = new URLSearchParams(searchParams.toString());
  const currentMenu = UrlSearchParams.get("menu");

  return (
    <section>
      <div className="pl-10 border-solid border-l-[1px] border-l-gray-300 m:border-none m:pl-0">
        {currentMenu === "Orders" || !currentMenu ? (
          <Orders userId={userId} />
        ) : (
          <BillingDetails />
        )}
      </div>
    </section>
  );
};

export default ProfileContent;
