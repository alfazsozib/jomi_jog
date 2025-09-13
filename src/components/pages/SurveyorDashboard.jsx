import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const SurveyorDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user || user.role !== "surveyor") return;

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/bookings/surveyor/${user._id}`
        );
        setBookings(data.filter((b) => b.status === "approved"));
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Approved Bookings
        </h1>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No approved bookings yet.
          </p>
        )}

        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Booking #{index + 1}
                </h2>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                  Approved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    User Info
                  </h3>
                  <p>
                    <strong>নাম:</strong> {booking.user.name}
                  </p>
                  <p>
                    <strong>মোবাইল:</strong> {booking.user.mobile || "নাই"}
                  </p>
                  <p>
                    <strong>ঠিকানা:</strong>{" "}
                    {booking.user.address || "নির্ধারিত নেই"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Payment Info
                  </h3>
                  <p>
                    <strong>মূল্য:</strong> {booking.price} টাকা
                  </p>
                  <p>
                    <strong>Account Number:</strong> {booking.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyorDashboard;
