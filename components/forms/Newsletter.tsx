"use client";

const Newsletter = () => {
  return (
    <section className="flex items-center justify-center px-20 py-8 m:px-6">
      <article className="flex flex-col gap-4 items-center overflow-hidden">
        <h1 className="capitalize text-2xl font-medium m:text-xl m:text-center">
          subscribe to our newsletter
        </h1>
        <p className="text-base text-gray-500 mb-8 m:text-sm m:text-center ss:w-full">
          Receive an exclusive 10% discount code when you signup.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-between ss:flex-col ss:items-start ss:gap-4 ss:w-fit"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-[700px] px-5 pb-2 border-t-0 border-x-0 border-b-[1px] border-[#272829] focus:outline-none m:w-full"
          />
          <button
            className="capitalize bg-none pb-2 border-b-[1px] border-[#272829] font-semibold ss:bg-[#272829] ss:p-2 ss:text-white ss:border-none"
            type="submit"
          >
            subscribe
          </button>
        </form>
      </article>
    </section>
  );
};

export default Newsletter;
