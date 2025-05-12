import type { Request, Response } from "express";
import * as service from "./service";
import { sendErrorResponse } from "@/common/responses/error";
import { sendSuccessResponse } from "@/common/responses/success";
import { handleError } from "@/lib/handle-error";
import { parseAndValidateId } from "@/lib/utils";

export const getTask = async (req: Request, res: Response) => {
  try {
    const parsedId = parseAndValidateId(req.params.id);
    const task = await service.getTask(parsedId);

    sendSuccessResponse({ res, data: task });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    sendErrorResponse({ res, message, statusCode });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await service.getTasks();

    sendSuccessResponse({ res, data: tasks });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    sendErrorResponse({ res, message, statusCode });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await service.createTask(req.body);

    sendSuccessResponse({ res, data: task });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    sendErrorResponse({ res, message, statusCode });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const parsedId = parseAndValidateId(req.params.id);
    const task = await service.updateTask(parsedId, req.body);

    sendSuccessResponse({ res, data: task });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    sendErrorResponse({ res, message, statusCode });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const parsedId = parseAndValidateId(req.params.id);
    const task = await service.deleteTask(parsedId);

    sendSuccessResponse({
      res,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);

    sendErrorResponse({ res, message, statusCode });
  }
};
