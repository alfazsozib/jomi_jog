import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

// Generate a consistent color from string (for avatar background)
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
};

// Generate initials for avatar
const getInitials = (name) => {
  if (!name) return "U";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/users"); 
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const visibleUsers = showAll ? users : users.slice(0, 8);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Navigation buttons */}
      <Navbar />
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap bg-[#69DB7C] rounded-2xl px-6 sm:px-12 lg:px-20 py-3 gap-3">
          <Link
            to="/users"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full bg-white font-semibold"
          >
            Users
          </Link>
          
          <Link
            to="/admin-surveyors"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Surveyor List
          </Link>
          
          <Link
            to="/add-surveyor"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Add More Surveyors
          </Link>
          
          <Link
            to="/transactions"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Transactions
          </Link>

          {/* NEW Link for Admin Booking Requests */}
          <Link
            to="/admin/permissions"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Booking Requests
          </Link>
        </div>
      </div>

      {/* Total Users */}
      <div className="flex justify-center mb-6">
        <div className="px-4 sm:px-6 py-2 bg-green-100 rounded text-sm sm:text-base lg:text-lg font-medium">
          Total Users: {users.length}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-lg">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* User Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {visibleUsers.map((user) => (
            <div
              key={user._id}
              className="border border-green-200 rounded-lg shadow hover:shadow-lg transition duration-300 p-3"
            >
              {user.profileImage ? (
                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt={user.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full h-48 sm:h-56 md:h-64 rounded flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: stringToColor(user.name) }}
                >
                  {getInitials(user.name)}
                </div>
              )}

              <div className="mt-2 text-sm sm:text-base">
                <p><b>নাম:</b> {user.name}</p>
                <p><b>ইমেইল:</b> {user.email}</p>
                <p><b>মোবাইল:</b> {user.mobile}</p>
                {user.address && <p><b>ঠিকানা:</b> {user.address}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See More Button */}
      {!loading && users.length > 8 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-green-200 hover:bg-green-300 rounded text-sm sm:text-base lg:text-lg transition duration-200"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
