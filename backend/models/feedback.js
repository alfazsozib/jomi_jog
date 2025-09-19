// models/Feedback.js
import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    name: { type: String },
    role: { type: String },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true },
    profileImage: { type: String },
  },
  { timestamps: true }
);


const Feedback = mongoose.model("feedback", feedbackSchema);
export default Feedback;
