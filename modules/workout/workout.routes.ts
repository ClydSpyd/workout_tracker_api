import { Router } from "express";
import {
  createWorkout,
  getWorkout,
  getUserWorkouts,
} from "./workout.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", (req, res) => {
  res.send("Workout API is running");
});
router.post("/", authMiddleware, createWorkout);
router.get("/:id", authMiddleware, getWorkout);
router.get("/mine", authMiddleware, getUserWorkouts);

export default router;
