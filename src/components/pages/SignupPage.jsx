import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const SignUpPage = () => {
  const [role, setRole] = useState("user"); // default to user

  // Common fields for both roles
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    mobile: "",
    address: "",
    // Surveyor-only fields (will be sent only when role = surveyor)
    companyName: "",
    companyAddress: "",
    licenseNumber: "",
    experience: "",
    price: "",
    education: "",
    training: "",
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
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("role", role);

      // Send all fields (backend can ignore surveyor fields for user role)
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") { // don't send confirmPassword
          dataToSend.append(key, formData[key]);
        }
      });

      if (profileImage) dataToSend.append("profileImage", profileImage);

      const { data } = await axios.post(
        "http://localhost:5000/api/users",
        dataToSend
      );

      toast.success("রেজিস্ট্রেশন সফল হয়েছে!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        mobile: "",
        address: "",
        companyName: "",
        companyAddress: "",
        licenseNumber: "",
        experience: "",
        price: "",
        education: "",
        training: "",
      });
      setProfileImage(null);
      setPreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
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

          {/* Role Toggle */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                role === "user"
                  ? "bg-[#7ED957] text-white shadow-md"
                  : "bg-[#7ED957]/10 text-[#7ED957] hover:bg-[#7ED957]/20"
              }`}
            >
              ব্যবহারকারী সাইন আপ
            </button>
            <button
              type="button"
              onClick={() => setRole("surveyor")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                role === "surveyor"
                  ? "bg-[#7ED957] text-white shadow-md"
                  : "bg-[#7ED957]/10 text-[#7ED957] hover:bg-[#7ED957]/20"
              }`}
            >
              সার্ভেয়ার সাইন আপ
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Common fields - always shown */}
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

            {/* Surveyor-only fields - shown only when role = surveyor */}
            {role === "surveyor" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    কোম্পানির নাম
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    কোম্পানির ঠিকানা
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    লাইসেন্স নম্বর
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    অভিজ্ঞতা (বছর)
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    মূল্য (প্রতি জরিপ)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#7ED957] mb-1">
                    প্রশিক্ষণ / সার্টিফিকেট
                  </label>
                  <input
                    type="text"
                    name="training"
                    value={formData.training}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#7ED957] border-gray-300"
                  />
                </div>
              </>
            )}

            {/* Profile Image - common for both */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                প্রোফাইল ছবি (ঐচ্ছিক)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#7ED957]/10 file:text-[#7ED957] hover:file:bg-[#7ED957]/20"
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-full border-2 border-[#7ED957] mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED957] hover:bg-[#5cb83a] transition-colors text-white py-3 rounded-md font-semibold flex justify-center items-center disabled:opacity-60"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : role === "user" ? (
                "রেজিস্ট্রেশন করুন (ব্যবহারকারী)"
              ) : (
                "রেজিস্ট্রেশন করুন (সার্ভেয়ার)"
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