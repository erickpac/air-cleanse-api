import type { Request, Response, NextFunction } from "express";
import { CustomError } from "@/common/custom/error";
import { verifyToken } from "@/utils/auth";
import { DecodedToken } from "@/types/decoded-token";

/**
 * Middleware to authenticate a user based on the provided token in the request headers.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @throws {CustomError} If no token is provided in the request headers.
 *
 * @remarks
 * This middleware expects the token to be provided in the `Authorization` header
 * in the format `Bearer <token>`. If the token is valid, it decodes the token and
 * attaches the decoded user information to the `req.user` object. If the token is
 * invalid, it responds with a 401 status code and an error message.
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new CustomError("No token, authorization denied", 401);
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
