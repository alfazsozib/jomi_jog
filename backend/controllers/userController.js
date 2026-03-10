import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App Password — not normal password!
  },
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    role,
    name,
    email,
    password,
    age,
    mobile,
    address,
    companyName,
    companyAddress,
    licenseNumber,
    experience,
    price,
  } = req.body;

  const normalizedEmail = email.toLowerCase();

  // Check if user already exists
  const userExists = await User.findOne({ email: normalizedEmail });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Handle profile image
  let profileImageURL = null;
  if (req.file) {
    profileImageURL = `/uploads/${req.file.filename}`;
  }

  // ✅ Pass plain password — pre-save hook in userModel will hash it ONCE
  const user = await User.create({
    role,
    name,
    email: normalizedEmail,
    password, // plain text — pre-save hook handles hashing
    age,
    mobile,
    ...(role === "user" && { address }),
    ...(role === "surveyor" && {
      companyName,
      companyAddress,
      licenseNumber,
      experience,
      price,
    }),
    ...(profileImageURL && { profileImage: profileImageURL }),
  });

  res.status(201).json({
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    age: user.age,
    mobile: user.mobile,
    profileImage: user.profileImage,
    message: "Registration successful",
  });
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const normalizedEmail = email.toLowerCase();

  // Step 1: Find user by email
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(401);
    throw new Error("No account found with this email");
  }

  // Step 2: Check role
  if (user.role !== role) {
    res.status(401);
    throw new Error(`This account is registered as '${user.role}', not '${role}'`);
  }

  // Step 3: Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  // Step 4: Send response with token
  res.json({
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    age: user.age,
    mobile: user.mobile,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
});

// @desc    Get all surveyors
// @route   GET /api/users/surveyors
// @access  Public
const getSurveyors = asyncHandler(async (req, res) => {
  const surveyors = await User.find({ role: "surveyor" }).select(
    "name experience profileImage price"
  );
  res.json(surveyors);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).select(
    "name email mobile address profileImage"
  );
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.profileImage) {
      try {
        const relativePath = user.profileImage.startsWith("/")
          ? user.profileImage.slice(1)
          : user.profileImage;
        const absolutePath = path.join(process.cwd(), relativePath);
        if (fs.existsSync(absolutePath)) {
          await fs.promises.unlink(absolutePath);
        }
      } catch (err) {
        console.error("⚠️ Failed to delete file:", err.message);
      }
    }

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot password - send reset email
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("ইমেইল প্রয়োজন");
  }

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404);
    throw new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
  }

  // Generate simple reset link (for now — no token/expiry)
  // In production: use crypto.randomBytes + save token to user + expiry
  const resetUrl = `https://jomijog.com/reset-password?email=${encodeURIComponent(normalizedEmail)}`;

  const mailOptions = {
    from: `"জমিযোগ" <${process.env.SMTP_USER}>`,
    to: normalizedEmail,
    subject: "জমিযোগ - পাসওয়ার্ড রিসেট অনুরোধ",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7ED957;">পাসওয়ার্ড রিসেট করতে চান?</h2>
        <p>আপনি (বা অন্য কেউ) আপনার জমিযোগ অ্যাকাউন্টের পাসওয়ার্ড রিসেট করতে চেয়েছেন।</p>
        <p>নিচের বাটনে ক্লিক করে নতুন পাসওয়ার্ড সেট করুন:</p>
        
        <a href="${resetUrl}" 
           style="display: inline-block; background: #7ED957; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
          নতুন পাসওয়ার্ড সেট করুন
        </a>

        <p style="color: #555; margin-top: 20px;">
          এই লিঙ্ক ক্লিক করার পর নতুন পাসওয়ার্ড দিন।<br>
          <strong>লিঙ্কটি নিরাপদে ১ ঘণ্টার মধ্যে ব্যবহার করুন।</strong>
        </p>

        <p style="color: #777; font-size: 14px; margin-top: 30px;">
          যদি আপনি এই অনুরোধ করেননি, তাহলে এই ইমেইল উপেক্ষা করুন — কোনো পরিবর্তন হবে না।
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          ধন্যবাদ,<br>জমিযোগ টিম
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে। (স্প্যাম/জাঙ্ক ফোল্ডার চেক করুন)",
    });
  } catch (error) {
    console.error("Forgot password email error:", error);
    res.status(500);
    throw new Error("ইমেইল পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
  }
});

// @desc    Reset password (simple version — no token yet)
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400);
    throw new Error("ইমেইল এবং নতুন পাসওয়ার্ড প্রয়োজন");
  }

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404);
    throw new Error("ইউজার পাওয়া যায়নি");
  }

  // Set new password (pre-save hook will hash it)
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন লগইন করুন।",
  });
});

// @desc    Get surveyor's booked dates + note events
// @route   GET /api/users/:id/booked-dates
// @access  Public
const getBookedDates = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("bookedDates noteEvents");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    bookedDates: user.bookedDates || [],
    noteEvents: user.noteEvents || {},   // already a plain object (Mixed type)
  });
});

// @desc    Update surveyor's booked dates + note events
// @route   PUT /api/users/:id/booked-dates
// @access  Private
const updateBookedDates = asyncHandler(async (req, res) => {
  const { bookedDates, noteEvents } = req.body;

  // ✅ Use the authenticated user's ID from the JWT token (set by protect middleware)
  // This is safer than req.params.id — works even if localStorage has a stale _id
  const userId = req.user?._id || req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    // Extra debug info to help diagnose mismatches
    console.error(`updateBookedDates: User not found. token_id=${req.user?._id}, param_id=${req.params.id}`);
    res.status(404);
    throw new Error("User not found");
  }

  user.bookedDates = bookedDates || [];
  user.noteEvents  = noteEvents  || {};

  // ✅ CRITICAL: must call markModified for Mixed type or Mongoose won't detect the change
  user.markModified("noteEvents");

  await user.save();

  res.json({
    message: "Availability updated",
    bookedDates: user.bookedDates,
    noteEvents: user.noteEvents,
  });
});

export {
  deleteUser, forgotPassword, getBookedDates, getSurveyors, getUserById, getUsers, loginUser, registerUser, resetPassword, updateBookedDates
};
