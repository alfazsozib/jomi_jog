import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/icons/258x74_white.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));

    const syncUser = () => {
      const updatedUser = localStorage.getItem("userInfo");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const handleDashboard = () => {
    if (!user) return;
    if (user.role === "user") navigate("/dashboard");
    else if (user.role === "surveyor") navigate("/surveyor-dashboard");
  };

  return (
    <header className="w-full py-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={"/"}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-24 sm:w-28 md:w-32 lg:w-30 xl:w-40  h-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 lg:gap-4 xl:gap-6  text-[#151515] text-sm sm:text-base md:text-lg lg:text-base xl:text-xl  font-medium">
          <Link to={"/"} className="hover:text-[#7ED957] transition">হোম</Link>
          <Link to={"/surveyor"} className="hover:text-[#7ED957] transition">সার্ভেয়ার</Link>
          <Link to={"/consultant"} className="hover:text-[#7ED957] transition">পরামর্শদাতা</Link>
          <Link to={"/about"} className="hover:text-[#7ED957] transition">আমাদের সম্পর্কে</Link>
          <Link to={"/knowledge"} className="hover:text-[#7ED957] transition">সাধারণ জ্ঞান</Link>
          <Link to={"/contact-page"} className="hover:text-[#7ED957] transition">যোগাযোগ</Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center lg:gap-2 xl:gap-4">
          {/* Search */}
          <div className="flex items-center bg-[#f5f5eb] rounded-lg px-3 py-2 border border-gray-200 w-full max-w-xs lg:max-w-40 xl:max-w-md">
            <FiSearch className="text-gray-500 mr-2 text-lg" />
            <input
              type="text"
              placeholder="সার্চ করুন"
              className="bg-transparent focus:outline-none text-gray-700 w-full text-base"
            />
          </div>

          {/* User Buttons */}
          {user && (
            <button
              onClick={handleDashboard}
              className="text-base bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
            >
              Dashboard
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className=" text-base  lg:px-5 lg:py-2 xl:px-8 xl:py-3 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 "
            >
              লগআউট
            </button>
          ) : (
            <Link to={"/login"}>
              <button className=" text-base lg:px-5 lg:py-2 xl:px-8 xl:py-3 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 ">
                লগইন
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-white border-t border-gray-200 space-y-4">
          <nav className="flex flex-col gap-3 text-[#151515] text-base font-medium">
            <Link to={"/"} className="hover:text-[#7ED957] transition">হোম</Link>
            <Link to={"/surveyor"} className="hover:text-[#7ED957] transition">সার্ভেয়ার</Link>
            <Link to={"/consultant"} className="hover:text-[#7ED957] transition">পরামর্শদাতা</Link>
            <Link to={"/about"} className="hover:text-[#7ED957] transition">আমাদের সম্পর্কে</Link>
            <Link to={"/knowledge"} className="hover:text-[#7ED957] transition">সাধারণ জ্ঞান</Link>
            <Link to={"/contact-page"} className="hover:text-[#7ED957] transition">যোগাযোগ করুন</Link>
          </nav>

          <div className="flex flex-col gap-3">
            <div className="flex items-center w-full bg-[#f5f5eb] rounded-lg px-3 py-2 border border-gray-200">
              <FiSearch className="text-gray-500 mr-2 text-lg" />
              <input
                type="text"
                placeholder="সার্চ করুন"
                className="bg-transparent focus:outline-none text-gray-700 w-full text-sm"
              />
            </div>

            {user && (
              <button
                onClick={handleDashboard}
                className="text-white font-semibold text-sm bg-blue-500 px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md"
              >
                Dashboard
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-white font-semibold text-sm bg-red-500 px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md"
              >
                লগআউট
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="text-white font-semibold text-sm bg-[#7ED957] px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md">
                  লগইন
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
