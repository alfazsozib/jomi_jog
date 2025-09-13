import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const LoginPage = () => {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        ...formData,
        role,
      });

      // Save user info
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));

      alert("Login successful");
      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3ED] flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-[#7ED957] text-center mb-6">
            লগইন (Login)
          </h2>

          {/* Role toggle */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-6 py-2 rounded-md font-semibold ${
                role === "user"
                  ? "bg-[#7ED957] text-white"
                  : "bg-[#7ED957]/10 text-[#7ED957]"
              }`}
            >
              ব্যবহারকারী লগইন
            </button>
            <button
              type="button"
              onClick={() => setRole("surveyor")}
              className={`px-6 py-2 rounded-md font-semibold ${
                role === "surveyor"
                  ? "bg-[#7ED957] text-white"
                  : "bg-[#7ED957]/10 text-[#7ED957]"
              }`}
            >
              সার্ভেয়ার লগইন
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                ইমেইল ঠিকানা / মোবাইল নম্বর
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                placeholder="আপনার ইমেইল লিখুন"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7ED957] text-white py-3 rounded-md font-semibold"
            >
              {role === "user"
                ? "লগইন করুন (ব্যবহারকারী হিসেবে)"
                : "লগইন করুন (সার্ভেয়ার হিসেবে)"}
            </button>

            <Link to="/signup">
              <p className="mt-3 text-center text-[#7ED957]">
                নতুন একাউন্ট তৈরি করুন
              </p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
