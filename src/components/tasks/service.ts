import prisma from "@/database/client";
import { CustomError } from "@/common/custom/error";
import { Task } from "@/types/task";
import { TaskStatus } from "@prisma/client";

const validStatuses = Object.values(TaskStatus);

export const getTask = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      schedule: true,
    },
  });

  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  return task;
};

export const getTasks = async () => {
  const tasks = await prisma.task.findMany({
    include: {
      schedule: true,
    },
  });

  return tasks;
};

export const createTask = async (task: Task) => {
  const status = validStatuses.includes(task.status)
    ? task.status
    : TaskStatus.PENDING;

  const tasks = await prisma.task.create({
    data: { ...task, status },
  });

  return tasks;
};

export const updateTask = async (id: number, task: Task) => {
  const status = validStatuses.includes(task.status)
    ? task.status
    : TaskStatus.PENDING;

  const tasks = await prisma.task.update({
    where: { id },
    data: { ...task, status },
  });

  return tasks;
};

export const deleteTask = async (id: number) => {
  const task = await prisma.task.delete({
    where: { id },
  });

  return task;
};
