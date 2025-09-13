import land01 from "../../assets/images/land-01.jpg";
import land02 from "../../assets/images/land-02.jpg";
import land03 from "../../assets/images/land-03.jpg";
import land04 from "../../assets/images/land-04.jpg";
import land05 from "../../assets/images/land-05.jpg";
import Navbar from "../Navbar/Navbar";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      {/* Hero Section */}
      <div className="relative px-4 sm:px-8">
        <div
          className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[40vh] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${land01})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-bold text-[#7ED957]">
            আমাদের সম্পর্কে
          </h1>
        </div>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 sm:px-[8%] mt-10 items-center">
        {/* Left side */}
        <div className="space-y-6 text-center md:text-start ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7ED957]  ">
            কোম্পানি ওভারভিউ
          </h2>
          <p className="text-base sm:text-lg leading-relaxed ">
            <span className="text-[#7ED957] font-semibold">জমিযোগ</span> হলো
            একটি বিশ্বস্ত অনলাইন প্ল্যাটফর্ম যেখানে আপনি সহজে{" "}
            <span className="text-[#7ED957]">যোগ্য ও অনুমোদিত সার্ভেয়ার</span>{" "}
            বুক করতে পারবেন। জমি সংক্রান্ত সমস্যাগুলো সমাধান করা এবং স্বচ্ছ সেবা
            প্রদান করাই আমাদের মূল লক্ষ্য।
          </p>
          <p className="text-base sm:text-lg leading-relaxed  ">
            আমরা বিশ্বাস করি, প্রতিটি গ্রাহককে সঠিক সময়ে, সঠিক দামে এবং সঠিক
            সেবার মাধ্যমে সাহায্য করা আমাদের দায়িত্ব। তাই{" "}
            <span className="text-[#7ED957] font-semibold">
              আস্থা, নিরাপত্তা এবং নির্ভরযোগ্যতা
            </span>{" "}
            আমাদের প্রধান মূলনীতি।
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center md:justify-start">
          <img
            src={land02}
            alt="Land Survey"
            className="w-full sm:w-[270px] h-[170px] md:h-[410px] rounded-2xl shadow-lg object-cover"
          />
          <img
            src={land03}
            alt="Land surveying"
            className="hidden sm:block w-full sm:w-[304px] h-[300px] mt-4 sm:mt-[17%] rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Who We Are */}

      <div className="flex flex-col md:flex-row-reverse px-6 sm:px-[8%] gap-10 mt-10 bg-gray-50 py-8 items-center">
        {/* Left side */}
        <div className="space-y-6 text-center md:text-start ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7ED957]">
            আমরা কারা
          </h2>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              আমাদের কাজের প্রতি দায়বদ্ধতা
            </h3>
            <p>
              আমরা প্রতিটি প্রকল্পকে আমাদের নিজের কাজ হিসেবে দেখি। আমাদের লক্ষ্য
              হলো গ্রাহকের চাহিদা পূরণ করা এবং সর্বোচ্চ মানের সেবা নিশ্চিত করা।
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              চ্যালেঞ্জ মোকাবেলার ক্ষমতা
            </h3>
            <p>
              জমি সংক্রান্ত নানা জটিল সমস্যা সমাধানে আমাদের অভিজ্ঞ টিম দক্ষভাবে
              কাজ করে। চ্যালেঞ্জিং পরিস্থিতিতেও আমরা সমাধান খুঁজে বের করি।
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              সন্তোষজনক ফলাফল প্রদান
            </h3>
            <p>
              আমাদের প্রতিশ্রুতি হলো—প্রতিটি গ্রাহক যেন সন্তুষ্ট থাকে এবং তার
              জমির সঠিক সমাধান পায়।
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className=" w-full sm:w-[80%] md:w-[80%] ">
          <img
            src={land04}
            alt="Surveyor at work"
            className="w-full h-[170px] md:h-[400px] rounded-2xl shadow-lg object-cover "
          />
        </div>
      </div>

      {/* Why Trust Us */}
      <div className="px-6 sm:px-[8%] py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center md:text-start ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7ED957]">
            কেন আমাদের বেছে নেবেন?
          </h2>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              সাশ্রয়ী ও মানসম্মত সেবা
            </h3>
            <p>
              আমরা প্রতিটি সেবা সঠিক দামে প্রদান করি যাতে আপনি সর্বোচ্চ মান পান।
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              নির্ভরযোগ্যতা ও স্বচ্ছতা
            </h3>
            <p>
              আমাদের প্রতিটি কাজ সম্পূর্ণ স্বচ্ছ ও নির্ভরযোগ্য। গ্রাহক যা দেখেন,
              তাই পান।
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#7ED957]">
              অভিজ্ঞ ও পেশাদার টিম
            </h3>
            <p>
              অভিজ্ঞ সার্ভেয়ার ও পেশাদার টিম প্রতিটি ধাপে আপনাকে সহায়তা করে,
              যেন <br />
              আপনার জমি সংক্রান্ত সমস্যার সমাধান সহজ হয়।
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80"
          alt="Service"
          className="rounded-2xl shadow-lg w-full h-[170px] md:h-auto  object-cover"
        />
      </div>

      {/* Call to Action */}
      <div
        className="relative  bg-cover bg-center py-8 md:py-20 text-center object-center object-cover"
        style={{ backgroundImage: `url(${land05})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white px-6 sm:px-[8%]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 ">
            জমি সংক্রান্ত সেবা দরকার?
          </h2>
          <p className=" mb-3 md:mb-10 text-base md:text-xl">
            আজই আমাদের সাথে যোগাযোগ করুন এবং বিশ্বস্ত সার্ভেয়ারের সহায়তা নিন।
          </p>
          <a
            href="tel:+8801725548150"
            className="bg-[#7ED957] text-black px-6 py-3 rounded-full font-semibold inline-block"
          >
            এখনই যোগাযোগ করুন
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
