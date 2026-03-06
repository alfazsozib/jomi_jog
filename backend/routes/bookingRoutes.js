// routes/bookingRoutes.js
import express from "express";
import Booking from "../models/bookingModel.js";
import Notification from "../models/notification.js";

const router = express.Router();

// ================= User: Create booking =================
router.post("/", async (req, res) => {
  try {
    const { userId, surveyorId, consultantId, price, date } = req.body;

    if (!userId || !price || !date) {
      return res.status(400).json({ message: "User, price, and date are required" });
    }

    if (!surveyorId && !consultantId) {
      return res.status(400).json({ message: "Either surveyorId or consultantId must be provided" });
    }

    const booking = await Booking.create({ userId, surveyorId, consultantId, price, date });
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= Admin: Get pending bookings =================
router.get("/admin/pending", async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "pending" })
      .populate("userId",      "name email mobile")
      .populate("surveyorId",  "name price mobile")
      .populate("consultantId","name price mobile");
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching pending bookings:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= Admin: Accept / Reject booking =================
router.put("/admin/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email mobile address")
     .populate("surveyorId", "name mobile price");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // ✅ Notify the USER about their booking status
    const userMessage = status === "accepted"
      ? "আপনার বুকিং অনুমোদিত হয়েছে!"
      : "আপনার বুকিং বাতিল করা হয়েছে।";

    await Notification.create({
      userId:    booking.userId._id,
      bookingId: booking._id,
      message:   userMessage,
    });

    // ✅ Also notify the SURVEYOR when booking is accepted
    if (status === "accepted" && booking.surveyorId) {
      await Notification.create({
        userId:    booking.surveyorId._id,
        bookingId: booking._id,
        message:   `নতুন বুকিং! ক্লায়েন্ট: ${booking.userId?.name || "অজানা"}, তারিখ: ${booking.date ? new Date(booking.date).toLocaleDateString("bn-BD") : "নেই"}`,
      });
    }

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= Get bookings for a specific USER =================
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("surveyorId",  "name mobile price")
      .populate("consultantId","name mobile price")
      .populate("userId",      "name email mobile");
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ✅ NEW: Get accepted bookings for a SURVEYOR =================
router.get("/surveyor/:surveyorId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      surveyorId: req.params.surveyorId,
      status: "accepted",
    })
      .populate("userId", "name mobile address") // ✅ NO email exposed
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching surveyor bookings:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ✅ NEW: Get notifications for a user/surveyor =================
router.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .populate("bookingId", "date price userId surveyorId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ✅ NEW: Mark notifications as read =================
router.put("/notifications/:userId/read", async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.params.userId, read: false },
      { read: true }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= Delete booking =================
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await booking.deleteOne();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;