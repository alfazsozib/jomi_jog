import asyncHandler from "express-async-handler";
import Feedback from "../models/feedback.js";

// POST /api/feedbacks
const createFeedback = asyncHandler(async (req, res) => {
  const { role, feedback, rating, profileImage } = req.body;

  if (!feedback || !rating) {
    res.status(400);
    throw new Error("Please add feedback and rating");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized to submit feedback");
  }

  const newFeedback = await Feedback.create({
    name: req.user.name,
    role,
    feedback,
    rating,
    profileImage,
    user: req.user._id,
  });
  console.log(newFeedback
    
  )

  res.status(201).json(newFeedback);
});

// GET /api/feedbacks
const getFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to fetch feedbacks");
  }
});

export { createFeedback, getFeedbacks };
