"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Billing from "../database/models/billing.model";
import { revalidatePath } from "next/cache";

export const createBillingDetail = async ({
  detail,
  path,
}: CreateBillingDetailsParams) => {
  try {
    await connectToDatabase();

    const billing = await Billing.create(detail);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(billing));
  } catch (error) {
    handleError(error);
  }
};

export const getBillingDetails = async (userId: string) => {
  try {
    await connectToDatabase();

    const billings = await Billing.find({ userId });

    return JSON.parse(JSON.stringify(billings));
  } catch (error) {
    handleError(error);
  }
};

export const getBillingDetailById = async (detailId: string) => {
  try {
    await connectToDatabase();

    const billing = await Billing.findById(detailId);

    if (!billing) throw new Error("Billing detail not found");

    return JSON.parse(JSON.stringify(billing));
  } catch (error) {
    handleError(error);
  }
};

export const deleteBillingDetail = async (id: string) => {
  try {
    await connectToDatabase();

    await Billing.deleteOne({ _id: id });

    revalidatePath("/profile");
  } catch (error) {
    handleError(error);
  }
};

export const updateBillingDetail = async ({
  detailId,
  detail,
  path,
}: UpdateBillingDetailParams) => {
  try {
    await connectToDatabase();

    const updatedDetail = await Billing.findByIdAndUpdate(
      detailId,
      { ...detail },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedDetail));
  } catch (error) {
    handleError(error);
  }
};

export const setBillingDetailAsDefault = async (id: string) => {
  try {
    await connectToDatabase();

    // Set all documents' isDefault to false
    await Billing.updateMany({}, { $set: { isDefault: false } });

    // Set the isDefault of the selected document to true
    await Billing.updateOne({ _id: id }, { $set: { isDefault: true } });

    revalidatePath("/profile");
  } catch (error) {
    handleError(error);
  }
};

export const getDefaultBillingDetail = async (userId: string) => {
  try {
    await connectToDatabase();

    const billingDetail = await Billing.findOne({ userId, isDefault: true });

    if (!billingDetail) return;

    return JSON.parse(JSON.stringify(billingDetail));
  } catch (error) {
    handleError(error);
  }
};

export const clearBillingDetails = async (userId: string) => {
  try {
    await connectToDatabase();

    const billingDetails = await Billing.deleteMany({ userId });

    revalidatePath("/profile");

    return JSON.parse(JSON.stringify(billingDetails));
  } catch (error) {
    handleError(error);
  }
};
