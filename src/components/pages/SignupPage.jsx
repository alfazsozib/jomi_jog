import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const SignUpPage = () => {
  const [role] = useState("user"); // fixed role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "",
    mobile: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("role", role);
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });
      if (profileImage) dataToSend.append("profileImage", profileImage);

      const { data } = await axios.post(
        "http://localhost:5000/api/users",
        dataToSend
      );

      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        address: "",
        mobile: "",
      });
      setProfileImage(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
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
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
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
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
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
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
              />
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                বয়স
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
              />
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                মোবাইল নম্বর
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
              />
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                ঠিকানা
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
              />
            </div>

            {/* Profile Image (optional) */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED957] hover:bg-[#7ED957]/90 transition-colors text-white py-3 rounded-md font-semibold flex justify-center items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "রেজিস্ট্রেশন করুন"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="text-gray-600 text-sm">
          © ২০২৫ <span className="text-[#7ED957] font-bold">জমিযোগ</span> । সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </main>
  );
};

export default SignUpPage;
