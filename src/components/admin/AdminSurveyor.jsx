import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminSurveyor = () => {
  const [surveyors, setSurveyors] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // ✅ Load data from backend
  useEffect(() => {
    const fetchSurveyors = async () => {
      try {
        const { data } = await axios.get("https://jomijog.com/api/users/surveyors");
        setSurveyors(data);
      } catch (err) {
        console.error("Failed to fetch surveyors", err);
      }
    };
    fetchSurveyors();
  }, []);

  // ✅ Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("আপনি কি নিশ্চিতভাবে এই সার্ভেয়ারকে মুছে ফেলতে চান?");
    if (!confirmDelete) return;

    try {
      // call delete API if exists
      await axios.delete(`https://jomijog.com/api/users/${id}`);
      setSurveyors((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete surveyor", err);
    }
  };

  const visibleSurveyors = showAll ? surveyors : surveyors.slice(0, 6);

  return (
    <div className="p-4">
      {/* Navigation buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap bg-[#69DB7C] rounded-2xl px-6 sm:px-12 lg:px-20 py-3 gap-3">
          <Link to="/users" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full bg-white font-semibold">
            Users
          </Link>
          <Link to="/admin-surveyors" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">
            Surveyor List
          </Link>
          <Link to="/add-surveyor" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">
            Add More Surveyors
          </Link>
          <Link to="/transactions" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">
            Transactions
          </Link>
          <Link
            to="/admin/permissions"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Booking Requests
          </Link>
        </div>
      </div>

      {/* Top Info */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="px-6 py-2 bg-green-100 rounded">
          Total Surveyor : {surveyors.length}
        </div>
        <button
          onClick={() => navigate("/add-surveyor")}
          className="px-6 py-2 bg-green-200 rounded hover:bg-green-300 transition"
        >
          Add Surveyor
        </button>
      </div>

      {/* Surveyor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {visibleSurveyors.map((s) => (
          <div key={s._id} className="bg-white rounded-2xl border border-[#7ed95659] shadow overflow-hidden">
            {/* Image */}
            <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
              {s.profileImage ? (
                <img
                  src={`https://jomijog.com${s.profileImage}`}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/default-surveyor.jpg"
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="p-4 text-sm">
              <p><b>নাম:</b> {s.name}</p>
              <p><b>অভিজ্ঞতা:</b> {s.experience ? `${s.experience} বছর` : "নির্ধারিত নেই"}</p>
              <p><b>মূল্য:</b> {s.price ? `${s.price} টাকা` : "নির্ধারিত নেই"}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 p-3">
              <button
                onClick={() => handleDelete(s._id)}
                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => navigate("/add-surveyor", { state: { surveyor: s } })}
                className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More */}
      <div className="flex justify-center">
        {surveyors.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-green-200 rounded"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSurveyor;
