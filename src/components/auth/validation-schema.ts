import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(10, "Name is required").max(300, "Name is too long"),
  phone: z.string().min(8, "Phone is required").max(15, "Phone is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is required"),
  role: z.string().default("HOST"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is required"),
});
