import type { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

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
