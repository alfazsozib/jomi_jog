import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const UserFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/feedbacks");
        if (Array.isArray(data)) setReviews(data);
        else setReviews([]);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center my-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7ED957]"></div>
      </div>
    );

  return (
    <section className="px-4 sm:px-8 my-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-gray-800">
        ব্যবহারকারীর মতামত
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <motion.div
              key={rev._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    rev.profileImage
                      ? `https://jomijog.com${rev.profileImage}`
                      : "https://via.placeholder.com/80"
                  }
                  alt={rev.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {rev.name}
                  </h3>
                  <p className="text-sm text-gray-500">{rev.role}</p>
                </div>
              </div>

              {/* Feedback */}
              <p className="mt-3 text-gray-700 italic leading-relaxed">
                “{rev.feedback}”
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mt-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="ml-2 text-sm text-gray-600">{rev.rating}/5</span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 font-medium">
            কোনো মতামত নেই
          </p>
        )}
      </div>
    </section>
  );
};

export default UserFeedback;
