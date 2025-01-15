import { z } from "zod";

export const createCleanerSchema = z.object({
  userId: z.number().min(1, "User ID is required"),
  location: z.string().min(1, "Location is required"),
});

export const updateCleanerSchema = z.object({
  location: z.string().min(1, "Location is required"),
  experience: z.string(),
});