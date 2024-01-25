import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: string;
  sales_price?: string;
  short_description?: string;
  description: string;
  reviews?: {
    _id?: string;
    user: string;
    email: string;
    date: string;
    comment: string;
    rating: number;
    saveDetails: boolean;
  }[];
  sku?: string;
  additional_information?: {
    model?: {
      id: string;
      text: string;
    }[];
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
      email: { type: String, required: true },
      date: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
      saveDetails: { type: Boolean, default: false },
    },
  ],
  sku: { type: String },
  additional_information: {
    model: [
      {
        id: String,
        text: String,
      },
    ],
  },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  original_category: { type: String, required: true },
  gallery: [{ image: { type: String } }],
  featured_image: { type: String, required: true },
});

const Products = models.Products || model("Products", ProductSchema);

export default Products;
