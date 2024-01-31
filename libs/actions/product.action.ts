"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Product from "../database/models/product.model";
import { revalidatePath } from "next/cache";

export const getAllProducts = async (limit: number, page?: number) => {
  try {
    await connectToDatabase();

    let productsQuery;
    let productsQueryNoLimit;

    if (page !== undefined) {
      const modifiedLimit = page * limit;
      productsQuery = Product.find({}).limit(modifiedLimit);
    } else {
      productsQuery = Product.find({}).limit(limit);
    }

    productsQueryNoLimit = Product.find({});

    const productsData = await productsQuery;
    const productsNoLimit = await productsQueryNoLimit;
    const productsCount = await Product.countDocuments({});

    return {
      products: JSON.parse(JSON.stringify(productsData)),
      productsNoLimit: JSON.parse(JSON.stringify(productsNoLimit)),
      totalPages: Math.ceil(productsCount / limit),
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

export async function getProductsByCategory({
  categoryArray,
  limit,
  page,
}: GetProductsCategoryParams) {
  try {
    await connectToDatabase();

    let productsQuery;

    const conditions = {
      original_category: { $in: categoryArray },
    };

    if (page !== undefined) {
      const modifiedLimit = page * limit;
      productsQuery = Product.find(conditions).limit(modifiedLimit);
    } else {
      productsQuery = Product.find(conditions).limit(limit);
    }

    const productsData = await productsQuery;
    const productsCount = await Product.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(productsData)),
      totalPages: Math.ceil(productsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
