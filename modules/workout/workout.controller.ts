import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "./workout.service";
import { AuthenticatedRequest } from "../../types/auth";

const service = new WorkoutService();

export async function createWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const workout = await service.logWorkout(req.body, userId);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
}

export async function getWorkout(
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
