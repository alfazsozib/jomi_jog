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
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
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
    <section className="bg-[#F5F3ED] py-16 px-6 sm:px-12">
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

        {/* Carousel Container */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: reviews.length * 8, // slower scroll
              ease: "linear",
            }}
          >
            {/* Duplicate reviews array for infinite loop */}
            {reviews.concat(reviews).map((rev, index) => (
              <motion.div
                key={rev._id + "-" + index}
                className="min-w-[300px] sm:min-w-[320px] md:min-w-[350px] bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
                whileHover={{ scale: 1.03 }}
              >
                {/* Stars */}
                <div className="flex text-[#7ED957] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`mr-1 ${i < rev.rating ? "text-[#7ED957]" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 italic flex-grow line-clamp-5">“{rev.feedback}”</p>

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
                    <h4 className="text-sm font-semibold text-gray-900">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;
