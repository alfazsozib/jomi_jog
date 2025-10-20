// File: src/components/Surveyors/SurveyorsDetails.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/Price.jpg";
import Navbar from "../Navbar/Navbar";

const SurveyorsDetails = () => {
  const { id } = useParams();
  const [surveyor, setSurveyor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyor = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/admin/surveyors/${id}`
        );
        setSurveyor(data);
      } catch (error) {
        console.error("Error fetching surveyor:", error);
      }
    };
    fetchSurveyor();
  }, [id]);

  if (!surveyor) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  const hiddenFields = [
    "email", "password", "__v", "createdAt", "updatedAt",
    "_id", "mobile", "approvals", "role"
  ];

  const fieldLabels = {
    name: "নাম",
    age:"বয়স",
    address: "ঠিকানা",
    companyName: "প্রতিষ্ঠানের নাম",
    companyAddress: "প্রতিষ্ঠানের ঠিকানা",
    licenseNumber: "লাইসেন্স নম্বর",
    education: "শিক্ষাগত যোগ্যতা",
    training: "প্রশিক্ষণ কেন্দ্র",
    experience: "অভিজ্ঞতা",
    price: "সেবা মূল্য",
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:5000/api/bookings", {
        userId: user._id,
        surveyorId: surveyor._id,
        price: surveyor.price,
        status: "pending", // default
      });

      alert("Booking request sent! Admin will review it.");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Surveyor Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="flex justify-center items-center p-4">
                <img
                  src={
                    surveyor.profileImage
                      ? `http://localhost:5000/uploads/${surveyor.profileImage}`
                      : "/default-surveyor.jpg"
                  }
                  alt={surveyor.name}
                  className="h-auto w-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Surveyor Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <div className="flex items-center text-yellow-400 text-2xl">
              {Array(5).fill().map((_, i) => <FaStar key={i} className="mr-1" />)}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-4">{surveyor.name}</h1>

            <div className="flex items-center text-gray-600 gap-3 mt-6">
              <img src={experienceIcon} alt="Experience" className="w-6 h-6" />
              <span className="text-lg">
                {surveyor.experience ? `${surveyor.experience} বছর` : "অভিজ্ঞতা নেই"}
              </span>
            </div>

            <div className="flex items-center text-gray-600 gap-3 mt-3">
              <img src={priceIcon} alt="Price" className="w-6 h-6" />
              <span className="text-lg font-medium">
                {surveyor.price ? `${surveyor.price} টাকা` : "নির্ধারিত নেই"}
              </span>
            </div>

            <div className="mt-8 space-y-3">
              {Object.entries(surveyor)
                .filter(([key]) => !hiddenFields.includes(key))
                .map(([key, value]) =>
                  key !== "profileImage" && key !== "name" && key !== "experience" && key !== "price" ? (
                    <div key={key} className="flex justify-between border-b pb-2 text-gray-700">
                      <span className="font-semibold text-gray-600">{fieldLabels[key] || key}</span>
                      <span>{value || "নাই"}</span>
                    </div>
                  ) : null
                )}
            </div>

            <button
              onClick={handleBooking}
              className="mt-10 w-full bg-[#7ED957] hover:bg-[#6cc14c] text-white py-3 px-6 rounded-lg font-semibold text-lg transition duration-300 shadow-md"
            >
              বুক দিন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyorsDetails;
