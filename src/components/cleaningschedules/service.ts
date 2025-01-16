import prisma from "@/database/client";
import { CustomError } from "@/common/custom/error";

export type CleaningSchedule = {
  id?: number;
  propertyId?: any;
  cleanerId?: any;
  startTime: string;
  endTime: string;
};

export const getCleaningSchedule = async (id: number) => {
  const schedule = await prisma.cleaningSchedule.findUnique({
    where: { id },
    include: {
      cleaner: true,
      property: true,
    },
  });

  if (!schedule) {
    throw new CustomError("Schedule not found", 404);
  }

  return schedule;
};

export const getCleaningScheduleByProperty = async (propertyId: number) => {
  const schedule = await prisma.cleaningSchedule.findMany({
    where: { propertyId },
    include: {
      cleaner: true,
      property: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return schedule;
};

export const getCleaningScheduleByCleaner = async (cleanerId: number) => {
  const schedule = await prisma.cleaningSchedule.findMany({
    where: { cleanerId },
    include: {
      cleaner: true,
      property: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return schedule;
};

export const createCleaningSchedule = async (schedule: CleaningSchedule) => {
  const { propertyId, cleanerId, startTime, endTime } = schedule;

  const schedules = await prisma.cleaningSchedule.create({
    data: { propertyId, cleanerId, startTime, endTime },
  });

  return schedules;
};

export const updateCleaningSchedule = async (schedule: CleaningSchedule) => {
  const { id, startTime, endTime } = schedule;

  const schedules = await prisma.cleaningSchedule.update({
    where: { id },
    data: { startTime, endTime },
  });

  return schedules;
};

export const deleteCleaningSchedule = async (id: number) => {
  const schedules = await prisma.cleaningSchedule.delete({
    where: { id },
  });

  return schedules;
};
