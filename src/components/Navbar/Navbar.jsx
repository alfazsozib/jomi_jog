import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import logoImage from "../../assets/icons/logo_2.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user info on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for login/logout changes
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
    window.dispatchEvent(new Event("storage")); // notify others
    navigate("/login");
  };

  return (
    <div>
      {/*  Navbar  */}
      <header className="flex items-center justify-between px-4 sm:px-[8%] py-4 ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={"/"}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto object-contain"
            />
          </Link>
        </div>

        {/* z */}
        <nav className="hidden md:flex gap-6 text-[#151515] text-sm sm:text-base md:text-lg font-medium">
          <Link to={"/"} className="hover:text-[#7ED957] transition">
            হোম
          </Link>
          <Link to={"/surveyor"} className="hover:text-[#7ED957] transition">
            সার্ভেয়ার
          </Link>
          <Link to={"consultant"} className="hover:text-[#7ED957] transition">
            পরামর্শদাতা
          </Link>
          <Link to={"/about"} className="hover:text-[#7ED957] transition">
            আমাদের সম্পর্কে
          </Link>
          <Link to={"/knowledge"} className="hover:text-[#7ED957] transition">
            সাধারণ জ্ঞান
          </Link>
          <Link
            to={"/contact-page"}
            className="hover:text-[#7ED957] transition"
          >
            যোগাযোগ
          </Link>
        </nav>

        {/* Search + Login/Logout (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center w-64 bg-[#f5f5eb] rounded-lg px-3 py-2 border border-gray-200">
            <FiSearch className="text-gray-500 mr-2 text-lg" />
            <input
              type="text"
              placeholder="সার্চ করুন"
              className="bg-transparent focus:outline-none text-gray-700 w-full text-base"
            />
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-white font-semibold text-base bg-red-500 px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              লগআউট
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="text-white font-semibold text-base bg-[#7ED957] px-6 py-3 rounded-lg hover:opacity-90 transition">
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
      </header>

      {/*  Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-white border-b border-gray-200 space-y-4">
          {/* Mobile Nav */}
          <nav className="flex flex-col gap-3 text-[#151515] text-base font-medium">
            <Link to={"/"} className="hover:text-[#7ED957] transition">
              হোম
            </Link>
            <Link to={"/surveyor"} className="hover:text-[#7ED957] transition">
              সার্ভেয়ার
            </Link>
            <Link to={"consultant"} className="hover:text-[#7ED957] transition">
              পরামর্শদাতা
            </Link>
            <Link to={"/about"} className="hover:text-[#7ED957] transition">
              আমাদের সম্পর্কে
            </Link>
            <Link to={"/knowledge"} className="hover:text-[#7ED957] transition">
              সাধারণ জ্ঞান
            </Link>
            <Link
              to={"/contact-page"}
              className="hover:text-[#7ED957] transition"
            >
              যোগাযোগ করুন
            </Link>
          </nav>

          {/* Search + Login/Logout (mobile) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center w-full bg-[#f5f5eb] rounded-lg px-3 py-2 border border-gray-200">
              <FiSearch className="text-gray-500 mr-2 text-lg" />
              <input
                type="text"
                placeholder="সার্চ করুন"
                className="bg-transparent focus:outline-none text-gray-700 w-full text-sm"
              />
            </div>

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
    </div>
  );
}

export default Navbar;
