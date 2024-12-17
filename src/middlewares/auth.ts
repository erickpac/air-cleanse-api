import type { Request, Response, NextFunction } from "express";
import { CustomError } from "@/common/custom/error";
import { verifyToken } from "@/utils/auth";
import { DecodedToken } from "@/types/decoded-token";

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
    res.status(401).json({ message: "Token is not valid" });
    next(error);
  }
};
