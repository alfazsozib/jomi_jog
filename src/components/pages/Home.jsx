import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import demo from "../../assets/images/demo-9.png";
import CartSurveyor from "../cart/CartSurveyor";
import Navbar from "../Navbar/Navbar";
import UserFeedback from "../UserFeedback/UserFeedback";
import FAQ from "./FAQ";

// Axios base URL
axios.defaults.baseURL = "http://localhost:5000";

const Home = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [review, setReview] = useState({ role: "", feedback: "", rating: "" });
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/api/feedbacks");
        setReviews(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };
    fetchReviews();
  }, []);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoadingSubmit(true);
    try {
      const reviewToSubmit = {
        ...review,
        name: user.name,
        profileImage: user.profileImage || "",
      };

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.post("/api/feedbacks", reviewToSubmit, config);
      setReviews((prev) => [data, ...prev]);

      alert("মতামত জমা হয়েছে ✅");
      setShowAddReview(false);
      setReview({ role: "", feedback: "", rating: "" });
    } catch (err) {
      alert("Failed to submit feedback ❌");
      console.error(err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-[#F5F3ED]">
      <Navbar />

      {/* Hero Section */}
      <div className="relative px-4 sm:px-8">
        <div className="relative w-full h-[40vh] sm:h-[55vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={demo}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#131e3d]/70"></div>

          <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 md:px-20 text-white">
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold mb-4">
              যখনই প্রয়োজন, <br /> খুঁজুন বিশ্বস্ত সার্ভেয়ার
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-[480px]">
              বুকিং থেকে সার্ভে পর্যন্ত, জমিযোগ আনছে জমি সেবা অনলাইনে নিরাপদ,
              দ্রুত ও বিশ্বস্ত।
            </p>
           
          </div>
        </div>
      </div>

      <CartSurveyor />

      {/* See more */}
      <div className="flex justify-center pb-16">
        <button
          onClick={() => navigate("/allsurveyors")}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold hover:scale-105 transition"
        >
          আরও দেখুন
        </button>
      </div>

      {/* 🔒 LOCKED User Feedback Section (NO LAYOUT SHIFT) */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          h-[560px]
          sm:h-[580px]
          lg:h-[620px]
        "
      >
        <div className="absolute inset-0">
          <UserFeedback reviews={reviews} />
        </div>
      </div>

      {/* Add Review */}
      <div className="bg-[#F5F3ED] px-4 sm:px-8 text-center">
        {user ? (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold"
          >
            {showAddReview ? "বাতিল করুন" : "আপনার মতামত যোগ করুন"}
          </button>
        ) : (
          <p className="text-gray-700 py-6">
            মতামত দিতে হলে{" "}
            <Link to="/login" className="text-[#7ED957] underline">
              লগইন
            </Link>{" "}
            করুন।
          </p>
        )}
      </div>

      {showAddReview && user && (
        <div className="px-4 sm:px-8 md:px-16 py-6">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="mb-4">
              <label className="font-semibold">পেশা</label>
              <input
                name="role"
                value={review.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">মতামত</label>
              <textarea
                name="feedback"
                rows="4"
                value={review.feedback}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="font-semibold">রেটিং (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                name="rating"
                value={review.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSubmit}
              className="w-full bg-[#7ED957] text-white py-3 rounded-lg font-semibold"
            >
              {loadingSubmit ? "জমা দিচ্ছে..." : "মতামত জমা দিন"}
            </button>
          </form>
        </div>
      )}

      {/* FAQ — NOW 100% STATIC */}
      <FAQ />
    </div>
  );
};

export default Home;
