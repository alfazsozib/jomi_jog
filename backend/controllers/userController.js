import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

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

// @desc    Forgot password - generate token & send email
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetUrl}`,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(500).json({ message: "Email could not be sent" });
  }
};

// @desc    Reset password
// @route   PUT /api/users/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  // ✅ Plain password — pre-save hook will hash it
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });
};




// ─────────────────────────────────────────────────────────
// ADD THESE TWO FUNCTIONS TO THE BOTTOM OF userController.js
// (before the export line)
// ─────────────────────────────────────────────────────────

// @desc    Get surveyor's booked dates
// @route   GET /api/users/:id/booked-dates
// @access  Public
export const getBookedDates = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("bookedDates");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ bookedDates: user.bookedDates || [] });
});

// @desc    Update surveyor's booked dates
// @route   PUT /api/users/:id/booked-dates
// @access  Private (surveyor only)
export const updateBookedDates = asyncHandler(async (req, res) => {
  const { bookedDates } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.bookedDates = bookedDates;
  await user.save();

  res.json({ message: "Booked dates updated", bookedDates: user.bookedDates });
});


export { registerUser, loginUser, getSurveyors, getUsers, deleteUser, getUserById };