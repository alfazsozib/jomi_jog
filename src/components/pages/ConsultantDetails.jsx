import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/Price.jpg";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConsultantDetails = () => {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch consultant details
  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const { data } = await axios.get(
          `https://jomijog.com/api/admin/consultants/${id}`
        );
        setConsultant(data);
      } catch (error) {
        console.error("Error fetching consultant:", error);
        toast.error("কনসালটেন্ট লোড করতে ব্যর্থ হয়েছে!");
      }
    };
    fetchConsultant();
  }, [id]);

  if (!consultant)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
        <style>{`
          .loader {
            border-top-color: #7ED957;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );

  // Fields to hide
  const hiddenFields = [
    "email",
    "password",
    "__v",
    "createdAt",
    "updatedAt",
    "_id",
    "mobile",
    "approvals",
  ];

  // Bangla field labels
  const fieldLabels = {
    role: "ভূমিকা",
    name: "নাম",
    age: "বয়স",
    mobile: "মোবাইল নম্বর",
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
    if (!selectedDate) {
      toast.warning("দয়া করে একটি তারিখ নির্বাচন করুন!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        toast.info("প্রথমে লগইন করুন!");
        navigate("/login");
        return;
      }

      setBookingLoading(true);

      await axios.post("https://jomijog.com/api/bookings", {
        userId: user._id,
        consultantId: consultant._id,
        price: consultant.price,
        status: "pending",
        date: selectedDate,
      });

      toast.success("বুকিং অনুরোধ পাঠানো হয়েছে!");
      setShowDatePicker(false);
      setSelectedDate("");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "বুকিং ব্যর্থ হয়েছে");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Consultant Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="flex justify-center items-center p-4">
                <img
                  src={
                    consultant.profileImage
                      ? `https://jomijog.com/uploads/${consultant.profileImage}`
                      : "/default-consultant.jpg"
                  }
                  alt={consultant.name}
                  className="h-auto w-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Consultant Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center text-yellow-400 text-2xl">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {consultant.name}
            </h1>

            <div className="flex items-center text-gray-600 gap-3 mt-6">
              <img src={experienceIcon} alt="Experience" className="w-6 h-6" />
              <span className="text-lg">
                {consultant.experience
                  ? `${consultant.experience} বছর`
                  : "অভিজ্ঞতা নেই"}
              </span>
            </div>

            <div className="flex items-center text-gray-600 gap-3 mt-3">
              <img src={priceIcon} alt="Price" className="w-6 h-6" />
              <span className="text-lg font-medium">
                {consultant.price ? `${consultant.price} টাকা` : "নির্ধারিত নেই"}
              </span>
            </div>

            {/* Other details */}
            <div className="mt-8 space-y-3">
              {Object.entries(consultant)
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

            {/* Date Picker */}
            {showDatePicker && (
              <div className="mt-6">
                <label className="block mb-2 font-semibold text-gray-700">
                  তারিখ নির্বাচন করুন:
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            )}

            {/* Book Now Button */}
            <button
              onClick={() => {
                if (!showDatePicker) {
                  setShowDatePicker(true);
                } else {
                  handleBooking();
                }
              }}
              disabled={bookingLoading}
              className={`mt-10 w-full flex justify-center items-center bg-[#7ED957] hover:bg-[#6cc14c] text-white py-3 px-6 rounded-lg font-semibold text-lg transition duration-300 shadow-md ${
                bookingLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {bookingLoading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
              ) : (
                "বুক দিন"
              )}
            </button>

            <style>{`
              .loader {
                border-top-color: #fff;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetails;
