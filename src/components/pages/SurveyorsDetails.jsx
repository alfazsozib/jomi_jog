import { useParams,  useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/Price.jpg";
import Navbar from "../Navbar/Navbar"; // adjust path if needed

const SurveyorsDetails = () => {
  const { id } = useParams();
  const [surveyor, setSurveyor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyor = async () => {
      try {
        const { data } = await axios.get(`https://jomijog.com/api/users/${id}`);
        setSurveyor(data);
      } catch (error) {
        console.error("Error fetching surveyor:", error);
      }
    };
    fetchSurveyor();
  }, [id]);

  if (!surveyor) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  // Exclude these fields
  const hiddenFields = ["email", "password", "__v", "createdAt", "updatedAt", "_id"];

  // Field labels in Bangla
  const fieldLabels = {
    role: "ভূমিকা",
    name: "নাম",
    mobile: "মোবাইল নম্বর",
    address: "ঠিকানা",
    companyName: "কোম্পানির নাম",
    companyAddress: "কোম্পানির ঠিকানা",
    licenseNumber: "লাইসেন্স নম্বর",
    experience: "অভিজ্ঞতা",
    price: "সেবা মূল্য",
    profileImage: "প্রোফাইল ছবি",
  };
const handleBooking = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      alert("Please login first");
      return;
    }

    const { data } = await axios.post("https://jomijog.com/api/bookings", {
      userId: user._id,
      surveyorId: surveyor._id, // the surveyor you are viewing
      price: surveyor.price,     // make sure this exists
    });

    alert("Booking request sent successfully!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Booking failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Surveyor Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
              <img
                src={
                  surveyor.profileImage
                    ? `https://jomijog.com${surveyor.profileImage}`
                    : "/default-surveyor.jpg"
                }
                alt={surveyor.name}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Surveyor Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {/* Rating (placeholder 5 stars) */}
            <div className="flex items-center text-yellow-400 text-2xl">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {surveyor.name}
            </h1>

            {/* Experience */}
            <div className="flex items-center text-gray-600 gap-3 mt-6">
              <img src={experienceIcon} alt="Experience" className="w-6 h-6" />
              <span className="text-lg">
                {surveyor.experience
                  ? `${surveyor.experience} বছর`
                  : "অভিজ্ঞতা নেই"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center text-gray-600 gap-3 mt-3">
              <img src={priceIcon} alt="Price" className="w-6 h-6" />
              <span className="text-lg font-medium">
                {surveyor.price ? `${surveyor.price} টাকা` : "নির্ধারিত নেই"}
              </span>
            </div>

            {/* Show other details */}
            <div className="mt-8 space-y-3">
              {Object.entries(surveyor)
                .filter(([key]) => !hiddenFields.includes(key))
                .map(([key, value]) =>
                  key !== "profileImage" &&
                  key !== "name" &&
                  key !== "experience" &&
                  key !== "price" ? (
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2 text-gray-700"
                    >
                      <span className="font-semibold text-gray-600">
                        {fieldLabels[key] || key}
                      </span>
                      <span>{value || "নাই"}</span>
                    </div>
                  ) : null
                )}
            </div>

            {/* CTA Button */}
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