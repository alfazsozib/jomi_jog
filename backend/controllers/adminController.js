import User from "../models/userModel.js";
import path from "path";
import fs from "fs";

// =============================
// Add Surveyor
// =============================
export const addSurveyor = async (req, res) => {
  try {
    const {
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
      education,
      training,
    } = req.body;

    const profileImageFile = req.file ? req.file.filename : undefined;

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Surveyor already exists" });
    }

    // ✅ Pass plain password — pre-save hook in userModel will hash it ONCE
    const newSurveyor = await User.create({
      role: "surveyor",
      name,
      email: email.toLowerCase(),
      password, // ✅ plain text only
      age,
      mobile,
      address,
      companyName,
      companyAddress,
      licenseNumber,
      experience,
      price,
      education,
      training,
      ...(profileImageFile && { profileImage: profileImageFile }),
      status: "approved",
    });

    res.status(201).json({
      message: "Surveyor added successfully",
      surveyor: newSurveyor,
    });
  } catch (error) {
    console.error("Error adding surveyor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Add Consultant
// =============================
export const addConsultant = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      mobile,
      education,
      experience,
      price,
      licenseNumber,
    } = req.body;

    const profileImageFile = req.file ? req.file.filename : undefined;

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Consultant already exists" });
    }

    // ✅ Pass plain password — pre-save hook in userModel will hash it ONCE
    const newConsultant = await User.create({
      role: "consultant",
      name,
      email: email.toLowerCase(),
      password, // ✅ plain text only
      age,
      mobile,
      education,
      experience,
      price,
      licenseNumber,
      ...(profileImageFile && { profileImage: profileImageFile }),
      status: "approved",
    });

    res.status(201).json({
      message: "Consultant added successfully",
      consultant: newConsultant,
    });
  } catch (error) {
    console.error("Error adding consultant:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Get all Surveyors
// =============================
export const getAllSurveyors = async (req, res) => {
  try {
    const surveyors = await User.find({ role: "surveyor" }).sort({ createdAt: -1 });
    res.json(surveyors);
  } catch (error) {
    console.error("Error fetching surveyors:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSurveyorById = async (req, res) => {
  try {
    const surveyor = await User.findById(req.params.id);
    if (!surveyor || surveyor.role !== "surveyor") {
      return res.status(404).json({ message: "Surveyor not found" });
    }
    res.json(surveyor);
  } catch (error) {
    console.error("Error fetching surveyor by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Get all Consultants
// =============================
export const getAllConsultants = async (req, res) => {
  try {
    const consultants = await User.find({ role: "consultant" }).sort({ createdAt: -1 });
    res.json(consultants);
  } catch (error) {
    console.error("Error fetching consultants:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getConsultantById = async (req, res) => {
  try {
    const consultant = await User.findById(req.params.id);
    if (!consultant || consultant.role !== "consultant") {
      return res.status(404).json({ message: "Consultant not found" });
    }
    res.json(consultant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Get all Users
// =============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Get Pending Requests
// =============================
export const getPendingRequests = async (req, res) => {
  try {
    const pending = await User.find({ status: "pending" });
    res.json(pending);
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Delete User (Surveyor/Consultant/User)
// =============================
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete profile image if exists
    if (deletedUser.profileImage) {
      const imgPath = path.join(process.cwd(), "uploads", deletedUser.profileImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({
      message: `${deletedUser.role} deleted successfully`,
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =============================
// Update Surveyor
// =============================
export const updateSurveyor = async (req, res) => {
  try {
    const { id } = req.params;
    const surveyor = await User.findById(id);
    if (!surveyor) return res.status(404).json({ message: "Surveyor not found" });

    const {
      name, email, password, age, mobile, address, companyName, companyAddress,
      licenseNumber, experience, price, education, training
    } = req.body;

    if (email && email !== surveyor.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already exists" });
    }

    // Update fields
    surveyor.name = name || surveyor.name;
    surveyor.email = email || surveyor.email;
    surveyor.age = age || surveyor.age;
    surveyor.mobile = mobile || surveyor.mobile;
    surveyor.address = address || surveyor.address;
    surveyor.companyName = companyName || surveyor.companyName;
    surveyor.companyAddress = companyAddress || surveyor.companyAddress;
    surveyor.licenseNumber = licenseNumber || surveyor.licenseNumber;
    surveyor.experience = experience || surveyor.experience;
    surveyor.price = price || surveyor.price;
    surveyor.education = education || surveyor.education;
    surveyor.training = training || surveyor.training;

    // ✅ Assign plain password — pre-save hook will hash it ONCE via isModified check
    if (password) surveyor.password = password;

    // Update profile image
    if (req.file) {
      if (surveyor.profileImage) {
        const oldPath = path.join(process.cwd(), "uploads", surveyor.profileImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      surveyor.profileImage = req.file.filename;
    }

    await surveyor.save(); // pre-save hook handles hashing
    res.json({ message: "Surveyor updated successfully", surveyor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================
// Update Consultant
// =============================
export const updateConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await User.findById(id);
    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    const { name, email, password, age, mobile, education, experience, price } = req.body;

    if (email && email !== consultant.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already exists" });
    }

    consultant.name = name || consultant.name;
    consultant.email = email || consultant.email;
    consultant.age = age || consultant.age;
    consultant.mobile = mobile || consultant.mobile;
    consultant.education = education || consultant.education;
    consultant.experience = experience || consultant.experience;
    consultant.price = price || consultant.price;

    // ✅ Assign plain password — pre-save hook will hash it ONCE
    if (password) consultant.password = password;

    // Update profile image
    if (req.file) {
      if (consultant.profileImage) {
        const oldPath = path.join(process.cwd(), "uploads", consultant.profileImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      consultant.profileImage = req.file.filename;
    }

    await consultant.save(); // pre-save hook handles hashing
    res.json({ message: "Consultant updated successfully", consultant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};