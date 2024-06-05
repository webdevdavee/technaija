"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Users from "../database/models/user.model";
import { clearUserCart } from "./cart.actions";
import { clearUserOrders } from "./orders.action";
import { clearBillingDetails } from "./billing.actions";

export const createUser = async (user: CreateUserParam) => {
  try {
    await connectToDatabase();
    const newUser = await Users.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await Users.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await Users.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const user = await Users.find({ clerkId });

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    await Users.deleteOne(
      { clerkId },
      {
        new: true,
      }
    );

    const user = await Users.findOne({ clerkId: clerkId });
    if (!user) throw new Error("User not found");

    await clearUserCart(user._id);
    await clearUserOrders(user._id);
    await clearBillingDetails(user._id);

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};
