import { Router } from "express";
import * as Controller from "./controller";
import { registerSchema, loginSchema } from "./validation-schema";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.post("/register", validate(registerSchema), Controller.register);
router.post("/login", validate(loginSchema), Controller.login);
