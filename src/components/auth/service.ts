import prisma from "@/database/client";
import { User } from "@/types/user";
import { CustomError } from "@/common/custom/error";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  return user;
};

export const createUser = async (userInput: User) => {
  const user = await prisma.user.create({
    data: {
      ...userInput,
    },
  });

  return user;
};
