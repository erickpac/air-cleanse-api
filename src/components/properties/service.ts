import prisma from "@/database/client";
import { CustomError } from "@/common/custom/error";

export const getProperty = async (id: number) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new CustomError("Property not found", 404);
  }

  return property;
};
