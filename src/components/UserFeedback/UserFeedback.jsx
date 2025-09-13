import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const UserFeedbackBangla = () => {
  const reviews = [
    {
      id: 1,
      name: "রাহুল ইসলাম",
      role: "গৃহ মালিক",
      feedback:
        "সার্ভেয়ার অত্যন্ত পেশাদার ছিলেন। পুরো প্রক্রিয়াটি সহজ ও প্রত্যাশার চেয়ে ভালো ছিল!",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "মাহিন আহমেদ",
      role: "রিয়েল এস্টেট বিনিয়োগকারী",
      feedback:
        "চমৎকার সেবা! সময়মতো কাজ হয়েছে এবং রিপোর্ট খুবই বিস্তারিত ছিল। ভবিষ্যতেও ব্যবহার করবো।",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      name: "নাসরিন আক্তার",
      role: "স্থপতি",
      feedback:
        "খুবই সঠিক ও পেশাদারী কাজ। যোগাযোগ ছিল পরিষ্কার এবং সার্ভে আমাদের অনেক সময় বাঁচিয়েছে।",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=13",
    },
  ];

  return (
    <section className="bg-[#F5F3ED] py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading with animation */}
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

        {/* Reviews Grid with animation */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(({ id, name, role, feedback, rating, image }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2, 
              }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex text-[#7ED957] mb-3">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="mr-1" />
                  ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 italic flex-grow">“{feedback}”</p>

              {/* User */}
              <div className="flex items-center mt-6">
                <img
                  src={image}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3 text-left">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {name}
                  </h4>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedbackBangla;
