"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Cart from "../database/models/cart.model";
import { revalidatePath } from "next/cache";

export const addProductToCart = async ({ product, path }: CartParams) => {
  try {
    await connectToDatabase();

    const cartedProduct = await Cart.create(product);

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
      { $match: { userId: userId } },
      // Count documents for that user id
      { $group: { _id: "$userId", count: { $sum: 1 } } },
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
    const items = await Cart.find({ userId });

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
}: CartRemoveParams) => {
  try {
    await connectToDatabase();

    await Cart.deleteOne({ ...product, userId });

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const clearUserCart = async (userId: string) => {
  try {
    await connectToDatabase();

    await Cart.deleteMany({ userId: userId });

    revalidatePath("/cart");
  } catch (error: any) {
    handleError(error);
  }
};
