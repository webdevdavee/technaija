"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Coupons from "../database/models/coupon.model";
import Coupon from "@/components/utility/Coupon";

export const getCoupon = async (query: string) => {
  try {
    await connectToDatabase();
    const coupon = await Coupons.find({ code: query });
    return JSON.parse(JSON.stringify(coupon));
  } catch (error) {
    handleError(error);
  }
};

export const reduceCouponLimit = async ({ couponCode }: ReduceCouponLimit) => {
  try {
    await connectToDatabase();

    // Find the coupon based on the coupon code received from the params
    const activeCouponArray = await Coupons.find({ code: couponCode });

    // activeCouponArray returns an array. Get the first object in it
    const activeCoupon = activeCouponArray[0];

    // Destructure the object and get the limit property
    const { limit } = activeCoupon;

    // Update the limit property
    const updatedCouponLimit = limit - 1;

    // Set the updated limit to the coupon
    const updatedCoupon = await Coupons.findByIdAndUpdate(
      activeCoupon._id,
      { limit: updatedCouponLimit },
      { new: true }
    );

    console.log(updatedCoupon);
  } catch (error) {
    handleError(error);
  }
};
