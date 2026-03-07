/**
 * Workout Routes
 * Handles routing for workout session creation, incremental updates, retrieval, and listing.
 * Endpoints:
 *   - POST /api/workout/ : Create a new workout session (partial allowed)
 *   - PATCH /api/workout/:id : Incrementally update a workout session
 *   - GET /api/workout/:id : Retrieve a workout session
 *   - GET /api/workout/mine : List all workouts for the authenticated user
 *
 * Auth required for all except status route.
 */
import { Router } from "express";
import {
  createWorkout,
  getWorkout,
  getUserWorkouts,
  updateWorkout,
} from "./workout.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/workout/
 * Public route. Returns API status message.
 */
router.get("/", (req, res) => {
  res.send("Workout API is running");
});

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
router.patch("/:id", authMiddleware, updateWorkout); // PATCH handler to be implemented in controller

/**
 * GET /api/workout/:id
 * Auth required. Get a workout by its ID.
 */
router.get("/:id", authMiddleware, getWorkout);

/**
 * GET /api/workout/mine
 * Auth required. Get all workouts for the authenticated user.
 */
router.get("/mine", authMiddleware, getUserWorkouts);

export default router;
