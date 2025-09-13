import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/Price.jpg";

const CartSurveyor = () => {
  const [surveyors, setSurveyors] = useState([]);
  const navigate = useNavigate();

  // Fetch surveyors from backend
  useEffect(() => {
    const fetchSurveyors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users/surveyors");
        setSurveyors(data);
      } catch (error) {
        console.error("Error fetching surveyors:", error);
      }
    };
    fetchSurveyors();
  }, []);

  // Reusable surveyor card
  const SurveyorCard = ({ _id, name, img, experience, price }) => (
    <div className="bg-white rounded-2xl border border-[#7ed95659] overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-64 pt-5 flex items-center justify-center bg-white rounded-t-2xl overflow-hidden">
        {img ? (
          <img
            src={`http://localhost:5000${img}`}
            alt={name}
            className="max-h-full max-w-full object-cover"
            loading="lazy"
          />
        ) : (
          <img
            src="/default-surveyor.jpg"
            alt={name}
            className="max-h-full max-w-full object-cover"
          />
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Stars */}
        <div className="flex items-center text-[#7ED957] text-sm">
          {Array(5)
            .fill()
            .map((_, i) => (
              <FaStar key={i} className="mr-1" />
            ))}
        </div>

        {/* Name */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mt-2">
          {name}
        </h2>

        {/* Experience and Price */}
        <div className="flex flex-wrap items-center my-4 gap-3 text-gray-600 text-xs sm:text-sm">
          <div className="flex items-center">
            <img src={experienceIcon} alt="" className="w-4 h-4" />
            <span className="ml-1">{experience}</span>
          </div>
          <div className="flex items-center">
            <img src={priceIcon} alt="" className="w-4 h-4" />
            <span className="ml-1">{price}</span>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex gap-2.5">
          <button
            className="w-full bg-[#7ED957] text-white py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
            onClick={() => navigate(`/surveyors/${_id}`)}
          >
            বিস্তারিত
          </button>
          <button className="w-full bg-[#7ED957] text-white py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition">
            বুক দিন
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F3ED]">
      <h1 className="pt-16 pb-10 text-[#151515] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center">
        আমাদের সার্ভেয়ার সমূহ
      </h1>

      {/* Cards Grid */}
      <div className="px-4 sm:px-8 pb-16">
        <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {surveyors.map((surveyor) => (
            <SurveyorCard
              key={surveyor._id}
              _id={surveyor._id}
              name={surveyor.name}
              img={surveyor.profileImage}
              experience={surveyor.experience ? `${surveyor.experience} বছর` : "অভিজ্ঞতা নেই"}
              price={surveyor.price ? `${surveyor.price} টাকা` : "নির্ধারিত নেই"}
            />
          ))}
        </div>
      </div>

      {/* See more button */}
      <div className="flex justify-center pb-16">
        <button className="px-8 py-3 sm:px-10 sm:py-4 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300">
          আরও দেখুন
        </button>
      </div>
    </div>
  );
};

export default CartSurveyor;
