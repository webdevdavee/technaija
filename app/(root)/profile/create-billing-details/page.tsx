import BillingDetailsForm from "@/components/forms/BillingDetailsForm";

const page = () => {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-lg font-medium">Create new billing detail</h2>
      <BillingDetailsForm type="create" />
    </section>
  );
};

export default page;
