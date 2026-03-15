import { Router } from "express";
import {
  createWorkout,
  getWorkout,
  getUserWorkouts,
  updateWorkout,
  manageSetPayload,
} from "./workout.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * POST /api/workout/
 * Create a new workout session (can be partial, e.g. routineId only).
 * Auth required. 
 * Payload: CreateWorkoutPayload
 */
router.post("/", authMiddleware, createWorkout);

/**
 * PATCH /api/workout/:id
 * Incrementally update a workout session (add exercise, update metrics, etc).
 * Auth required. 
 * Payload: Partial<WorkoutSession>
 */
router.patch("/:id", authMiddleware, updateWorkout);

/**
 * POST /api/workout/:id/set
 * Add a new set to an exercise within a workout session.
 * Auth required. 
 * Payload: SetPayload
 */
router.post("/:id/set", authMiddleware, manageSetPayload);

/** 
 *  POST /api/workout/:id/set/:idx
 *  Update a specific set within an exercise in a workout session.
 *  Auth required. 
 *  Payload: SetPayload
 */
router.patch("/:id/set/:idx", authMiddleware, manageSetPayload);

/** DELETE /api/workout/:id/set/:idx
 *  Delete a specific set within an exercise in a workout session.
 *  Auth required. 
 *  Payload: None
 */
router.delete("/:id/set/:idx", authMiddleware, manageSetPayload);

/**
 * GET /api/workout/mine
 * Get all workouts for the authenticated user.
 * Auth required. 
 */
router.get("/mine", authMiddleware, getUserWorkouts);

/**
 * GET /api/workout/:id
 * Get a workout by its ID.
 * Auth required. 
 */
router.get("/:id", authMiddleware, getWorkout);


export default router;
