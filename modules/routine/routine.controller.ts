import { Request, Response, NextFunction } from "express";
import { RoutineService } from "./routine.service";

const service = new RoutineService();

export async function createRoutine(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const routine = await service.createRoutine(req.body);
    res.status(201).json(routine);
  } catch (err) {
    next(err);
  }
}

export async function getRoutine(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const routine = await service.getRoutine(String(req.params.id));
    res.json(routine);
  } catch (err) {
    next(err);
  }
}

export async function getAllRoutines(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const routines = await service.getAllRoutines();
    res.json(routines);
  } catch (err) {
    next(err);
  }
}
