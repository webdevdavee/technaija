import ContactForm from "@/components/forms/ContactForm";

const page = () => {
  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6 capitalize">
        contact us
      </h1>
      <ContactForm />
    </section>
  );
};

export default page;
