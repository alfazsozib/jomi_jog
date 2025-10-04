import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Replace this endpoint with your backend reset password API
      await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      setMessage("পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে।");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।"
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
            পাসওয়ার্ড রিসেট
          </h2>

          {message && (
            <p className="text-center mb-4 text-sm text-gray-700">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7ED957] mb-1">
                আপনার ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#7ED957]"
                placeholder="ইমেইল লিখুন"
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
                "রিসেট লিঙ্ক পাঠান"
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

export default ForgotPassword;
