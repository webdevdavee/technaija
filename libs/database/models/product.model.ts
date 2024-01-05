import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: string;
  sales_price?: string;
  short_description?: string;
  description: string;
  reviews?: {
    user: string;
    date: Date;
    comment: string;
    rating: string;
  }[];
  sku?: string;
  additional_information?: {
    model?: string[];
  };
  category: string;
  original_category: string;
  gallery?: {
    id: string;
    image: string;
  }[];
  featured_image: string;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  sales_price: { type: String },
  short_description: { type: String },
  description: { type: String, required: true },
  reviews: [
    {
      user: { type: String, required: true },
      date: { type: Date, default: Date.now },
      comment: { type: String, required: true },
      rating: { type: String, required: true },
    },
  ],
  sku: { type: String },
  additional_information: {
    model: {
      type: [String],
      default: undefined,
    },
  },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  original_category: { type: String, required: true },
  gallery: [{ image: { type: String } }],
  featured_image: { type: String, required: true },
});

const products = models.products || model("products", ProductSchema);

export default products;
