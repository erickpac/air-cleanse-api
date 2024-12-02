import ErrorResponse from "@/types/error-response";
import type { Response } from "express";

const error = ({ res, statusCode = 500, message }: ErrorResponse): Response => {
  return res.status(statusCode).json({ error: message });
};

export default error;
