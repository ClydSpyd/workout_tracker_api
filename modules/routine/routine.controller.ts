import { Request, Response, NextFunction } from "express";
import { RoutineService } from "./routine.service";
import { AuthenticatedRequest } from "../../types/auth";

const service = new RoutineService();

export async function createRoutine(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const routine = await service.createRoutine(req.body, userId);
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

export async function getAllRoutinesByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;
    const routines = await service.getAllRoutines(userId);
    res.json(routines);
  } catch (err) {
    next(err);
  }
}
