import BillingDetailsForm from "@/components/forms/BillingDetailsForm";
import { auth } from "@clerk/nextjs/server";

const page = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section className="w-full">
      <h2 className="mb-8 text-lg font-medium">Create new billing detail</h2>
      <BillingDetailsForm type="create" userId={userId} />
    </section>
  );
};

export default page;
