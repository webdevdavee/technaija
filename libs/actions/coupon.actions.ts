"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Coupons from "../database/models/coupon.model";

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

    // Check if activeCouponArray has data returned from the database
    if (activeCouponArray.length > 0) {
      // activeCouponArray returns an array. Get the first object in it
      const activeCoupon = activeCouponArray[0];

      // Update the limit property
      const updatedCouponLimit = activeCoupon.limit - 1;

      // Set the updated limit to the coupon
      await Coupons.findByIdAndUpdate(
        activeCoupon._id,
        { limit: updatedCouponLimit },
        { new: true }
      );
    } else {
      return;
    }
  } catch (error) {
    handleError(error);
  }
};
