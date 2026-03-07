import { Router } from "express";
import { register, login } from "./user.controller";

const router = Router();

/**
 * POST /api/user/register
 * Register a new user.
 * Payload: UserInput
 */
router.post("/register", register);

/**
 * POST /api/user/login
 * Login and receive JWT.
 * Payload: { email, password }
 */
router.post("/login", login);

export default router;
