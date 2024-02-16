import { Schema, model, models } from "mongoose";

export type TWishlistItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  user: string;
};

const WishlistSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: String, required: true },
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;
