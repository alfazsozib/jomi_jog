const LandSurveyGuide = () => {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* Content div */}
      <div className="flex-grow px-4 sm:px-8 lg:px-16 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-8">
          {/* Header  */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7ED957] text-center ">
            ভূমি জরিপ ও খতিয়ান: একটি সংক্ষিপ্ত গাইড
          </h1>
          {/* ভূমি জরিপ কী */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7ED957] mb-3">
              ভূমি জরিপ কী?
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              ভূমি জরিপ হলো একটি এলাকার প্রতিটি ভূমিখণ্ড (প্লট) মাপজোক করে তার
              একটি নকশা (মৌজা নকশা) তৈরি করা এবং সেই জমির মালিক, জমির পরিমাণ কত,
              জমির ধরন (কৃষি/অকৃষি) ইত্যাদি তথ্য সম্বলিত একটি রেকর্ড (খতিয়ান)
              প্রস্তুত করা।
            </p>
          </div>

          {/* খতিয়ান কী */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7ED957] mb-3">
              খতিয়ান বা স্বত্বলিপি (RoR - Record of Rights) কী?
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              খতিয়ান হলো জমির মালিকানা ও অন্যান্য গুরুত্বপূর্ণ তথ্যের একটি
              সরকারি রেকর্ড বই। এখানে জমির মালিকের নাম, জমির পরিমাণ, খাজনা
              ইত্যাদি বিস্তারিত লিপিবদ্ধ থাকে।
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-2">
              বাংলাদেশে সময়ের সাথে সাথে বিভিন্ন জরিপ হয়েছে, যার ফলে বিভিন্ন
              ধরনের খতিয়ান তৈরি হয়েছে।
            </p>
          </div>

          {/* প্রধান খতিয়ান */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7ED957] mb-5">
              বাংলাদেশের প্রধান খতিয়ান
            </h2>

            {/* খতিয়ান তালিকা */}
            <div className="space-y-6">
              {/* CS */}
              <div className="border-l-4 border-[#7ED957] pl-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  ১. সি.এস. (CS - Cadastral Survey) খতিয়ান
                </h3>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                  <span className="font-semibold text-[#7ED957]">সময়কাল:</span>{" "}
                  ১৮৮৮ - ১৯৪০ সাল (ব্রিটিশ আমল)। <br />
                  <span className="font-semibold text-[#7ED957]">
                    গুরুত্ব:
                  </span>{" "}
                  এটি বাংলাদেশের প্রথম ভূমি জরিপ। ভূমি সংক্রান্ত বিরোধ বা মামলা
                  হলে এই খতিয়ানকে প্রায়ই চূড়ান্ত প্রমাণ হিসেবে ধরা হয়।{" "}
                  <br />
                  <span className="font-semibold text-[#7ED957]">
                    সি.এস.:
                  </span>{" "}
                  Cadastral Survey।
                </p>
              </div>

              {/* SA */}
              <div className="border-l-4 border-[#7ED957] pl-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  ২. এস.এ. (SA - State Acquisition) খতিয়ান
                </h3>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                  <span className="font-semibold text-[#7ED957]">সময়কাল:</span>{" "}
                  ১৯৫৬ - ১৯৬৩ সাল (পাকিস্তান আমল)। <br />
                  <span className="font-semibold text-[#7ED957]">
                    কারণ:
                  </span>{" "}
                  ১৯৫০ সালে 'জমিদারী প্রথা বিলুপ্ত' করার পর, জমিদারদের কাছ থেকে
                  সরকার জমি অধিগ্রহণ করে। সেই জমির রেকর্ড তৈরি করাই ছিল এই
                  জরিপের উদ্দেশ্য। <br />
                  <span className="font-semibold text-[#7ED957]">
                    সমস্যা:
                  </span>{" "}
                  খুব দ্রুত এবং জমিদারদের তত্ত্বাবধানে তৈরি হওয়ায় এই খতিয়ানে
                  ভুলের পরিমাণ বেশি। <br />
                  <span className="font-semibold text-[#7ED957]">
                    এস.এ.:
                  </span>{" "}
                  State Acquisition।
                </p>
              </div>

              {/* RS */}
              <div className="border-l-4 border-[#7ED957] pl-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  ৩. আর.এস. (RS - Revisional Survey) খতিয়ান
                </h3>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                  <span className="font-semibold text-[#7ED957]">সময়কাল:</span>{" "}
                  ১৯৬৩ সাল থেকে শুরু (এখনও কিছু এলাকায় চলছে)। <br />
                  <span className="font-semibold text-[#7ED957]">
                    কারণ:
                  </span>{" "}
                  এস.এ. খতিয়ানের ভুল সংশোধনের জন্য এই জরিপ করা হয়। <br />
                  <span className="font-semibold text-[#7ED957]">
                    অন্যান্য নাম:
                  </span>{" "}
                  বাংলাদেশ আমলে শুরু হওয়ায় একে বি.এস. (Bangladesh Survey) বা
                  বি.আর.এস. (Bangladesh Revisional Survey) খতিয়ানও বলা হয়।
                  সিটি কর্পোরেশন এলাকায় একে "সিটি খতিয়ান"ও ডাকা হয়। <br />
                  <span className="font-semibold text-[#7ED957]">
                    আর.এস.:
                  </span>{" "}
                  Revisional Survey।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className=" py-6 text-center">
        <p className="text-gray-600 text-xs sm:text-sm">
          © ২০২৫ <span className="text-[#7ED957] font-bold">জমিযোগ</span> ।
          সর্বস্বত্ব সংরক্ষিত
        </p>
      </footer>
    </div>
  );
};

export default LandSurveyGuide;
