import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import path from "path";

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
    mobile,   // ✅ Added mobile here
    address,
    companyName,
    companyAddress,
    licenseNumber,
    experience,
    price,
  } = req.body;

  const normalizedEmail = email.toLowerCase();

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

  const user = await User.create({
    role,
    name,
    email: normalizedEmail,
    password,
    age,
    mobile,   // ✅ Save mobile here
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
  const user = await User.findOne({ email: normalizedEmail, role });

  if (user && (await bcrypt.compare(password, user.password))) {
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
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get all surveyors
const getSurveyors = asyncHandler(async (req, res) => {
  const surveyors = await User.find({ role: "surveyor" }).select(
    "name experience profileImage price"
  );
  res.json(surveyors);
});

// @desc    Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).select(
    "name email mobile address profileImage"
  );
  res.json(users);
});

// @desc    Delete a user
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

// Get single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Generate token and send email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  // Create reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Save token and expiration in user model
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  // Create reset URL
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  // Send email
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

// Reset password controller
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password; // hash in pre-save hook
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });
};
export { registerUser, loginUser, getSurveyors, getUsers, deleteUser, getUserById };
