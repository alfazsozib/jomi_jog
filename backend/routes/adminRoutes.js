import express from "express";
import multer from "multer";
import path from "path";
import {
  addSurveyor,
  addConsultant,
  getAllSurveyors,
  getAllConsultants,
  getAllUsers,
  getPendingRequests,
  deleteUserById,
  updateSurveyor,
  updateConsultant,
  getSurveyorById,
  getConsultantById
} from "../controllers/adminController.js";

const router = express.Router();

// Multer storage for profile images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Surveyor routes
router.post("/add-surveyor", upload.single("profileImage"), addSurveyor);
router.get("/surveyors", getAllSurveyors);
router.put("/update-surveyor/:id", upload.single("profileImage"), updateSurveyor);
router.get("/surveyors/:id", getSurveyorById);

// Consultant routes
router.post("/add-consultant", upload.single("profileImage"), addConsultant);
router.get("/consultants", getAllConsultants);
router.put("/update-consultant/:id", upload.single("profileImage"), updateConsultant);
router.get("/consultants/:id",getConsultantById );
// General user routes
router.get("/users", getAllUsers);
router.get('/api/admin/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments(); // assuming Mongoose
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Pending Requests
router.get("/pending", getPendingRequests);

// Delete user
router.delete("/delete/:id", deleteUserById);

export default router;
