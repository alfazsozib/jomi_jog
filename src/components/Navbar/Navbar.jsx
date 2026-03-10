import { useEffect, useRef, useState } from "react";
import { FiLoader, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/icons/258x74_white.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("userInfo");
      setUser(null);
      window.dispatchEvent(new Event("storage"));
      setLoggingOut(false);
      navigate("/login");
    }, 1000);
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const goToProfile = () => {
    if (!user) return;
    if (user.role === "user") navigate("/dashboard");
    else if (user.role === "surveyor") navigate("/surveyor-dashboard");
    setDropdownOpen(false);
  };

  return (
    <header className="w-full py-2 relative">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={"/"}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-24 sm:w-28 md:w-32 lg:w-30 xl:w-40 h-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-6 lg:gap-4 xl:gap-6 text-[#151515] text-sm sm:text-base md:text-lg lg:text-base xl:text-xl font-medium">
          <Link to={"/"} className="hover:text-[#7ED957] transition">
            হোম
          </Link>
          <Link
            to={"/allsurveyors"}
            className="hover:text-[#7ED957] transition"
          >
            সার্ভেয়ার
          </Link>
          <Link to={"/consultant"} className="hover:text-[#7ED957] transition">
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

        {/* Right Section */}
        <div
          className="hidden md:flex items-center lg:gap-2 xl:gap-4 relative"
          ref={dropdownRef}
        >
          {/* Compact Sliding Search */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 transition z-50"
            >
              <FiSearch className="text-gray-600 text-xl" />
            </button>

            <div
              className={`absolute right-0 top-0 flex items-center bg-[#f5f5eb] border border-gray-200 rounded-lg px-2 py-1 shadow-md overflow-hidden transition-all duration-300 z-40
                ${showSearch ? "w-36 opacity-100" : "w-0 opacity-0"}
              `}
            >
              <FiSearch
                className={`text-gray-500 mr-1 text-lg transition-opacity duration-300 ${
                  showSearch ? "opacity-100" : "opacity-0"
                }`}
              />
              <input
                type="text"
                placeholder="সার্চ করুন"
                className={`bg-transparent focus:outline-none text-gray-700 w-full text-sm transition-opacity duration-300 ${
                  showSearch ? "opacity-100" : "opacity-0"
                }`}
                autoFocus
              />
            </div>
          </div>

          {/* User Section */}
          {user && (
            <div className="relative ml-4">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 w-10 h-10 rounded-full border-2 border-[#7ED957] overflow-hidden justify-center transform transition-transform duration-200 active:scale-90"
              >
                {user.profileImage ? (
                  <img
                    src={`https://jomijog.com${user.profileImage}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="w-6 h-6 text-[#7ED957]" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-200 z-50 overflow-hidden text-center">
                  <button
                    onClick={goToProfile}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    প্রোফাইল
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100 transition disabled:opacity-70"
                  >
                    {loggingOut ? (
                      <FiLoader className="animate-spin w-4 h-4 mr-2 inline-block" />
                    ) : (
                      "লগআউট"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <Link to={"/login"}>
              <button className="text-base lg:px-5 lg:py-2 xl:px-8 xl:py-3 bg-[#7ED957] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 ml-4">
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
            <Link to={"/"} className="hover:text-[#7ED957] transition">
              হোম
            </Link>
            <Link
              to={"/allsurveyors"}
              className="hover:text-[#7ED957] transition"
            >
              সার্ভেয়ার
            </Link>
            <Link
              to={"/consultant"}
              className="hover:text-[#7ED957] transition"
            >
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

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="flex items-center gap-2 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiSearch className="text-[#7ED957]" /> সার্চ
            </button>

            {showSearch && (
              <div className="flex items-center w-full bg-[#f5f5eb] rounded-lg px-3 py-2 border border-gray-200">
                <FiSearch className="text-gray-500 mr-2 text-lg" />
                <input
                  type="text"
                  placeholder="সার্চ করুন"
                  className="bg-transparent focus:outline-none text-gray-700 w-[200px] text-sm"
                  autoFocus
                />
              </div>
            )}

            {user && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={goToProfile}
                  className="flex items-center gap-2 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FiUser className="text-[#7ED957]" /> প্রোফাইল
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center justify-center gap-2 text-white font-semibold text-sm bg-red-500 px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-70"
                >
                  {loggingOut ? (
                    <FiLoader className="animate-spin w-5 h-5" />
                  ) : (
                    "লগআউট"
                  )}
                </button>
              </div>
            )}

            {!user && (
              <Link to={"/login"}>
                <button className="text-white font-semibold cursor-pointer text-sm bg-[#7ED957] px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md">
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
