"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import products from "../database/models/product.model";

export const getAllProducts = async (limit: number) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const productsQuery = products.find({}).limit(limit);
    const productsData = await productsQuery;

    return {
      product: JSON.parse(JSON.stringify(productsData)),
    };
  } catch (error) {
    handleError(error);
  }
};
