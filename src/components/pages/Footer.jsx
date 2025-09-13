import { Link } from "react-router-dom";
import facebookIcon from "../../assets/icons/facebook.png";
import logoImage from "../../assets/icons/logo_2.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";

const Footer = () => {
  return (
    <div className="bg-[#2F2C2C] px-6 sm:px-[8%]">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row py-10 md:py-[8%] justify-between gap-10 md:gap-0">
        {/* Left Column */}
        <div className="text-white md:w-[47%]">
          <Link to={"/"}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-32 sm:w-40 md:w-48 lg:w-56"
            />
          </Link>
          <p className="mt-6 sm:mt-10 text-sm sm:text-base leading-relaxed">
            জমি নিয়ে চিন্তা নয়! ভেরিফাইড সার্ভেয়ার খুঁজুন, এক্সপার্টদের
            অ্যাডভাইস নিন সবকিছু এক জায়গায়। আপনার জমির Journey-কে করুন সহজ,
            নিরাপদ ও নিশ্চিত।
          </p>
          <div className="flex mt-6 gap-6 sm:gap-8">
            <a
              href="https://www.facebook.com/people/Jomijog/61580029160200/?sk=about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 sm:w-7" />
            </a>
            <img src={whatsappIcon} alt="WhatsApp" className="w-6 sm:w-7" />
          </div>
        </div>

        {/* Middle Column */}
        <div className="text-white">
          <h1 className="font-bold mb-4 text-base sm:text-lg">
            গুরুত্বপূর্ণ লিঙ্ক
          </h1>
          <div className="space-y-2 text-sm sm:text-base flex flex-col">
            <Link to="/" className="hover:text-[#7ED957] transition">
              হোম
            </Link>
            <Link to="/surveyor" className="hover:text-[#7ED957] transition">
              সার্ভেয়ার
            </Link>
            <Link to={"consultant"} className="hover:text-[#7ED957] transition">
              পরামর্শদাতা
            </Link>
            <Link to="/about" className="hover:text-[#7ED957] transition">
              আমাদের সম্পর্কে
            </Link>
            <Link to="/knowledge" className="hover:text-[#7ED957] transition">
              সাধারণ জ্ঞান
            </Link>
            <Link
              to="/contact-page"
              className="hover:text-[#7ED957] transition"
            >
              যোগাযোগ
            </Link>
            <Link to="/login" className="hover:text-[#7ED957] transition">
              লগইন
            </Link>
            <Link to="/login" className="hover:text-[#7ED957] transition">
              LogIn As a Admin
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="text-white">
          <h1 className="font-bold mb-4 text-base sm:text-lg">
            যোগাযোগের তথ্য
          </h1>
          <div className="space-y-2 text-sm sm:text-base mb-4">
            <p>+8801885447306</p>
            <p>jomijog@gmail.com</p>
          </div>

          {/* Temporary Buttons for check for working */}
          <div className="flex flex-col gap-2">
            <Link
              to="/users"
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition"
            >
              User Page
            </Link>

            <Link
              to="/transactions"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition"
            >
              Transactions Page
            </Link>
            <Link
              to="/admin-surveyors"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition"
            >
              Surveyors
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-[#ffffff40] mb-6 sm:mb-[45px]"></div>

      {/* Bottom Bar */}
      <div className="text-white flex flex-col sm:flex-row justify-between items-center gap-3 pb-6 sm:pb-[3%] text-sm sm:text-base">
        <h1>
          কপিরাইট
          <span className="mx-1.5">©২০২৫</span>
          জমিযোগ।
        </h1>
        <h1>Build by Team Map Mentors</h1>
      </div>
    </div>
  );
};

export default Footer;
