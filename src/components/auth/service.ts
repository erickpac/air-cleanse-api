import prisma from "@/database/client";
import { User } from "@/types/user";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (userInput: User) => {
  const user = await prisma.user.create({
    data: {
      ...userInput,
    },
  });

  return user;
};
