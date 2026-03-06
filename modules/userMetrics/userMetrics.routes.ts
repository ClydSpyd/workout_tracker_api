import { Router } from "express";
import { createMetrics, getLatestMetrics, getMetricsHistory, updateMetrics } from "./userMetrics.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createMetrics);
router.get("/latest", authMiddleware, getLatestMetrics);
router.get("/history", authMiddleware, getMetricsHistory);
router.patch("/:id", authMiddleware, updateMetrics);

export default router;
