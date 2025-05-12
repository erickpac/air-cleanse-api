import type { Response } from "express";
import { InfoPagination } from "./info-pagination";

export default interface SuccessResponse {
  res: Response;
  statusCode?: number;
  message?: string;
  data: unknown;
  info?: InfoPagination;
}
