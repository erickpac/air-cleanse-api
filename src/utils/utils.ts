import { CustomError } from "@/common/custom/error";

export function parseAndValidateId(id: string): number {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    throw new CustomError("Invalid ID format", 400);
  }

  return parsedId;
}
