import { z } from "zod";
import { TaskStatus } from "@prisma/client";

const baseTaskSchema = z.object({
  scheduleId: z.number().min(1, "Schedule ID is required"),
  description: z.string().min(1, "Description is required"),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.PENDING),
});

export const createTaskSchema = baseTaskSchema;
export const updateTaskSchema = baseTaskSchema;
