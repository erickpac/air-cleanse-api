import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProperties = async (req: Request, res: Response) => {
  const properties = await prisma.property.findMany();

  res.status(200).json(properties);
};

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Missing required field" });
    return;
  }

  const property = await prisma.property.findUnique({
    where: { id },
  });

  res.status(200).json(property);
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
  const { name, address, city, country } = req.body;

  if (!id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const property = await prisma.property.update({
    where: { id },
    data: { name, address, city, country },
  });

  res.status(200).json(property);
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Missing required field" });
    return;
  }

  const property = await prisma.property.delete({
    where: { id },
  });

  res.status(200).json(property);
};