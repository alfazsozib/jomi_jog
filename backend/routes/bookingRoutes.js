import express from "express";
import asyncHandler from "express-async-handler";
import {
  createBooking,
  approveBooking,
  cancelBooking,
  getAdminBookings,
  getUserBookings,
  getSurveyorBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// User creates booking
router.post("/", asyncHandler(createBooking));

// Admin routes
router.get("/admin", asyncHandler(getAdminBookings));
router.put("/approve/:id", asyncHandler(approveBooking));
router.put("/cancel/:id", asyncHandler(cancelBooking));

// User dashboard
router.get("/user/:id", asyncHandler(getUserBookings));

// Surveyor dashboard
router.get("/surveyor/:id", asyncHandler(getSurveyorBookings));

export default router;