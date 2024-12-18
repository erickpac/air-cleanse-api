import type { Request, Response } from "express";
import * as service from "./service";
import { normalizeError } from "@/utils/normalize-error";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { CustomError } from "@/common/custom/error";
import { Role } from "@prisma/client";
import { generateToken, comparePassword, hashPassword } from "@/utils/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const existingUser = await service.getUserByEmail(email);
    const validRoles = Object.values(Role);

    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

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

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }

    const token = generateToken(user.id, user.email);

    return sendSuccessResponse({ res, data: { token } });
  } catch (error) {
    const { message, statusCode } = normalizeError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};
