import { Schema, model, models } from "mongoose";

const BillingSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: String, required: true },
  isDefault: { type: Boolean, required: true },
});

const Billing = models.Billing || model("Billing", BillingSchema);

export default Billing;
