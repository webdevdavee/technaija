import { Schema, model, models } from "mongoose";

const CouponSchema = new Schema({
  coupon: { type: String, required: true },
  percentoff: { type: Number, required: true },
});

const coupons = models.coupons || model("coupons", CouponSchema);

export default coupons;
