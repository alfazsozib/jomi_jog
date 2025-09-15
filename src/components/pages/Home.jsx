import { useState } from "react";
import { Link } from "react-router-dom";
import demo from "../../assets/images/demo-9.png";
import CartSurveyor from "../cart/CartSurveyor";
import Navbar from "../Navbar/Navbar";
import UserFeedback from "../UserFeedback/UserFeedback";
import FAQ from "./FAQ";

const Home = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [review, setReview] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: "",
  });

  // 👉 Active division state (default: রাজশাহী)
  const [activeDivision, setActiveDivision] = useState("রাজশাহী");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Review:", review);
    alert("আপনার পর্যালোচনা জমা হয়েছে!");
    setShowAddReview(false);
    setReview({ name: "", role: "", feedback: "", rating: "" });
  };

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Navbar */}
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
            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-[480px]">
              বুকিং থেকে সার্ভে পর্যন্ত, জমিযোগ আনছে জমি সেবা অনলাইনে নিরাপদ,
              দ্রুত ও বিশ্বস্ত।
            </p>
            <Link to={"/surveyor"}>
              <button
                className="relative px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md
              border-pulse"
              >
                সার্ভেয়ার বুক করুন
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Divisions Section */}
      <section className="px-4 sm:px-8 mt-10 mb-16">
        <h2 className="text-[#151515] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-8">
          বিভাগসমূহ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            "ঢাকা",
            "সিলেট",
            "রাজশাহী",
            "বরিশাল",
            "চট্টগ্রাম",
            "রংপুর",
            "পাবনা",
            "দিনাজপুর",
          ].map((division) => (
            <button
              key={division}
              onClick={() => setActiveDivision(division)}
              className={`text-sm sm:text-base md:text-lg rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition shadow-sm hover:shadow-md
    ${
      activeDivision === division
        ? "bg-[#7ED957] text-white rounded-lg font-semibold shadow-md border-pulse2"
        : "text-[#303030] border-2 border-black hover:bg-[#f5f5eb]"
    }`}
            >
              {division}
            </button>
          ))}
        </div>
      </section>

      <CartSurveyor />

      {/* User Feedback Section */}
      <UserFeedback />

      {/* User Reviews Section */}
      <div className="bg-[#F5F3ED] px-4 sm:px-8 text-center ">
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md border-pulse3 "
        >
          {showAddReview ? "বাতিল করুন" : "আপনার মতামত যোগ করুন"}
        </button>
      </div>

      {showAddReview && (
        <div className=" bg-[#F5F3ED] px-4 sm:px-8 md:px-16 py-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 mt-4 text-center text-[#151515]">
            আপনার মতামত জমা দিন
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-8 text-center text-[#303030] max-w-[700px] mx-auto">
            আমাদের সার্ভিসের অভিজ্ঞতা শেয়ার করুন। আপনার মতামত আমাদের জন্য
            গুরুত্বপূর্ণ।
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block text-[#151515] font-semibold mb-2">
                নাম
              </label>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম লিখুন"
                value={review.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-[#151515] font-semibold mb-2">
                পেশা
              </label>
              <input
                type="text"
                name="role"
                placeholder="আপনার পেশা লিখুন"
                value={review.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
              />
            </div>

            {/* Feedback */}
            <div className="mb-4">
              <label className="block text-[#151515] font-semibold mb-2">
                পর্যালোচনা / প্রশ্ন
              </label>
              <textarea
                name="feedback"
                placeholder="আপনার অভিজ্ঞতা লিখুন"
                value={review.feedback}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
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
                placeholder="1 থেকে 5 এর মধ্যে"
                value={review.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
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

      {/* FAQ section */}
      <FAQ />
    </div>
  );
};

export default Home;
