"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Cart, { TCartItem } from "../database/models/cart.model";
import { revalidatePath } from "next/cache";

export const addProductToCart = async ({
  product,
  userId,
  path,
}: CartParams) => {
  try {
    await connectToDatabase();

    const cartedProduct = await Cart.create({ ...product, user: userId });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(cartedProduct));
  } catch (error) {
    handleError(error);
  }
};

export const getTotalUserCart = async (userId: string) => {
  try {
    await connectToDatabase();

    const cartCount = await Cart.aggregate([
      // Filter documents by user id
      { $match: { user: userId } },
      // Count documents for that user id
      { $group: { _id: "$user", count: { $sum: 1 } } },
    ]).exec();

    return JSON.parse(JSON.stringify(cartCount));
  } catch (error) {
    handleError(error);
  }
};

export const getUserCartItems = async (userId: string) => {
  try {
    await connectToDatabase();

    // find all the items that match the user id
    const items = await Cart.find({ user: userId }).lean();

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    handleError(error);
  }
};

export const updateCartItem = async (cartItem: TCartItem, path: string) => {
  try {
    await connectToDatabase();

    const itemToUpdate = await Cart.findById(cartItem._id);
    if (!itemToUpdate) {
      throw new Error("Unauthorized or user not found");
    }

    await Cart.findByIdAndUpdate(cartItem._id, { ...cartItem }, { new: true });

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const removeProductFromCart = async ({
  product,
  userId,
  path,
}: CartParams) => {
  try {
    await connectToDatabase();

    await Cart.deleteOne({ ...product, user: userId });

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};
