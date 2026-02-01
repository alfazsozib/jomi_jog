import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import demo1 from "../../assets/images/hero page.jpg";
import demo2 from "../../assets/images/hero_page_3.png"; // you can change later
import demo3 from "../../assets/images/demo-9.png"; // you can change later
import demo4 from "../../assets/images/Frame 74.png";

import CartSurveyor from "../cart/CartSurveyor";
import Navbar from "../Navbar/Navbar";
import UserFeedback from "../UserFeedback/UserFeedback";
import FAQ from "./FAQ";

axios.defaults.baseURL = "https://jomijog.com";

const Home = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [review, setReview] = useState({ role: "", feedback: "", rating: "" });
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  // 🔁 HERO IMAGE CAROUSEL STATE
  const images = [demo1, demo2, demo3, demo4];
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  // Auto slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

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
      {/* HERO SECTION */}
      <div className="relative px-4 sm:px-8">
        <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-lg">

          {/* 🔁 IMAGE CAROUSEL */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hero Slide"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#131e3d]/70"></div>

          {/* TEXT (STATIC) */}
          <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-20 text-white">

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold mb-3 sm:mb-4 leading-snug sm:leading-snug md:leading-snug">
              যখনই প্রয়োজন, <br />
              খুঁজুন বিশ্বস্ত সার্ভেয়ার
            </h2>

            {/* Subtext */}
            <p className="text-xs sm:text-sm md:text-lg mb-4 sm:mb-5 max-w-full sm:max-w-lg md:max-w-xl text-gray-100 leading-snug sm:leading-relaxed md:leading-tigth">
              জমি সংক্রান্ত যেকোনো কাজ এখন আরও সহজ। বুকিং থেকে সার্ভে পর্যন্ত,
              জমিযোগ আনছে আপনার জমি সেবা অনলাইনে নিরাপদ, দ্রুত ও বিশ্বস্ত।
            </p>

            {/* Call-to-action button */}
            <div className="flex justify-start mt-3 sm:mt-4">
              <button
                onClick={() => navigate("/allsurveyors")}
                className="px-6 py-2 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 inline-block w-auto text-sm sm:text-base cursor-pointer"
              >
                সার্ভেয়ার বুক করুন
              </button>
            </div>

          </div>

        </div>
      </div>



      <CartSurveyor />

      <div className="flex justify-center pb-16">
        <button
          onClick={() => navigate("/allsurveyors")}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold hover:scale-105 transition"
        >
          আরও দেখুন
        </button>
      </div>

      {/* LOCKED USER FEEDBACK */}
      <div className="relative w-full overflow-hidden h-[560px] sm:h-[580px] lg:h-[620px]">
        <div className="absolute inset-0">
          <UserFeedback reviews={reviews} />
        </div>
      </div>

      {/* ADD REVIEW */}
      <div className="px-4 sm:px-8 text-center">
        {user ? (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className="px-8 py-3 bg-[#7ED957] text-white rounded-lg font-semibold"
          >
            {showAddReview ? "বাতিল করুন" : "আপনার মতামত যোগ করুন"}
          </button>
        ) : (
          <p className="py-6">
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
            <input
              name="role"
              placeholder="পেশা"
              value={review.role}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />
            <textarea
              name="feedback"
              rows="4"
              placeholder="মতামত"
              value={review.feedback}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              placeholder="রেটিং"
              value={review.rating}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />
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

      <FAQ />
    </div>
  );
};

export default Home;
