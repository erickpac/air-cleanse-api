import type { Request, Response, NextFunction } from "express";
import { CustomError } from "@/common/custom/error";
import { verifyToken } from "@/lib/auth";
import { DecodedToken } from "@/types/decoded-token";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import prisma from "@/database/client";

/**
 * Middleware to authenticate a user based on the provided token in the request headers.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @throws {CustomError} If no token is provided in the request headers.
 * @throws {CustomError} If the token is invalid or has expired.
 *
 * @remarks
 * This middleware expects the token to be provided in the `Authorization` header
 * in the format `Bearer <token>`. If the token is valid, it decodes the token and
 * attaches the decoded user information to the `req.user` object along with the full user data.
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomError("No token, authorization denied", 401);
    }

    try {
      const decoded = verifyToken(token) as DecodedToken;

      // Get full user data from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
          name: true,
          // Exclude sensitive fields like password
        },
      });

      if (!user) {
        throw new CustomError("User not found", 401);
      }

      req.user = { ...decoded, ...user };
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new CustomError("Token has expired", 401);
      } else if (err instanceof JsonWebTokenError) {
        throw new CustomError("Invalid token", 401);
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};
