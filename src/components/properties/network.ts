import { Router } from "express";
import * as Controller from "./controller";
import { createPropertySchema } from "./validation";
import { validate } from "@/middlewares";

export const router = Router();

router.get("/", Controller.getAllProperties);
router.get("/:id", Controller.getProperty);
router.post("/", validate(createPropertySchema), Controller.createProperty);
router.put("/:id", validate(createPropertySchema), Controller.updateProperty);
router.delete("/:id", Controller.deleteProperty);
