import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import demo from "../../assets/images/demo-9.png";
import CartSurveyor from "../cart/CartSurveyor";
import Navbar from "../Navbar/Navbar";
import UserFeedback from "../UserFeedback/UserFeedback";
import FAQ from "./FAQ";

const Home = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [review, setReview] = useState({
    role: "",
    feedback: "",
    rating: "",
  });
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) setUser(savedUser);
  }, []);

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
      const savedUser = JSON.parse(localStorage.getItem("userInfo"));

      const reviewToSubmit = {
        ...review,
        name: savedUser.name,
        profileImage: savedUser.profileImage || "",
      };

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
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 sm:px-12 md:px-20 text-white">
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-snug mb-4">
              যখনই প্রয়োজন, <br /> খুঁজুন বিশ্বস্ত সার্ভেয়ার
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-[480px] ">
              বুকিং থেকে সার্ভে পর্যন্ত, জমিযোগ আনছে জমি সেবা অনলাইনে— নিরাপদ,
              দ্রুত ও বিশ্বস্ত।
            </p>
            
            <button
            onClick={() => navigate("/allsurveyors")}
            className="px-8 py-3 sm:px-10 cursor-pointer sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300">
              সার্ভেয়ার বুক করুন
            </button>
          </div>
        </div>
      </div>

      <CartSurveyor />

      {/* See more button */}
      <div className="flex justify-center pb-16">
        <button
          onClick={() => navigate("/allsurveyors")}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
        >
          আরও দেখুন
        </button>
      </div>

      <UserFeedback />

      {/* Add Review Section */}
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
