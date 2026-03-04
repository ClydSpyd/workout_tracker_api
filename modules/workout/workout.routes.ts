import { Router } from "express";
import {
  createWorkout,
  getWorkout,
  getUserWorkouts,
} from "./workout.controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("Workout API is running");
});
router.post("/", createWorkout);
router.get("/:id", getWorkout);
router.get("/user/:userId", getUserWorkouts);

export default router;
