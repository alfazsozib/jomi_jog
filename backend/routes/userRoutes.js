import express from "express";
import multer from "multer";
import path from "path";
import {
  registerUser,
  loginUser,
  getUsers,
  getSurveyors,
  deleteUser,
  getUserById
} from "../controllers/userController.js";

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
router.get("/:id", getUserById);
// DELETE (remove user by id)
router.delete("/:id", deleteUser);

export default router;
