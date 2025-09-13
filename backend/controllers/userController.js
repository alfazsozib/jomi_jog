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
    mobile,
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
    profileImageURL = `/uploads/${req.file.filename}`; // store relative URL
  }

  const user = await User.create({
    role,
    name,
    email: normalizedEmail,
    password,
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
// @route   GET /api/users/surveyors
// @access  Public
const getSurveyors = asyncHandler(async (req, res) => {
  const surveyors = await User.find({ role: "surveyor" }).select(
    "name experience profileImage price"
  );
  res.json(surveyors);
});

// @desc    Get all users (role = "user")
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).select(
    "name email mobile address profileImage"
  );
  res.json(users);
});

// @desc    Delete a user (and their uploaded image file if exists)
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("🔎 Deleting user with ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Try to delete image file if exists
    if (user.profileImage) {
      try {
        const relativePath = user.profileImage.startsWith("/")
          ? user.profileImage.slice(1)
          : user.profileImage;

        console.log("🖼 Profile image path:", relativePath);

        const absolutePath = path.join(process.cwd(), relativePath);

        console.log("📂 Absolute path:", absolutePath);

        if (fs.existsSync(absolutePath)) {
          await fs.promises.unlink(absolutePath);
          console.log("✅ Image deleted");
        }
      } catch (err) {
        console.error("⚠️ Failed to delete file:", err.message);
      }
    }

    await user.deleteOne(); // safer than user.remove()
    res.json({ message: "User removed" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get single user/surveyor by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, getSurveyors, getUsers, deleteUser, getUserById };
