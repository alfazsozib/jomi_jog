// src/pages/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromUrl = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!emailFromUrl) {
      setError("ইমেইল প্যারামিটার পাওয়া যায়নি। লিঙ্কটি সঠিক নয়।");
    }
  }, [emailFromUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    if (newPassword.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("https://jomijog.com/api/users/reset-password", {
        email: emailFromUrl,
        newPassword,
      });

      setMessage("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে! লগইন পেজে নিয়ে যাওয়া হচ্ছে...");

      // Auto-redirect after 2.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3ED] flex flex-col justify-between">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-[#7ED957] text-center mb-6">
            নতুন পাসওয়ার্ড সেট করুন
          </h2>

          {error && <p className="text-center mb-4 text-red-600 font-medium">{error}</p>}
          {message && <p className="text-center mb-4 text-green-600 font-medium">{message}</p>}

          {!error && !message && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#7ED957] mb-1">
                  ইমেইল (যা থেকে লিঙ্ক এসেছে)
                </label>
                <input
                  type="email"
                  value={emailFromUrl}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#7ED957] mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#7ED957] mb-1">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                  placeholder="আবার লিখুন"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7ED957] hover:bg-[#5cb83a] transition-colors text-white py-3 rounded-md font-semibold flex justify-center items-center disabled:opacity-60"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  "পাসওয়ার্ড সেট করুন"
                )}
              </button>
            </form>
          )}

          <Link to="/login">
            <p className="mt-6 text-center text-[#7ED957] hover:underline">
              লগইন পেজে ফিরে যান
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;