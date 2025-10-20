import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUser || storedUser.role !== "user") return;

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/users/${storedUser._id}`);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/bookings/user/${storedUser._id}`);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUserData();
    fetchBookings();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Accepted</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Dashboard</h1>

        {userData && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={userData.profileImage ? `http://localhost:5000${userData.profileImage}` : "/default-user.jpg"}
              alt={userData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#7ED957]"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600 mt-1">{userData.email}</p>
              <p className="text-gray-600">{userData.mobile || "No phone"}</p>
              <div className="mt-3">
                <span className="px-3 py-1 bg-[#7ED957] text-white rounded-full text-sm">Role: {userData.role}</span>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No bookings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className={`p-6 rounded-2xl shadow-md border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-xl ${
                  booking.status === "accepted" ? "bg-green-50" : booking.status === "rejected" ? "bg-red-50" : "bg-yellow-50"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Booking #{index + 1}</h2>
                  {renderStatusBadge(booking.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Surveyor Info</h3>
                    <p><strong>Name:</strong> {booking.surveyorId?.name || "N/A"}</p>
                    <p><strong>Mobile:</strong> {booking.surveyorId?.mobile || "N/A"}</p>
                    <p><strong>Price:</strong> {booking.price || "N/A"} টাকা</p>
                  </div>

                  <div>
                    {booking.status === "accepted" ? (
                      <p className="text-gray-700">Your booking has been accepted. Contact your surveyor for details.</p>
                    ) : booking.status === "rejected" ? (
                      <p className="text-gray-700">Your booking request was rejected.</p>
                    ) : (
                      <p className="text-gray-500 italic">Your booking is pending approval.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
