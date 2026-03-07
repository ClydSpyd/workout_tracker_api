import { Router } from "express";
import {
  createRoutine,
  getRoutine,
  getAllRoutines,
  getAllRoutinesByUser,
} from "./routine.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/routine/
 * Public route. List all routines.
 */
router.get("/", getAllRoutines);

/**
 * GET /api/routine/:id
 * Public route. Get a routine by its ID.
 */
router.get("/:id", getRoutine);

/**
 * GET /api/routine/mine
 * Auth required. List all routines created by the authenticated user.
 */
router.get("/mine", authMiddleware, getAllRoutinesByUser);

/**
 * POST /api/routine/
 * Auth required. Create a new routine for the authenticated user.
 * Payload: RoutineInput
 */
router.post("/", authMiddleware, createRoutine);

export default router;
