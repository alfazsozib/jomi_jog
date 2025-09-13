import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Create a booking
const createBooking = asyncHandler(async (req, res) => {
  const { userId, surveyorId, price } = req.body;

  if (!userId || !surveyorId || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const booking = await Booking.create({
    user: userId,
    surveyor: surveyorId,
    price,
  });

  res.status(201).json(booking);
});

// Admin: approve booking
const approveBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("user surveyor");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.status = "approved";
  booking.accountNumber = "01304396916"; // Example account number
  await booking.save();

  // Store info in user approvals
  const approvalInfo = {
    surveyorName: booking.surveyor.name,
    surveyorMobile: booking.surveyor.mobile,
    surveyorPrice: booking.price,
    accountNumber: booking.accountNumber,
  };
  await User.findByIdAndUpdate(booking.user._id, { $push: { approvals: approvalInfo } });

  res.json({ message: "Booking approved", booking });
});

// Admin: cancel booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.status = "cancelled";
  await booking.save();
  res.json({ message: "Booking cancelled", booking });
});

// Admin: get all bookings
const getAdminBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name mobile address")
    .populate("surveyor", "name mobile experience price")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

// Get bookings for a specific user
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.id })
    .populate("surveyor", "name mobile price")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

// Get approved bookings for a surveyor
const getSurveyorBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ surveyor: req.params.id, status: "approved" })
    .populate("user", "name mobile address")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

export {
  createBooking,
  approveBooking,
  cancelBooking,
  getAdminBookings,
  getUserBookings,
  getSurveyorBookings,
};
