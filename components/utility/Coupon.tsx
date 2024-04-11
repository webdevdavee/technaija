import EventButton from "@/components/ui/EventButton";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { discountPrice } from "@/libs/utils";
import { getCoupon } from "@/libs/actions/coupon.actions";

type CouponProps = {
  grandTotal: number;
  setFormattedGrandTotal: Dispatch<SetStateAction<string | undefined>>;
  setCouponPrice: Dispatch<SetStateAction<number | undefined>>;
};

const Coupon = ({
  grandTotal,
  setFormattedGrandTotal,
  setCouponPrice,
}: CouponProps) => {
  const [couponQuery, setCouponQuery] = useState<string>("");
  const discount = useRef(0);
  const [couponError, setCouponError] = useState<string>("");

  const fetchCoupon = async () => {
    if (couponQuery) {
      const coupon = await getCoupon(couponQuery.toUpperCase());
      if (coupon.length > 0) {
        discount.current = coupon[0].discount;
        const theFinalPrice = discountPrice(grandTotal, discount.current);
        setFormattedGrandTotal(theFinalPrice.formatedPrice);
        setCouponPrice(theFinalPrice.discountedPrice);
        setCouponError("");
      } else {
        setCouponError("Coupon code does not exists.");
      }
    } else {
      setCouponError("Enter coupon code!");
    }
  };

  return (
    <section className="w-full mt-6 ">
      <label htmlFor="coupon" className="text-sm">
        If you have a coupon code, please apply it below.
      </label>
      <input
        name="coupon"
        className="w-full p-3 mt-2 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
        type="text"
        placeholder="Enter coupon"
        value={couponQuery}
        onChange={(e) => setCouponQuery(e.target.value)}
      />
      <p className="text-red-500">{couponError}</p>
      <EventButton
        type="button"
        text="Apply coupon"
        classname="py-3 px-5 bg-[#272829] text-white text-sm mt-4"
        onclick={fetchCoupon}
      />
    </section>
  );
};

export default Coupon;
