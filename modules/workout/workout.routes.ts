import { Router } from "express";
import {
  createWorkout,
  getWorkout,
  getUserWorkouts,
  updateWorkout,
  addSetToWorkout,
} from "./workout.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * POST /api/workout/
 * Auth required. Create a new workout session (can be partial, e.g. routineId only).
 * Payload: CreateWorkoutPayload
 */
router.post("/", authMiddleware, createWorkout);

/**
 * PATCH /api/workout/:id
 * Auth required. Incrementally update a workout session (add exercise, update metrics, etc).
 * Payload: Partial<WorkoutSession>
 */
router.patch("/:id", authMiddleware, updateWorkout);

/**
 * POST /api/workout/:id/set
 * Auth required. Add a new set to an exercise within a workout session.
 * Payload: SetPayload
 */
router.post("/:id/set", authMiddleware, addSetToWorkout);

/**
 * GET /api/workout/mine
 * Auth required. Get all workouts for the authenticated user.
 */
router.get("/mine", authMiddleware, getUserWorkouts);

/**
 * GET /api/workout/:id
 * Auth required. Get a workout by its ID.
 */
router.get("/:id", authMiddleware, getWorkout);


export default router;
