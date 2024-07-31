"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Wishlist from "../database/models/wishlist.model";

export const addProductToWishlist = async ({
  product,
  userId,
  path,
}: WishlistParams) => {
  try {
    await connectToDatabase();

    const wishlistProduct = await Wishlist.create({ ...product, user: userId });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(wishlistProduct));
  } catch (error) {
    handleError(error);
  }
};

export const getUserWishlistItems = async (userId: string) => {
  try {
    await connectToDatabase();

    // find all the items that match the user id
    const items = await Wishlist.find({ user: userId }).lean();

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    handleError(error);
  }
};

export const removeProductFromWishlist = async ({
  product,
  userId,
  path,
}: WishlistParams) => {
  try {
    await connectToDatabase();

    await Wishlist.deleteOne({ ...product, user: userId });

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};
