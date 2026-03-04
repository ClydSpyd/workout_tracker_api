import { Router } from "express";
import {
  createRoutine,
  getRoutine,
  getAllRoutines,
} from "./routine.controller";

const router = Router();

router.get("/", getAllRoutines);
router.post("/", createRoutine);
router.get("/:id", getRoutine);

export default router;
