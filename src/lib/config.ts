import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  CURRENT_URL: z.string(),
  API_VERSION: z.string(),
  JWT_SECRET: z.string(),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Invalid environment variables:", error.format());
  process.exit(1);
}

export const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  CURRENT_URL,
  API_VERSION,
  JWT_SECRET,
} = data;
