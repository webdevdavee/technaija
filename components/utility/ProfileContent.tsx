import Orders from "./Orders";
import BillingDetails from "./BillingDetails";
import { usePathname } from "next/navigation";

type ProfileContentProp = {
  userId: string;
  currentMenu: string | null;
};

const ProfileContent = ({ userId, currentMenu }: ProfileContentProp) => {
  return (
    <section className="w-[85%]">
      <div className="pl-10 border-solid border-l-[1px] border-l-[#272829]">
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
