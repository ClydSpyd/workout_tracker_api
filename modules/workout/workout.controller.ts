import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "./workout.service";

const service = new WorkoutService();

export async function createWorkout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workout = await service.logWorkout(req.body);
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
    const workout = await service.getWorkout(String(req.params.id));
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
    const workouts = await service.getUserWorkouts(String(req.params.userId));
    res.json(workouts);
  } catch (err) {
    next(err);
  }
}
