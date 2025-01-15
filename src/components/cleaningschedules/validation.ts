import { z } from "zod";

export const createCleaningScheduleSchema = z.object({
  propertyId: z.number().min(1, "Property ID is required"),
  cleanerId: z.number().min(1, "Cleaner ID is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export const updateCleaningScheduleSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});