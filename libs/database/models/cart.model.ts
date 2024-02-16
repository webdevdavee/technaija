import { Schema, model, models } from "mongoose";

export type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
  model: string;
  user: string;
};

const CartSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String, required: true },
  model: { type: String, required: true },
  user: { type: String, required: true },
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
