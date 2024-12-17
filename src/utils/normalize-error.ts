import { ZodError } from "zod";
import { NODE_ENV } from "./config";
import { ErrorObject } from "@/types/error-object";
import { CustomError } from "@/common/custom/error";

export const normalizeError = (error: unknown): ErrorObject => {
  const isProduction = NODE_ENV === "production";

  if (error instanceof ZodError) {
    return {
      message: error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", "),
      statusCode: 400,
    };
  }

  if (error instanceof CustomError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      stack: isProduction ? undefined : error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      stack: isProduction ? undefined : error.stack,
    };
  }

  return {
    message: "An unknown error occurred",
    statusCode: 500,
  };
};
