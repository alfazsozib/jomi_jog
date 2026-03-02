import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  getUsers,
  getSurveyors,
  deleteUser,
  getUserById,
  forgotPassword,
  resetPassword,
  getBookedDates,
  updateBookedDates,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Public routes
router.post("/", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/surveyors", getSurveyors);
router.get("/", getUsers);

// Forgot / Reset password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Booked dates — MUST be before /:id
router.get("/:id/booked-dates", getBookedDates);
router.put("/:id/booked-dates", protect, updateBookedDates);

// /:id routes — MUST be after /booked-dates
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;