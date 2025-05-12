import type { Request, Response } from "express";
import * as service from "./service";
import { handleError } from "@/lib/handle-error";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { CustomError } from "@/common/custom/error";

export const getAllCleaners = async (req: Request, res: Response) => {
  const cleaners = await service.getAllCleaners();

  res.status(200).json(cleaners);
};

export const getCleaner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new CustomError("Invalid Cleaner ID format", 400);
    }

    const cleaner = await service.getCleaner(parsedId);

    return sendSuccessResponse({
      res,
      data: cleaner,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const createCleaner = async (req: Request, res: Response) => {
  const { userId, experience, location } = req.body;

  if (!userId || !location) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const cleaner = await service.createCleaner({
    userId,
    location,
    experience,
  });

  res.status(201).json(cleaner);
};

export const updateCleaner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);
  const { location, experience } = req.body;

  if (!id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const cleaner = await service.updateCleaner({
    id: parsedId,
    location,
    experience,
  });

  res.status(200).json(cleaner);
};

export const deleteCleaner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id) {
    res.status(400).json({ message: "Missing required field" });
    return;
  }

  const cleaner = await service.deleteCleaner(parsedId);

  res.status(200).json(cleaner);
};
