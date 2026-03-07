/**
 * Workout Controller
 * Handles HTTP request/response logic for workout session creation, incremental updates, retrieval, and listing.
 * Functions:
 *   - createWorkout: POST handler for new workout session
 *   - updateWorkout: PATCH handler for incremental updates
 *   - getWorkout: GET handler for retrieving a workout session
 *   - getUserWorkouts: GET handler for listing all workouts for a user
 */
import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "./workout.service";
import { AuthenticatedRequest } from "../../types/auth";

const service = new WorkoutService();
export async function updateWorkout(
  /**
   * PATCH /api/workout/:id
   * Incrementally update a workout session (add exercises, notes, metrics).
   * Payload: Partial createWorkout
   */
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const workout = await service.updateWorkout(String(req.params.id), req.body, userId);
    res.json(workout);
  } catch (err) {
    next(err);
  }
}

export async function createWorkout(
  /**
   * POST /api/workout/
   * Create a new workout session (can be partial, e.g. routineId only).
   * Payload: { baseId, date, notes, exercises }
   */
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const workout = await service.createWorkout(req.body, userId);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
}

export async function getWorkout(
  /**
   * GET /api/workout/:id
   * Retrieve a workout session by its unique ID.
   */
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const workout = await service.getWorkout(String(req.params.id), userId);
    res.json(workout);
  } catch (err) {
    next(err);
  }
}

export async function getUserWorkouts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    if(!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const workouts = await service.getUserWorkouts(userId);
    res.json(workouts);
  } catch (err) {
    next(err);
  }
}
