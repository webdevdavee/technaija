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
