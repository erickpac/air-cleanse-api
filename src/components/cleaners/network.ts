import { Router } from "express";
import * as controller from "./controller";
import { createCleanerSchema, updateCleanerSchema } from "./validation";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.get("/", controller.getAllCleaners);
router.get("/:id", controller.getCleaner);
router.post("/", validate(createCleanerSchema), controller.createCleaner);
router.put("/:id", validate(updateCleanerSchema), controller.updateCleaner);
router.delete("/:id", controller.deleteCleaner);
