import express from "express";
import Booking from "../models/bookingModel.js";
import Notification from "../models/notification.js";

const router = express.Router();

// ================= User: Create booking =================
router.post("/", async (req, res) => {
  try {
    const { userId, surveyorId, price } = req.body;
    const booking = await Booking.create({ userId, surveyorId, price });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Admin: Get pending bookings =================
router.get("/admin/pending", async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" })
  .populate("userId", "name email")
  .populate("surveyorId", "name price");

    console.log("Pending bookings fetched:", bookings);
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching pending bookings:", err.message);
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

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("surveyorId", "name mobile") // get surveyor info
      .populate("userId", "name email mobile"); // get user info
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.remove();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
