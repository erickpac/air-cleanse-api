import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as service from "./service";
import { normalizeError } from "@/utils/normalize-error";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { CustomError } from "@/common/custom/error";
import { JWT_SECRET } from "@/utils/config";
import { Role } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existingUser = await service.getUserByEmail(email);
    const validRoles = Object.values(Role);

    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await service.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      role: validRoles.includes(role) ? role : Role.HOST,
    });

    return sendSuccessResponse({
      res,
      statusCode: 201,
      data: { message: "User registered successfully" },
    });
  } catch (error) {
    const { message, statusCode } = normalizeError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await service.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }

    const token = jwt.sign(
      { userId: user.id, username: user.email },
      JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return sendSuccessResponse({ res, data: { token } });
  } catch (error) {
    const { message, statusCode } = normalizeError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};
