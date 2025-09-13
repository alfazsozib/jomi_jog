import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "surveyor"],
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
    mobile: {
      type: String,
      required: true,
    },
    // Student-specific
    address: {
      type: String,
    },
    // Recruiter-specific
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
      type: Number,
    },
    price: {
      type: Number,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
