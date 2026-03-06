import { Router } from "express";
import {
  createRoutine,
  getRoutine,
  getAllRoutines,
  getAllRoutinesByUser,
} from "./routine.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", getAllRoutines);
router.get("/mine", authMiddleware, getAllRoutinesByUser);
router.post("/", authMiddleware, createRoutine);
router.get("/:id", getRoutine);

export default router;
