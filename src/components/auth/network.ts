import { Router } from "express";
import * as controller from "./controller";
import { registerSchema, loginSchema } from "./validation-schema";
import { validate } from "@/middlewares/zod-validation";

export const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
