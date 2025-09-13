const LandBuyingMistakes = () => {
  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#7ED957] mb-6 text-center leading-snug">
          জমি কেনার সময় এই ভুলগুলো একদম করবেন না
        </h1>

        <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          {/* Mistake 1 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ১. মালিকানা পুরো ইতিহাস না দেখা:
            </h2>
            <p>
              সি.এস. → এস.এ. → আর.এস. রেকর্ড মিলিয়ে দেখবেন, মালিকানা ধারাবাহিক
              ও সঠিক কিনা।
            </p>
          </div>

          {/* Mistake 2 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ২. বেদখল জমি কেনা:
            </h2>
            <p>
              জমিতে কারও দখল (বেদখল) থাকলে সেটি কিনবেন না। এতে ভবিষ্যতে বড়
              সমস্যা হতে পারে।
            </p>
          </div>

          {/* Mistake 3 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৩. ভূমি অফিস থেকে তথ্য সংগ্রহ না করা:
            </h2>
            <p>
              শুধু দলিল দেখে বিশ্বাস করবেন না। ভূমি অফিসে গিয়ে সব তথ্য
              (খতিয়ান, খাজনা ইত্যাদি) যাচাই করুন।
            </p>
          </div>

          {/* Mistake 4 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৪. সার্ভেয়ার দিয়ে দাগ/সীমানা নির্ধারণ না করা:
            </h2>
            <p>
              জমির সঠিক সীমানা ও পরিমাণ সরকারি জরিপকারী (সার্ভেয়ার) দিয়ে
              নিশ্চিত করুন।
            </p>
          </div>

          {/* Mistake 5 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৫. রাস্তা সম্পর্কে নিশ্চিত না হওয়া:
            </h2>
            <p>
              জমিতে যাওয়ার রাস্তা আপনার জমির ভেতর দিয়ে নাকি পাশের জমির ভেতর
              দিয়ে? রাস্তার বৈধ নথি যাচাই করুন।
            </p>
          </div>

          {/* Mistake 6 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৬. বন্ধক/লোন আছে কিনা না দেখা:
            </h2>
            <p>
              জমিটি ব্যাংকে বন্ধক আছে কিনা যাচাই (Encumbrance Certificate) করুন।
              লোন থাকলে সেই দায় আপনার উপর আসতে পারে।
            </p>
          </div>

          {/* Mistake 7 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৭. সহী (পাশের মালিক) যাচাই না করা:
            </h2>
            <p>
              পাশের জমির মালিকদের সাথে সীমানা নিয়ে কোনো দ্বন্দ্ব আছে কিনা খুঁজে
              দেখুন।
            </p>
          </div>

          {/* Mistake 8 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৮. নির্মাণের অনুমতি (NOC) না দেখা:
            </h2>
            <p>
              জমিতে বাড়ি নির্মাণের জন্য সিটি কর্পোরেশন/পৌরসভার কোনো NOC
              প্রয়োজন কিনা, আর থাকলে তা বৈধ কিনা নিশ্চিত করুন।
            </p>
          </div>

          {/* Mistake 9 */}
          <div>
            <h2 className="font-semibold text-[#7ED957] mb-1">
              ৯. বিশেষজ্ঞের মতামত না নেওয়া:
            </h2>
            <p>
              একজন ভূমি আইনজীবী ও অভিজ্ঞ সার্ভেয়ারের মতামত নিন। তাদের ফি জমির
              দামের তুলনায় ও ঝুঁকির তুলনায় অতি সামান্য।
            </p>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-8 p-4 sm:p-6 bg-[#7ED957]/10 border-l-4 border-[#7ED957] rounded-lg">
          <p className="text-gray-800 font-medium leading-relaxed">
            <span className="font-bold">সংক্ষেপে:</span> উপরের যেকোনো একটি ভুল
            আপনার জন্য আর্থিক ক্ষতি এবং দীর্ঘ আইনি ঝামেলার কারণ হতে পারে। তাই
            জমি কেনার সময় সর্বোচ্চ সতর্কতা অবলম্বন করুন।
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="  py-6 text-center">
        <p className="text-gray-600 text-xs sm:text-sm mt-10">
          © ২০২৫ <span className="text-[#7ED957] font-bold">জমিযোগ</span> ।
          সর্বস্বত্ব সংরক্ষিত
        </p>
      </footer>
    </div>
  );
};

export default LandBuyingMistakes;
