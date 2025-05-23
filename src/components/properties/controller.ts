import type { Request, Response } from "express";
import prisma from "@/database/client";
import * as service from "./service";
import { handleError } from "@/lib/handle-error";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { CustomError } from "@/common/custom/error";

export const getAllProperties = async (req: Request, res: Response) => {
  const properties = await prisma.property.findMany();

  res.status(200).json(properties);
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new CustomError("Invalid food ID format", 400);
    }

    const property = await service.getProperty(parsedId);

    return sendSuccessResponse({
      res,
      data: property,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    return sendErrorResponse({ res, message, statusCode });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  const { hostId, name, address, city, country } = req.body;

  if (!name || !address) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const property = await prisma.property.create({
    data: { hostId, name, address, city, country },
  });

  res.status(201).json(property);
};

export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);
  const { name, address, city, country } = req.body;

  if (!id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const property = await prisma.property.update({
    where: { id: parsedId },
    data: { name, address, city, country },
  });

  res.status(200).json(property);
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id) {
    res.status(400).json({ message: "Missing required field" });
    return;
  }

  const property = await prisma.property.delete({
    where: { id: parsedId },
  });

  res.status(200).json(property);
};
