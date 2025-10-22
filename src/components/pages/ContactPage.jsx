import { Mail, MapPin, Phone } from "lucide-react";
import landImage2 from "../../assets/images/land-10.jpg";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" or "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(result.message || "Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("error");
        setMessage(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative px-4 sm:px-8">
        <div
          className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[40vh] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${landImage2})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-xl sm:text-5xl md:text-6xl text-center font-bold text-[#7ED957]">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
        </div>
      </div>

      {/* Contact Info + Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Info */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7ED957] mb-6">
            যোগাযোগের তথ্য
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            জমিযোগ প্ল্যাটফর্মের মাধ্যমে সহজেই আপনার প্রয়োজনীয় সার্ভেয়ার
            বুকিং করুন। যেকোন প্রশ্ন, অভিযোগ বা সহায়তার জন্য নিচের মাধ্যমে
            আমাদের সাথে যোগাযোগ করুন।
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#7ED957]" />
              <span className="text-lg text-gray-800">+8801885447306</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#7ED957]" />
              <span className="text-lg text-gray-800">jomijog@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#7ED957]" />
              <span className="text-lg text-gray-800">রাজশাহী, বাংলাদেশ</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7ED957] mb-6">
            মেসেজ পাঠান
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">পুরো নাম</label>
              <input
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                className="w-full p-3 border-2 border-[#7ED957] rounded-lg outline-none focus:ring-2 focus:ring-[#7ED957]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">ইমেইল</label>
              <input
                name="email"
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full p-3 border-2 border-[#7ED957] rounded-lg outline-none focus:ring-2 focus:ring-[#7ED957]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">বিষয়</label>
              <input
                name="subject"
                type="text"
                placeholder="মেসেজের বিষয় লিখুন"
                className="w-full p-3 border-2 border-[#7ED957] rounded-lg outline-none focus:ring-2 focus:ring-[#7ED957]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">মেসেজ</label>
              <textarea
                name="message"
                rows="5"
                placeholder="আপনার মেসেজ লিখুন"
                className="w-full p-3 border-2 border-[#7ED957] rounded-lg outline-none focus:ring-2 focus:ring-[#7ED957]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-[#7ED957] text-black font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "পাঠানো হচ্ছে..." : "মেসেজ পাঠান"}
            </button>
          </form>

          {status && (
            <p
              className={`mt-4 text-center font-semibold ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-gray-600 text-sm">
          © ২০২৫ <span className="text-[#7ED957] font-bold">জমিযোগ</span> । সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>
    </div>
  );
}
