import { Router } from "express";
import * as controller from "./controller";
import { createPropertySchema } from "./validation";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.get("/", controller.getAllProperties);
router.get("/:id", controller.getProperty);
router.post("/", validate(createPropertySchema), controller.createProperty);
router.put("/:id", validate(createPropertySchema), controller.updateProperty);
router.delete("/:id", controller.deleteProperty);
