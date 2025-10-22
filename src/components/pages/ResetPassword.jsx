import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `https://jomijog.com/api/users/reset-password/${token}`,
        { password }
      );
      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3ED] flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative">
          <h2 className="text-3xl font-bold text-[#7ED957] text-center mb-6">
            Reset Password
          </h2>

          {message && (
            <p className="text-center mb-4 text-sm text-gray-700">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                নতুন পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                placeholder="নতুন পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                নতুন পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7ED957] text-white py-3 rounded-md font-semibold flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Reset Password"
              )}
            </button>

            <Link to="/login">
              <p className="mt-3 text-center text-[#7ED957] hover:underline">
                লগইন পেজে ফিরে যান
              </p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
