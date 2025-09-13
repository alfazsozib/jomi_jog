import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AddReview = () => {
  const navigate = useNavigate();

  // review state
  const [review, setReview] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Review:", review);
    // Backend API call 
    alert("আপনার পর্যালোচনা জমা হয়েছে!");
    navigate("/"); 
  };

  return (
    <div className="overflow-x-hidden bg-white">
      <Navbar />

      <div className="px-4 sm:px-8 md:px-16 py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-[#151515]">
          আপনার পর্যালোচনা জমা দিন
        </h2>

        <p className="text-sm sm:text-base md:text-lg mb-8 text-center text-[#303030] max-w-[700px] mx-auto">
          আমাদের সার্ভিসের অভিজ্ঞতা শেয়ার করুন। আপনার মতামত আমাদের জন্য গুরুত্বপূর্ণ।
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#F5F3ED] p-6 rounded-2xl shadow-lg"
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-[#151515] font-semibold mb-2">নাম</label>
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
            <label className="block text-[#151515] font-semibold mb-2">পদবী / ভূমিকা</label>
            <input
              type="text"
              name="role"
              placeholder="আপনার পদবী বা ভূমিকা লিখুন"
              value={review.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            />
          </div>

          {/* Feedback */}
          <div className="mb-4">
            <label className="block text-[#151515] font-semibold mb-2">পর্যালোচনা</label>
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
            <label className="block text-[#151515] font-semibold mb-2">রেটিং (1-5)</label>
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

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#7ED957] hover:bg-[#6ac648] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              পর্যালোচনা জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
