"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Product from "../database/models/product.model";
import { revalidatePath } from "next/cache";

export const getAllProducts = async (limit: number) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const productsQuery = Product.find({}).limit(limit);
    const productsData = await productsQuery;

    return {
      products: JSON.parse(JSON.stringify(productsData)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async ({
  updatedProduct,
  path,
}: UpdateProductParams) => {
  try {
    await connectToDatabase();
    const productToUpdate = await Product.findById(updatedProduct._id);
    if (!productToUpdate) {
      throw new Error("Unauthorized or product not found");
    }
    const product = await Product.findByIdAndUpdate(
      updatedProduct._id,
      { ...updatedProduct },
      { new: true }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};
