import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  photo: { type: String, required: true },
  model: { type: String, required: true },
  userId: { type: String, required: true },
  category: { type: String, required: true },
  productId: { type: String, required: true },
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
