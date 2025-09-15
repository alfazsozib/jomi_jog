import { useEffect, useRef, useState } from "react";
import knowledgeImage from "../../assets/images/basic Knowledge title.jpg";
import LandBuyingMistakes from "../GeneralKnowledgePages/LandBuyingMistakes";
import LandDocumentGuide from "../GeneralKnowledgePages/LandDocumentGuide";
import LandSurveyGuide from "../GeneralKnowledgePages/LandSurveyGuide";
import Navbar from "../Navbar/Navbar";
const GeneralKnowledge = () => {
  const [activePage, setActivePage] = useState(null);
  const contentRef = useRef(null); // scrolling

  const pages = {
    "জমি ক্রয়ে ভুল সমূহ": <LandBuyingMistakes />,
    "ভূমি জরিপ ও খতিয়ান": <LandSurveyGuide />,
    "দলিল সংক্রান্ত প্রয়োজনীয় তথ্য": <LandDocumentGuide />,
  };

  const topics = [
    {
      title: "জমি ক্রয়ে ভুল সমূহ",
      icon: "📉",
      desc: "জমি কেনার সময় সাধারণ ভুলগুলো এড়াতে নির্দেশনা।",
    },
    {
      title: "ভূমি জরিপ ও খতিয়ান",
      icon: "📑",
      desc: "জমির জরিপ ও খতিয়ান সম্পর্কিত প্রয়োজনীয় তথ্য।",
    },
    {
      title: "দলিল সংক্রান্ত প্রয়োজনীয় তথ্য",
      icon: "📝",
      desc: "জমির দলিল সঠিকভাবে যাচাই করার নির্দেশনা।",
    },
  ];

  // first topic by default
  useEffect(() => {
    setActivePage(topics[0].title);
  }, []);

  // auto Scroll the topic view
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activePage]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="mb-6 bg-white">
        <Navbar />
      </nav>

      {/* Hero Section */}
      <div className="text-center px-4 sm:px-8 mb-8">
        <div className="relative px-4 sm:px-8">
          <div
            className="relative  w-full h-[30vh] sm:h-[40vh] lg:h-[40vh] rounded-2xl overflow-hidden shadow-lg flex items-center flex-col justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${knowledgeImage})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-bold text-[#7ED957]">
              সাধারণ জ্ঞান
            </h1>
            <p className="text-white drop-shadow-2xl mt-2 text-sm sm:text-base max-w-xl mx-auto">
              জমি কেনা-বেচা ও পরিচালনার গুরুত্বপূর্ণ তথ্য, নির্দেশনা এবং
              গাইডলাইন।
            </p>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block sm:hidden px-4">
        {topics.map((topic) => (
          <div key={topic.title} className="mb-6">
            {/* Topic Button */}
            <button
              onClick={() => setActivePage(topic.title)}
              className={`w-full flex flex-col items-center text-center p-5 rounded-xl border-2 shadow-sm transition
                ${
                  activePage === topic.title
                    ? "bg-[#7ED957] text-white border-[#7ED957]"
                    : "bg-white text-[#303030] border-gray-200"
                }`}
            >
              <span className="text-3xl mb-2">{topic.icon}</span>
              <h2 className="text-lg font-semibold">{topic.title}</h2>
              <p
                className={`mt-1 text-sm ${
                  activePage === topic.title ? "text-green-50" : "text-gray-500"
                }`}
              >
                {topic.desc}
              </p>
            </button>

            {/* Details right down the clicked topic */}
            {activePage === topic.title && (
              <div
                ref={contentRef}
                className="mt-4 p-4 bg-white rounded-lg shadow-inner border"
              >
                {pages[activePage]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop / Tablet Layout */}
      <div className="hidden sm:block">
        {/* Topic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-8 md:px-20">
          {topics.map((topic) => (
            <button
              key={topic.title}
              onClick={() => setActivePage(topic.title)}
              className={`flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all shadow-sm hover:shadow-lg
                ${
                  activePage === topic.title
                    ? "bg-[#7ED957] text-white border-[#7ED957] scale-105"
                    : "bg-white text-[#303030] border-gray-200 hover:border-[#7ED957] hover:bg-green-50"
                }`}
            >
              <span className="text-4xl mb-3">{topic.icon}</span>
              <h2 className="text-lg sm:text-xl font-semibold">
                {topic.title}
              </h2>
              <p
                className={`mt-2 text-sm sm:text-base ${
                  activePage === topic.title ? "text-green-50" : "text-gray-500"
                }`}
              >
                {topic.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-12 px-8 md:px-20" ref={contentRef}>
          <div className="p-8 bg-white ">{pages[activePage]}</div>
        </div>
      </div>
    </div>
  );
};

export default GeneralKnowledge;
