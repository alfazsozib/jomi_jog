const LandDocumentGuide = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg ">

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Section */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7ED957] text-center">
          দলিল সংক্রান্ত প্রয়োজনীয় তথ্য
        </h1>
        {/* Intro */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#444] mb-3">
            দলিল কী?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            দলিল হলো একটি আইনগত লিখিত বা চুক্তি, যা কোনো ব্যক্তি, সম্পত্তি বা
            স্বার্থের ওপর এক বা একাধিক পক্ষের অধিকার, দায়িত্ব বা বাধ্যবাধকতা
            প্রমাণ, প্রতিষ্ঠা বা হস্তান্তর করে। সাধারণ কথায়, এটি একটি লিখিত
            প্রমাণপত্র যা আইনগত কার্যক্রমে ব্যবহার করা হয়।
          </p>
        </section>

        {/* Features */}
        <section>
          <h3 className="text-lg font-semibold text-[#7ED957] mb-2">
            দলিলের মূল বৈশিষ্ট্য:
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>এটি লিখিত হতে হয়।</li>
            <li>এতে সম্পত্তি বা অধিকার হস্তান্তরের ইচ্ছা প্রকাশ পায়।</li>
            <li>এটি রেজিস্ট্রি করা বাধ্যতামূলক (বাংলাদেশে দলিলের জন্য)।</li>
            <li>এটি আইনগতভাবে প্রয়োগযোগ্য।</li>
          </ul>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">উদাহরণ:</span> বিক্রয় দলিল, বন্ধক
            দলিল, দানপত্র, বায়নাপত্র ইত্যাদি।
            <br />
            <span className="font-semibold">আইনী দৃষ্টিভঙ্গি:</span> বাংলাদেশে
            রেজিস্ট্রেশন আইন, ১৯০৮ এবং সম্পত্তি হস্তান্তর আইন, ১৮৮২ অনুযায়ী
            দলিলের বৈধতা নির্ধারিত হয়।
          </p>
        </section>

        {/* Types of Deed */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#444] mb-3">
            বিভিন্ন ধরনের দলিল: সংজ্ঞা ও ব্যবহার
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "১. বিক্রয় দলিল (Sale Deed)",
                desc: "সম্পূর্ণ বা আংশিক মূল্য পরিশোধের বিনিময়ে কোনো সম্পত্তির মালিকানা স্থায়ীভাবে হস্তান্তর করার জন্য করা দলিল।",
                law: "সম্পত্তি হস্তান্তর আইন, ১৮৮২ (ধারা ৫৪)।",
              },
              {
                title: "২. সাফ কবলা দলিল",
                desc: "সম্পূর্ণ বা আংশিক মূল্য পরিশোধ সাপেক্ষে সম্পত্তির মালিকানা হস্তান্তর করার জন্য করা একটি দলিল। এটি মূলত বিক্রয় দলিলেরই একটি রূপ।",
              },
              {
                title: "৩. বায়নাপত্র / বিক্রয়চুক্তি দলিল (Agreement to Sell)",
                desc: "ভবিষ্যতে একটি নির্দিষ্ট শর্তে সম্পত্তি বিক্রি করার জন্য বিক্রেতা ও ক্রেতার মধ্যে হওয়া একটি চুক্তি। এটি প্রকৃত বিক্রয় নয়, বরং বিক্রির একটি অঙ্গীকারমাত্র।",
                law: "এই দলিল সম্পাদনের ৩০ দিনের মধ্যে রেজিস্ট্রি করতে হয়।",
              },
              {
                title: "৪. হেবা দলিল (Gift Deed for Muslims)",
                desc: "ইসলামি বিধান অনুযায়ী, কোনো মূল্য বা বিনিময় ছাড়াই পরিবারের সদস্যদের মধ্যে সম্পত্তি দান করার দলিল।",
                law: "শর্ত: কমপক্ষে দুইজন সাক্ষীর উপস্থিতিতে মৌখিক ঘোষণা থাকতে হবে।",
              },
              {
                title:
                  "৫. দানপত্র দলিল (Gift Deed for Hindus, Buddhists, Christians)",
                desc: "হিন্দু, বৌদ্ধ ও খ্রিস্টান ধর্মাবলম্বীদের ব্যক্তিগত আইন অনুসারে, পরিবারের সদস্যদের মধ্যে বিনিময় ছাড়াই সম্পত্তি দান করার দলিল।",
              },
              {
                title: "৬. ভ্রম সংশোধন দলিল (Deed of Rectification)",
                desc: "পূর্বে রেজিস্ট্রিকৃত কোনো দলিলের ছোটখাটো বা bona fide ভুল সংশোধন করার জন্য করা দলিল। এটি মূল দলিলকে বাতিল করে না।",
              },
              {
                title: "৭. বিনিময় দলিল (Exchange Deed)",
                desc: "এক পক্ষের সম্পত্তির বিনিময়ে অপর পক্ষের সম্পত্তি হস্তান্তর করার জন্য করা দলিল। (যেমন: জমির বদলে জমি)।",
              },
              {
                title: "৮. হেবা-বিল-এওয়াজ দলিল",
                desc: "প্রতীকী মূল্যর বিনিময়ে সম্পত্তি দান করার দলিল। (যেমন: ধর্মীয় বই, জায়নামাজ)",
              },
              {
                title: "৯. বন্ধক দলিল (Mortgage Deed)",
                desc: "ঋণ নেওয়ার সময় সেই ঋণের হিসেবে ঋণদাতাকে সম্পত্তির একটি আংশিক স্বার্থ হস্তান্তর করার দলিল। ঋণ শোধ করলে সম্পত্তি ফেরত পাওয়া যায়।",
              },
              {
                title: "১০. বন্ধকমুক্তি দলিল (Deed of Redemption)",
                desc: "সম্পূর্ণ ঋণ পরিশোধের পর বন্ধক গ্রহীতা বন্ধকদাতার সম্পত্তির দখল ও স্বত্ব ফিরিয়ে দেয়ার দলিল।",
              },
              {
                title: "১১. বন্টননামা দলিল (Partition Deed)",
                desc: "যৌথ সম্পত্তির একাধিক মালিক নিজেদের মধ্যে সম্পত্তি ভাগ করে নেওয়ার জন্য করা দলিল।",
              },
              {
                title: "১২. পাওয়ার অব অ্যাটর্নি (Power of Attorney - POA)",
                desc: "একজন ব্যক্তি অপরজনকে তার পক্ষে কাজ করার ক্ষমতা দেয়ার দলিল।",
                law: "সতর্কতা: এই দলিলের মাধ্যমে মালিকানা হস্তান্তর করা যায় না।",
              },
              {
                title: "১৩. বহালকরণপত্র (Deed of Confirmation)",
                desc: "পূর্বের কোনো দলিলে ছোটখাটো ত্রুটি থাকলে সেটিকে আইনগতভাবে শক্তিশালী করার দলিল।",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-[#7ED957]">
                  {item.title}
                </h4>
                <p className="text-gray-700 mt-1">{item.desc}</p>
                {item.law && (
                  <p className="text-sm text-gray-500 mt-1">{item.law}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Numbering Format */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#444] mb-3">
            জমি বিক্রয় দলিলের আধুনিক ফরম্যাট
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">দলিল নম্বর:</span> _________
            </p>
            <p>
              <span className="font-semibold">রেজিস্ট্রেশন অফিস:</span>{" "}
              _________
            </p>
            <p>
              <span className="font-semibold">তারিখ:</span> _________
            </p>

            <ol className="list-decimal list-inside space-y-2">
              <li>
                <span className="font-semibold">প্রস্তাবনা (Preamble):</span>{" "}
                "এই দলিলটি ________ তারিখে ..."{" "}
              </li>
              <li>
                <span className="font-semibold">পক্ষগণের বিবরণ (Parties):</span>{" "}
                বিক্রেতা ও ক্রেতার তথ্য
              </li>
              <li>
                <span className="font-semibold">
                  পটভূমি (Background/Recitals):
                </span>{" "}
                মালিকানার বিবরণ
              </li>
              <li>
                <span className="font-semibold">
                  বিবরণ (Definitions & Interpretation):
                </span>{" "}
                তফসিল-১ সম্পত্তির বিবরণ
              </li>
              <li>
                <span className="font-semibold">
                  বিক্রয়মূল্য (Consideration):
                </span>{" "}
                মোট মূল্য, অগ্রিম, বাকি
              </li>
              <li>
                <span className="font-semibold">হস্তান্তর (Transfer):</span>{" "}
                মালিকানা হস্তান্তর ঘোষণা
              </li>
              <li>
                <span className="font-semibold">দায়মুক্তি (Covenants):</span>{" "}
                বিক্রেতা ও ক্রেতার দায়
              </li>
              <li>
                <span className="font-semibold">সাক্ষ্য (Testimonium):</span>{" "}
                স্বাক্ষর
              </li>
              <li>
                <span className="font-semibold">সাক্ষী (Witnesses):</span>{" "}
                সাক্ষীর তথ্য
              </li>
              <li>
                <span className="font-semibold">
                  ক্রেতার স্বীকৃতি (Acceptance):
                </span>{" "}
                স্বীকৃতি ঘোষণা
              </li>
              <li>
                <span className="font-semibold">তফসিল-১ (Schedule-1):</span>{" "}
                জেলা, উপজেলা, মৌজা, দাগ, খতিয়ান
              </li>
              <li>
                <span className="font-semibold">
                  রেজিস্ট্রেশন (For Office Use):
                </span>{" "}
                বুক নম্বর, পৃষ্ঠা নম্বর
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandDocumentGuide;
