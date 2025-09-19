import express from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedbackContrroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", protect, createFeedback);

export default router;
