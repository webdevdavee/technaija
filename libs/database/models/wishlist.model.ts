import { Schema, model, models } from "mongoose";

const WishlistSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;
