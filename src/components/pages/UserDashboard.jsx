import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Spinner state

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      if (!storedUser || storedUser.role !== "user") return;

      try {
        setLoading(true); // ✅ Start spinner
        const [userRes, bookingRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${storedUser._id}`),
          axios.get(`http://localhost:5000/api/bookings/user/${storedUser._id}`)
        ]);

        setUserData(userRes.data);
        setBookings(bookingRes.data);
      } catch (error) {
        console.error("Error fetching user data or bookings:", error);
      } finally {
        setLoading(false); // ✅ Stop spinner
      }
    };

    fetchData();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
            Rejected
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-14 h-14 border-4 border-[#7ED957] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          User Dashboard
        </h1>

        {/* === User Info Card === */}
        {userData && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={
                userData.profileImage
                  ? `http://localhost:5000${userData.profileImage}`
                  : "/default-user.jpg"
              }
              alt={userData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#7ED957]"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-600 mt-1">{userData.email}</p>
              <p className="text-gray-600">{userData.mobile || "No phone"}</p>
              <div className="mt-3">
                <span className="px-3 py-1 bg-[#7ED957] text-white rounded-full text-sm">
                  Role: {userData.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* === Bookings Section === */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-2xl shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">#</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Message</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .slice() // ✅ create a copy to avoid mutating state
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // ✅ recent first
                  .map((booking, index) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {booking.surveyorId?.name || booking.consultantId?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4">{booking.price || "N/A"} টাকা</td>
                      <td className="py-3 px-4">{renderStatusBadge(booking.status)}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {booking.status === "accepted"
                          ? "Your booking has been accepted. We will contact you soon"
                          : booking.status === "rejected"
                          ? "Your booking request was rejected."
                          : "Your booking is pending approval."}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
