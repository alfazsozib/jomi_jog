import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "surveyor", "consultant"],
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
      type: String,
    },

    // Surveyor-specific fields
    companyName:    { type: String },
    companyAddress: { type: String },
    licenseNumber:  { type: String },
    experience:     { type: Number },
    price:          { type: Number },
    education:      { type: String },
    training:       { type: String },
    profileImage:   { type: String },

    // ✅ Surveyor blocked/booked dates — array of "YYYY-MM-DD" strings
    bookedDates: {
      type: [String],
      default: [],
    },

    approvals: [
      {
        surveyorName:   String,
        surveyorMobile: String,
        surveyorPrice:  Number,
        accountNumber:  String,
      },
    ],

    resetPasswordToken:  String,
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