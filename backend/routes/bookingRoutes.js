import express from "express";
import Booking from "../models/bookingModel.js";
import Notification from "../models/notification.js";

const router = express.Router();

// ================= User: Create booking =================
router.post("/", async (req, res) => {
  try {
    const { userId, surveyorId, price, date } = req.body; // ✅ accept date

    if (!userId || !surveyorId || !price || !date) {
      return res.status(400).json({ message: "All fields including date are required" });
    }

    const booking = await Booking.create({ userId, surveyorId, price, date }); // ✅ store date
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Admin: Get pending bookings =================
router.get("/admin/pending", async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" })
      .populate("userId", "name email mobile")
      .populate("surveyorId", "name price mobile");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Admin: Accept / Reject booking =================
router.put("/admin/:id", async (req, res) => {
  try {
    const { status } = req.body; // accepted / rejected
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Create notification for the user
    const message =
      status === "accepted"
        ? "Your booking has been accepted!"
        : "Your booking has been rejected!";
    await Notification.create({
      userId: booking.userId,
      bookingId: booking._id,
      message,
    });

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Get bookings for a user =================
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("surveyorId", "name mobile price")
      .populate("userId", "name email mobile");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Delete booking =================
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.remove();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
