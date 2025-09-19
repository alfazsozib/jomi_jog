import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import demo from "../../assets/images/demo-9.png";
import CartSurveyor from "../cart/CartSurveyor";
import Navbar from "../Navbar/Navbar";
import UserFeedback from "../UserFeedback/UserFeedback";
import FAQ from "./FAQ";

const Home = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [review, setReview] = useState({
    feedback: "",
    rating: "",
  });
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null); // logged in user

  // 👉 Load user from localStorage (if logged in)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) setUser(savedUser);
  }, []);

  // 👉 Fetch reviews
  useEffect(() => {
    axios.get("/api/feedbacks").then((res) => setReviews(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Get user info from localStorage
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));

    const reviewToSubmit = {
      ...review,
      name: savedUser.name, // fetch name from localStorage
      profileImage: savedUser.profileImage || "", // fetch image
    };
    console.log(reviewToSubmit)
    const config = {
      headers: {
        Authorization: `Bearer ${savedUser.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/feedbacks",
      reviewToSubmit,
      config
    );

    alert("মতামত জমা হয়েছে ✅");
    setShowAddReview(false);
    setReview({ role: "", feedback: "", rating: "" });
  } catch (err) {
    alert("Failed to submit feedback ❌");
    console.error(err);
  }
};

  return (
    <div className="overflow-x-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative px-4 sm:px-8">
        {/* same hero section */}
      </div>

      <CartSurveyor />

      {/* Feedback Display Section */}
      <UserFeedback />

      {/* User Reviews Add Section */}
      <div className="bg-[#F5F3ED] px-4 sm:px-8 text-center">
        {user ? (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md border-pulse3 "
          >
            {showAddReview ? "বাতিল করুন" : "আপনার মতামত যোগ করুন"}
          </button>
        ) : (
          <p className="text-gray-700 py-6">
            মতামত দিতে হলে প্রথমে{" "}
            <Link to="/login" className="text-[#7ED957] underline">
              লগইন
            </Link>{" "}
            করুন।
          </p>
        )}
      </div>

      {showAddReview && user && (
        <div className="bg-[#F5F3ED] px-4 sm:px-8 md:px-16 py-2">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
          >
            {/* Role */}
            <div className="mb-4">
              <label className="block text-[#151515] font-semibold mb-2">পেশা</label>
              <input
                type="text"
                name="role"
                value={review.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            {/* Feedback */}
            <div className="mb-4">
              <label className="block text-[#151515] font-semibold mb-2">
                পর্যালোচনা / প্রশ্ন
              </label>
              <textarea
                name="feedback"
                value={review.feedback}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-[#151515] font-semibold mb-2">
                রেটিং (1-5)
              </label>
              <input
                type="number"
                name="rating"
                value={review.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
              >
                মতামত জমা দিন
              </button>
            </div>
          </form>
        </div>
      )}

      <FAQ />
    </div>
  );
};

export default Home;
