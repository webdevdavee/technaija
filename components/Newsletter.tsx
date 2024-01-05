"use client";

const Newsletter = () => {
  return (
    <section className="flex items-center justify-center px-20 py-8">
      <article className="flex flex-col gap-4 items-center">
        <h1 className="capitalize text-2xl font-medium">
          subscribe to our newsletter
        </h1>
        <p className="text-base text-gray-500 mb-8">
          Receive an exclusive 10% discount code when you signup.
        </p>
        <span className="flex items-center justify-between">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-[700px] px-5 pb-2 border-t-0 border-x-0 border-b-[1px] border-[#272829] focus:outline-none"
          />
          <button
            className="capitalize bg-none pb-2 border-b-[1px] border-[#272829] font-semibold"
            type="button"
          >
            subscribe
          </button>
        </span>
      </article>
    </section>
  );
};

export default Newsletter;
