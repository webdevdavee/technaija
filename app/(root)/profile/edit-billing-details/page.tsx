import EditBillingDetails from "@/components/utility/EditBillingDetails";
import { auth } from "@clerk/nextjs";

const page = () => {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-lg font-medium">Edit billing detail</h2>
      <EditBillingDetails />
    </section>
  );
};

export default page;
