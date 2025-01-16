import { Router } from "express";
import * as controller from "./controller";
import { createTaskSchema, updateTaskSchema } from "./validation-schema";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.get("/", controller.getTasks);
router.get("/:id", controller.getTask);
router.post("/", validate(createTaskSchema), controller.createTask);
router.put("/:id", validate(updateTaskSchema), controller.updateTask);
router.delete("/:id", controller.deleteTask);
