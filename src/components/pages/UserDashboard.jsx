import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user || user.role !== "user") return;

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/bookings/user/${user._id}`
        );
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
            Approved
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Bookings
        </h1>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No bookings yet.</p>
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
                {renderStatusBadge(booking.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Surveyor Info
                  </h3>
                  <p>
                    <strong>নাম:</strong> {booking.surveyor.name}
                  </p>
                  <p>
                    <strong>মোবাইল:</strong>{" "}
                    {booking.surveyor.mobile || "নাই"}
                  </p>
                  <p>
                    <strong>মূল্য:</strong>{" "}
                    {booking.price || "নির্ধারিত নেই"} টাকা
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Payment Info
                  </h3>
                  {booking.status === "approved" ? (
                    <p>
                      <strong>Account Number:</strong>{" "}
                      {booking.accountNumber}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Account details will be available after approval.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
