import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    surveyorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- User model, not Surveyor
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    date: { type: Date, required: true }, // ✅ Make sure this exists

  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
