import { Router } from "express";
import * as controller from "./controller";
import { createCleaningScheduleSchema, updateCleaningScheduleSchema } from "./validation";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.get("/:id", controller.getCleaningSchedule);
router.get("/cleaner/:id", controller.getCleaningScheduleByCleaner);
router.get("/property/:id", controller.getCleaningScheduleByProperty);
router.post("/", validate(createCleaningScheduleSchema), controller.createCleaningSchedule);
router.put("/:id", validate(updateCleaningScheduleSchema), controller.updateCleaningSchedule);
router.delete("/:id", controller.deleteCleaningSchedule);
