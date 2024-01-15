import { z } from "zod";

export const reviewSchema = z.object({
  user: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  comment: z.string().min(3, "Use 3 characters or more"),
  rating: z.number(),
  saveDetails: z.boolean(),
});

export type TReviewSchema = z.infer<typeof reviewSchema>;
