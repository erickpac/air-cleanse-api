import { z } from "zod";

const baseTaskSchema = z.object({
  scheduleId: z.number().min(1, "Task ID is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PENDING", "COMPLETED"]),
});

export const createTaskSchema = baseTaskSchema;
export const updateTaskSchema = baseTaskSchema;
