import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer"; // make sure you have a Footer component

const AdminPermission = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/bookings/admin");
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${action}/${id}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to display status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Approved</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-400 text-white rounded-full text-sm font-semibold">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Booking Requests
        </h1>

        {requests.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No pending requests</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl border border-gray-200"
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-2">
                {renderStatusBadge(req.status)}
              </div>

              {/* User Details */}
              <h2 className="text-2xl font-semibold mb-3 border-b pb-2 text-gray-700">
                User Details
              </h2>
              <p className="text-gray-600"><strong>নাম:</strong> {req.user.name}</p>
              <p className="text-gray-600"><strong>মোবাইল:</strong> {req.user.mobile || "নাই"}</p>
              {req.user.address && (
                <p className="text-gray-600"><strong>ঠিকানা:</strong> {req.user.address}</p>
              )}

              {/* Surveyor Details */}
              <h2 className="text-2xl font-semibold mt-6 mb-3 border-b pb-2 text-gray-700">
                Surveyor Details
              </h2>
              <p className="text-gray-600"><strong>নাম:</strong> {req.surveyor.name}</p>
              <p className="text-gray-600"><strong>মোবাইল:</strong> {req.surveyor.mobile || "নির্ধারিত নেই"}</p>
              <p className="text-gray-600"><strong>অভিজ্ঞতা:</strong> {req.surveyor.experience || "নাই"}</p>
              <p className="text-gray-600"><strong>মূল্য:</strong> {req.surveyor.price || "নির্ধারিত নেই"}</p>

              {/* Action Buttons (only show if pending) */}
              {req.status === "pending" && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleAction(req._id, "approve")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition shadow-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "cancel")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminPermission;
