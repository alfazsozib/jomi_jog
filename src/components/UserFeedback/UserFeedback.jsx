import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const UserFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/feedbacks");
        if (Array.isArray(data)) setReviews(data);
        else setReviews([]);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (!reviews.length) return;

    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (loading)
    return (
      <div className="flex justify-center items-center my-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7ED957]"></div>
      </div>
    );

  const startIndex = page * ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="bg-[#F5F3ED] my-24 py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#151515] mb-4"
        >
          আমাদের গ্রাহকদের মতামত
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          শত শত গ্রাহক আমাদের সেবায় সন্তুষ্ট। নিচে তাদের কয়েকটি মতামত দেওয়া হলো।
        </motion.p>

        {/* Carousel */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentReviews.map((rev) => (
                <motion.div
                  key={rev._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Stars */}
                  <div className="flex text-[#7ED957] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`mr-1 ${
                          i < rev.rating ? "text-[#7ED957]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-700 italic flex-grow line-clamp-5">
                    “{rev.feedback}”
                  </p>

                  {/* User */}
                  <div className="flex items-center mt-6">
                    <img
                      src={
                        rev.profileImage
                          ? `http://localhost:5000${rev.profileImage}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3 text-left">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-gray-500">{rev.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;
