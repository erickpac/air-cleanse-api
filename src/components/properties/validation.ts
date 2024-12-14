import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(10, "Name is required").max(300, "Name is too long"),
  location: z.string().min(1, "Location is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});
