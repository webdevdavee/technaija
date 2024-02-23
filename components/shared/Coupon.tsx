import EventButton from "@/components/ui/EventButton";

const Coupon = () => {
  return (
    <section className="w-full mt-6 ">
      <label htmlFor="coupon" className="text-sm">
        If you have a coupon code, please apply it below.
      </label>
      <input
        className="w-full p-3 mt-2 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
        type="text"
        placeholder="Enter coupon"
      />
      <EventButton
        type="button"
        text="Apply coupon"
        classname="py-3 px-5 bg-[#272829] text-white text-sm mt-4"
      />
    </section>
  );
};

export default Coupon;
