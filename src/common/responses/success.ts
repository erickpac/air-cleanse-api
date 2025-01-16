import SuccessResponse from "@/types/success-response";
import type { Response } from "express";

/**
 * Sends a success response with the specified status code, info, and data.
 *
 * @param res - The response object.
 * @param statusCode - The HTTP status code for the success response (default is 200).
 * @param info - The optional info message to be included in the response.
 * @param message - The success message to be included in the response.
 * @param data - The data to be included in the response.
 * @returns The response object with the success details.
 */
export const sendSuccessResponse = ({
  res,
  statusCode = 200,
  info,
  message,
  data,
}: SuccessResponse): Response => {
  if (info) {
    return res.status(statusCode).json({ info, data, message });
  }

  return res.status(statusCode).json({ data, message });
};
