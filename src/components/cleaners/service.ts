import prisma from "@/database/client";
import { CustomError } from "@/common/custom/error";

export type Cleaner = {
  id?: number;
  userId?: any;
  location: string;
  experience?: string;
};

export const getCleaner = async (id: number) => {
  const cleaner = await prisma.cleaner.findUnique({
    where: { id },
    include: {
      user: true,
    }
  });

  if (!cleaner) {
    throw new CustomError("Cleaner not found", 404);
  }

  return cleaner;
};

export const getAllCleaners = async () => {
  const cleaners = await prisma.cleaner.findMany({
    include: {
      user: true,
    },
  });
  return cleaners;
};

export const createCleaner = async (cleaner: Cleaner) => {
  const { userId, location, experience } = cleaner;

  const cleaners = await prisma.cleaner.create({
    data: { userId, location, experience },
  });

  return cleaners;
};

export const updateCleaner = async (cleaner: Cleaner) => {
  const { id, location, experience } = cleaner;

  const cleaners = await prisma.cleaner.update({
    where: { id },
    data: { location, experience },
  });

  return cleaners;
};

export const deleteCleaner = async (id: number) => {
  const cleaners = await prisma.cleaner.delete({
    where: { id },
  });

  return cleaners;
};