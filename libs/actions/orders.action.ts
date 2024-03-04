"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Orders from "../database/models/order.model";

export const createOrder = async (order: CreateOrderParam) => {
  try {
    await connectToDatabase();
    const newOrder = await Orders.create(order);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
