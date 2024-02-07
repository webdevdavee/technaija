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
