import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const SignUpPage = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "",
    companyName: "",
    companyAddress: "",
    mobileNumber: "",
    experience: "",
    price: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(formData);
    try {
      const dataToSend = new FormData();
      dataToSend.append("role", role);
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });
      if (profileImage) dataToSend.append("profileImage", profileImage);

      const { data } = await axios.post(
        "https://jomijog.com/api/users",
        dataToSend
      );

      console.log("Registered:", data);
      toast.success("Registration successful!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        address: "",
        companyName: "",
        companyAddress: "",
        mobileNumber: "",
        experience: "",
        price: "",
      });

      setProfileImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3ED] flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#7ED957] text-center mb-6">
            সাইন আপ (Sign Up)
          </h2>

          {/* Role toggle */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                role === "user"
                  ? "bg-[#7ED957] text-white shadow-md"
                  : "bg-[#7ED957]/10 text-[#7ED957] hover:bg-[#7ED957]/15"
              }`}
            >
              ব্যবহারকারী
            </button>
            <button
              type="button"
              onClick={() => setRole("surveyor")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                role === "surveyor"
                  ? "bg-[#7ED957] text-white shadow-md"
                  : "bg-[#7ED957]/10 text-[#7ED957] hover:bg-[#7ED957]/15"
              }`}
            >
              সার্ভেয়ার
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                পুরো নাম
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                placeholder="আপনার নাম লিখুন"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                placeholder="আপনার ইমেইল লিখুন"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                বয়স 
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                placeholder="আপনার বয়স লিখুন"
                required
              />
            </div>

            {/* Optional profile image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                প্রোফাইল ছবি (ঐচ্ছিক)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full border"
                />
              )}
            </div>

            {/* Conditional fields */}
            {role === "user" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#7ED957] mb-1">
                  ঠিকানা
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  placeholder="আপনার ঠিকানা লিখুন"
                  required
                />
              </div>
            )}

            {role === "surveyor" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    প্রতিষ্ঠানের নাম
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                    placeholder="প্রতিষ্ঠানের নাম লিখুন"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    ঠিকানা
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                    placeholder="ঠিকানা লিখুন"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                    placeholder="মোবাইল নম্বর লিখুন"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    অভিজ্ঞতা (বছর)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                    placeholder="কত বছরের অভিজ্ঞতা আছে লিখুন"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    সেবা মূল্য
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                    placeholder="আপনার সার্ভেয়ার সেবা মূল্য লিখুন"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#7ED957] hover:bg-[#7ED957]/90 transition-colors text-white py-3 rounded-md font-semibold"
            >
              {role === "user"
                ? "রেজিস্ট্রেশন করুন (ব্যবহারকারী হিসেবে)"
                : "রেজিস্ট্রেশন করুন (সার্ভেয়ার হিসেবে)"}
            </button>
          </form>
        </div>
      </div>

      <div className="py-6 text-center ">
        <p className="text-gray-600 text-sm">
          © ২০২৫ <span className="text-[#7ED957] font-bold">জমিযোগ</span> ।
          সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </main>
  );
};

export default SignUpPage;
