import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  clerkId?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  cart: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    photo: string;
    model: string;
  }[];
  wishlist: {
    _id?: string;
    name: string;
    image: string;
    price: number;
  }[];
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  cart: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      photo: { type: String, required: true },
      model: { type: String, required: true },
    },
  ],
  wishlist: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
