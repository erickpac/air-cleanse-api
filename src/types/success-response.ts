import type { Response } from "express";
import { InfoPagination } from "./info-pagination";

export default interface SuccessResponse {
  res: Response;
  statusCode?: number;
  data: any;
  message?: string;
  info?: InfoPagination;
}
