import type { Request, Response } from "express";
import * as service from "./service";
import { handleError } from "@/lib/handle-error";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { CustomError } from "@/common/custom/error";

export const getCleaningSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new CustomError("Invalid Schedule ID format", 400);
    }

    const schedule = await service.getCleaningSchedule(parsedId);

    return sendSuccessResponse({
      res,
      data: schedule,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const getCleaningScheduleByCleaner = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new CustomError("Invalid Cleaner ID format", 400);
    }

    const schedule = await service.getCleaningScheduleByCleaner(parsedId);

    return sendSuccessResponse({
      res,
      data: schedule,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const getCleaningScheduleByProperty = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new CustomError("Invalid Property ID format", 400);
    }

    const schedule = await service.getCleaningScheduleByProperty(parsedId);

    return sendSuccessResponse({
      res,
      data: schedule,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const createCleaningSchedule = async (req: Request, res: Response) => {
  const { propertyId, cleanerId, startTime, endTime } = req.body;

  if (!propertyId || !cleanerId || !startTime || !endTime) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const schedule = await service.createCleaningSchedule({
    propertyId,
    cleanerId,
    startTime,
    endTime,
  });

  res.status(201).json(schedule);
};

export const updateCleaningSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);
  const { startTime, endTime } = req.body;

  if (!id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const schedule = await service.updateCleaningSchedule({
    id: parsedId,
    startTime,
    endTime,
  });

  res.status(200).json(schedule);
};

export const deleteCleaningSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id) {
    res.status(400).json({ message: "Missing required field" });
    return;
  }

  const schedule = await service.deleteCleaningSchedule(parsedId);

  res.status(200).json(schedule);
};
