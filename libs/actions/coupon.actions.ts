"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import coupons from "../database/models/coupon.model";

export const getCoupon = async (query: string) => {
  try {
    await connectToDatabase();
    const coupon = await coupons.find({ coupon: query });
    return JSON.parse(JSON.stringify(coupon));
  } catch (error) {
    handleError(error);
  }
};
