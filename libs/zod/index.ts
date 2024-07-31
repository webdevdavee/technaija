import { z } from "zod";

// REVIEW SCHEMA
export const reviewSchema = z.object({
  user: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  comment: z.string().min(3, "Use 3 characters or more"),
  rating: z.number(),
  saveDetails: z.boolean(),
});

export type TReviewSchema = z.infer<typeof reviewSchema>;

// CONTACT US SCHEMA
export const contactSchema = z.object({
  name: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  message: z.string().min(3, "Use 3 characters or more"),
});

export type TContactSchema = z.infer<typeof contactSchema>;

// CHECKOUT SCHEMA
export const billingSchema = z.object({
  firstname: z.string().min(3, "Use 3 characters or more"),
  lastname: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  country: z.string(),
  address: z.string().min(3, "Use 3 characters or more"),
  city: z.string().min(3, "Use 3 characters or more"),
  zipcode: z.string().regex(/^[1-9]\d{5}$/, "Invalid zipcode"),
  phone: z.string().regex(/^(0|\+?[1-9])\d{7,14}$/, "Invalid phone number"),
});

export type TBillingSchema = z.infer<typeof billingSchema>;
