import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSurveyor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    companyName: "",
    companyAddress: "",
    licenseNumber: "",
    experience: "",
    price: "",
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
      dataToSend.append("role", "surveyor"); // always surveyor

      // Append all schema fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) dataToSend.append(key, formData[key]);
      });

      if (profileImage) dataToSend.append("profileImage", profileImage);

      await axios.post("http://localhost:5000/api/users", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Surveyor added successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        companyName: "",
        companyAddress: "",
        licenseNumber: "",
        experience: "",
        price: "",
      });
      setProfileImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
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
            সার্ভেয়ার যোগ করুন
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="পূর্ণ নাম"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="ইমেইল ঠিকানা"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="পাসওয়ার্ড"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="মোবাইল নম্বর"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="companyName"
              placeholder="কোম্পানির নাম"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="companyAddress"
              placeholder="কোম্পানির ঠিকানা"
              value={formData.companyAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="licenseNumber"
              placeholder="লাইসেন্স/রেজিস্ট্রেশন নম্বর"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="experience"
              placeholder="অভিজ্ঞতা (বছর)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="সেবা মূল্য"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                প্রোফাইল ছবি (ঐচ্ছিক)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full border"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED957] hover:bg-[#7ED957]/90 transition-colors text-white py-3 rounded-md font-semibold"
            >
              {loading ? "Processing..." : "সার্ভেয়ার যোগ করুন"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </main>
  );
};

export default AddSurveyor;
