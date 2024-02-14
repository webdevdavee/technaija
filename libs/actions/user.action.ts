"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Users from "../database/models/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParam) => {
  try {
    await connectToDatabase();

    const newUser = await Users.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const getAllUsers = async () => {
  try {
    await connectToDatabase();

    const usersQuery = Users.find({});
    const usersData = await usersQuery;

    return {
      users: JSON.parse(JSON.stringify(usersData)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async ({ updatedUser, path }: UpdateUserParams) => {
  try {
    await connectToDatabase();
    const userToUpdate = await Users.findById(updatedUser._id);
    if (!userToUpdate) {
      throw new Error("Unauthorized or user not found");
    }
    const user = await Users.findByIdAndUpdate(
      updatedUser._id,
      { ...updatedUser },
      { new: true }
    );
    revalidatePath(path);
    revalidatePath("/");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

// export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
//   try {
//     await connectToDatabase();

//     const updatedUser = await Users.findOneAndUpdate({ clerkId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");
//     // revalidatePath(path);
//     // revalidatePath("/");
//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// };

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
