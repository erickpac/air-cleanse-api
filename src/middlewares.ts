import type { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "@/common/responses/error";
import { ZodSchema } from "zod";
import { normalizeError } from "./utils/normalize-error";

/**
 * Middleware to handle requests to routes that are not found.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * This middleware creates an error with a message indicating the requested URL
 * was not found and sets the response status to 404. It then passes the error
 * to the next middleware in the stack.
 *
 * @example
 * app.use(notFound);
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`🔍 - not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware to handle errors in the application.
 *
 * @param err - The error object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @remarks
 * This middleware captures any errors that occur during the request-response cycle.
 * It sets the response status code to 500 if it hasn't been set or if it is 200.
 * In production mode, the error stack trace is omitted from the response.
 *
 * @example
 * app.use(errorHandler);
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode, stack } = normalizeError(err);
  const status = res.statusCode ?? statusCode;

  return sendErrorResponse({ res, message, statusCode: status, stack });
};

/**
 * Middleware to validate request data using a Zod schema.
 *
 * @param schema - The Zod schema to validate the request body against.
 *
 * @returns A middleware function that validates the request body and forwards errors if validation fails.
 *
 * @remarks
 * This middleware parses and validates the request body against the provided Zod schema.
 * If the validation fails, it responds with a 400 status code and an error message detailing the validation errors.
 *
 * @example
 * import { z } from "zod";
 * const schema = z.object({ name: z.string() });
 * app.post("/example", validate(schema), (req, res) => { res.send("Valid data!"); });
 */
export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validates req.body against schema
      next();
    } catch (err) {
      next(err);
    }
  };
