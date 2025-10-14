import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Common fields for all users
    role: {
      type: String,
      enum: ["user", "surveyor","consultant"],
      required: true,
      default: "user",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String, // For regular users
    },

    // Surveyor-specific fields
    companyName: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    experience: {
      type: Number, // in years
    },
    price: {
      type: Number, // service price
    },
    education: {
      type: String, // qualifications
    },
    training: {
      type: String, // certifications or courses
    },
    profileImage: {
      type: String,
    },

    // Optional approvals or password reset fields
    approvals: [
      {
        surveyorName: String,
        surveyorMobile: String,
        surveyorPrice: Number,
        accountNumber: String,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
