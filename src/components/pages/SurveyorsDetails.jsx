import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/taka.png";
import Navbar from "../Navbar/Navbar";

// ─── Calendar Helpers ───────────────────────────────────────
const MONTHS = [
  "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
  "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
];
const DAYS = ["রবি","সোম","মঙ্গল","বুধ","বৃহঃ","শুক্র","শনি"];

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

const toKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay    = (y, m) => new Date(y, m, 1).getDay();

// ─── Booking Calendar Component ─────────────────────────────
const BookingCalendar = ({ bookedDates, selectedDate, onSelect }) => {
  const [cur, setCur] = useState({
    year:  todayDate.getFullYear(),
    month: todayDate.getMonth(),
  });

  const prev = () =>
    setCur((c) => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () =>
    setCur((c) => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const daysInMonth = getDaysInMonth(cur.year, cur.month);
  const firstDay    = getFirstDay(cur.year, cur.month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={cal.wrap}>
      {/* Month nav */}
      <div style={cal.header}>
        <button style={cal.navBtn} onClick={prev}>‹</button>
        <span style={cal.monthLabel}>{MONTHS[cur.month]} {cur.year}</span>
        <button style={cal.navBtn} onClick={next}>›</button>
      </div>

      {/* Day names */}
      <div style={cal.grid}>
        {DAYS.map((d) => <div key={d} style={cal.dayName}>{d}</div>)}
      </div>

      {/* Date cells */}
      <div style={cal.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;

          const date = new Date(cur.year, cur.month, day);
          date.setHours(0, 0, 0, 0);
          const key        = toKey(date);
          const isPast     = date < todayDate;
          const isBooked   = bookedDates.includes(key);
          const isSelected = selectedDate === key;
          const isToday    = key === toKey(todayDate);
          const disabled   = isPast || isBooked;

          let cellStyle = { ...cal.cell };
          if (isSelected)    cellStyle = { ...cellStyle, ...cal.selected };
          else if (isBooked) cellStyle = { ...cellStyle, ...cal.booked };
          else if (isPast)   cellStyle = { ...cellStyle, ...cal.past };
          else if (isToday)  cellStyle = { ...cellStyle, ...cal.today };
          else               cellStyle = { ...cellStyle, ...cal.avail };

          return (
            <div
              key={key}
              style={cellStyle}
              onClick={() => !disabled && onSelect(key)}
              title={isPast ? "অতীত তারিখ" : isBooked ? "বুকড" : "ক্লিক করুন"}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={cal.legend}>
        <span style={cal.legendItem}><span style={{ ...cal.dot, background: "#7ED957" }} /> পাওয়া যাচ্ছে</span>
        <span style={cal.legendItem}><span style={{ ...cal.dot, background: "#ef4444" }} /> বুকড</span>
        <span style={cal.legendItem}><span style={{ ...cal.dot, background: "#f59e0b" }} /> নির্বাচিত</span>
        <span style={cal.legendItem}><span style={{ ...cal.dot, background: "#d1d5db" }} /> অতীত</span>
      </div>
    </div>
  );
};

// ─── Calendar Styles ────────────────────────────────────────
const cal = {
  wrap:       { width: "100%", fontFamily: "'Segoe UI', sans-serif" },
  header:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  navBtn:     { background: "#e8f8de", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 20, color: "#5cb83a", fontWeight: 700, lineHeight: 1 },
  monthLabel: { fontWeight: 700, fontSize: 16, color: "#1a1a2e" },
  grid:       { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 },
  dayName:    { textAlign: "center", fontSize: 10, fontWeight: 700, color: "#888", padding: "4px 0" },
  cell:       { textAlign: "center", borderRadius: 10, padding: "8px 0", fontSize: 13, fontWeight: 600, transition: "all 0.15s", userSelect: "none", cursor: "pointer" },
  past:       { color: "#d1d5db", cursor: "not-allowed" },
  booked:     { background: "#fef2f2", color: "#ef4444", border: "2px solid #fca5a5", cursor: "not-allowed" },
  today:      { background: "#e8f8de", color: "#5cb83a", border: "2px solid #7ED957", fontWeight: 800, cursor: "pointer" },
  avail:      { background: "#e8f8de", color: "#5cb83a", border: "2px solid transparent", cursor: "pointer" },
  selected:   { background: "#f59e0b", color: "#fff", border: "2px solid #d97706", fontWeight: 800, cursor: "pointer" },
  legend:     { display: "flex", gap: 12, marginTop: 14, justifyContent: "center", flexWrap: "wrap" },
  legendItem: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#888" },
  dot:        { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
};

// ─── Main SurveyorsDetails ──────────────────────────────────
const SurveyorsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Read logged-in user at top level for JSX access
  const loggedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const isSurveyor = loggedUser?.role === "surveyor";

  const [surveyor,       setSurveyor]       = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedDate,   setSelectedDate]   = useState("");
  const [bookedDates,    setBookedDates]    = useState([]);

  useEffect(() => { fetchSurveyor(); }, [id]);

  const fetchSurveyor = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://jomijog.com/api/admin/surveyors/${id}`);
      setSurveyor(data);
      try {
        const res = await axios.get(`https://jomijog.com/api/users/${id}/booked-dates`);
        setBookedDates(res.data.bookedDates || []);
      } catch {
        setBookedDates([]);
      }
    } catch (error) {
      console.error("Error fetching surveyor:", error);
      toast.error("সার্ভেয়ারের তথ্য লোড করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    // ✅ Block surveyors from booking
    if (isSurveyor) {
      toast.error("সার্ভেয়াররা বুকিং দিতে পারবেন না।");
      return;
    }

    if (!selectedDate) {
      toast.warning("বুকিং দেওয়ার আগে একটি তারিখ বেছে নিন।");
      return;
    }

    if (!loggedUser?._id) {
      toast.info("প্রথমে লগইন করুন।");
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);
      await axios.post("https://jomijog.com/api/bookings", {
        userId:     loggedUser._id,
        surveyorId: surveyor._id,
        price:      surveyor.price,
        status:     "pending",
        date:       selectedDate,
      });

      toast.success("বুকিং অনুরোধ পাঠানো হয়েছে! অ্যাডমিন রিভিউ করবেন।");
      setSelectedDate("");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "বুকিং ব্যর্থ হয়েছে");
    } finally {
      setBookingLoading(false);
    }
  };

  // ─── Loading ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24" />
        <style>{`.loader{border-top-color:#7ED957;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!surveyor) return <p className="text-center py-10">লোড হচ্ছে...</p>;

  const hiddenFields = [
    "email","password","__v","createdAt","updatedAt",
    "_id","mobile","approvals","role","licenseNumber",
    "training","bookedDates","noteEvents","status",
  ];
  const fieldLabels = {
    name: "নাম", age: "বয়স", address: "ঠিকানা",
    companyName: "প্রতিষ্ঠানের নাম", companyAddress: "প্রতিষ্ঠানের ঠিকানা",
    education: "শিক্ষাগত যোগ্যতা", experience: "অভিজ্ঞতা", price: "সেবা মূল্য",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

        {/* ── TOP: Image + Surveyor Info ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left — Profile Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="flex justify-center items-center p-4">
                <img
                  src={surveyor.profileImage ? `https://jomijog.com/uploads/${surveyor.profileImage}` : "/default-surveyor.jpg"}
                  alt={surveyor.name}
                  className="h-auto w-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right — Surveyor Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center text-yellow-400 text-2xl">
              {Array(5).fill().map((_, i) => <FaStar key={i} className="mr-1" />)}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-4">{surveyor.name}</h1>

            <div className="flex items-center text-gray-600 gap-3 mt-6">
              <img src={experienceIcon} alt="অভিজ্ঞতা" className="w-6 h-6" />
              <span className="text-lg">
                {surveyor.experience ? `${surveyor.experience} বছর` : "অভিজ্ঞতা নেই"}
              </span>
            </div>

            <div className="flex items-center text-gray-600 gap-3 mt-3">
              <img src={priceIcon} alt="মূল্য" className="w-6 h-6" />
              <span className="text-lg font-medium">
                {surveyor.price ? `${surveyor.price} টাকা` : "নির্ধারিত নেই"}
              </span>
            </div>

            <div className="mt-8 space-y-3">
              {Object.entries(surveyor)
                .filter(([key]) => !hiddenFields.includes(key))
                .map(([key, value]) =>
                  key !== "profileImage" && key !== "name" &&
                  key !== "experience"   && key !== "price" ? (
                    <div key={key} className="flex justify-between border-b pb-2 text-gray-700">
                      <span className="font-semibold text-gray-600">{fieldLabels[key] || key}</span>
                      <span>{value || "নাই"}</span>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Calendar + Booking ── */}
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            📅 অ্যাপয়েন্টমেন্টের তারিখ বেছে নিন
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            সবুজ = পাওয়া যাচ্ছে &nbsp;|&nbsp; লাল = বুকড &nbsp;|&nbsp; হলুদ = নির্বাচিত &nbsp;|&nbsp; ধূসর = অতীত
          </p>

          {/* Calendar */}
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <BookingCalendar
              bookedDates={bookedDates}
              selectedDate={selectedDate}
              onSelect={isSurveyor ? undefined : setSelectedDate}
            />
          </div>

          {/* Selected date confirmation */}
          {selectedDate && !isSurveyor && (
            <div style={{ maxWidth:480, margin:"16px auto 0", padding:"12px 16px", background:"#e8f8de", borderRadius:12, color:"#5cb83a", fontSize:14, textAlign:"center", border:"1px solid #7ED957", fontWeight:600 }}>
              ✓ নির্বাচিত তারিখ:{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("bn-BD", {
                weekday:"long", year:"numeric", month:"long", day:"numeric",
              })}
            </div>
          )}

          {/* ✅ Show warning for surveyors, book button for users */}
          <div style={{ maxWidth: 480, margin: "20px auto 0" }}>
            {isSurveyor ? (
              <div style={{ padding:"16px", background:"#fef2f2", borderRadius:12, color:"#ef4444", fontSize:15, textAlign:"center", border:"2px solid #fca5a5", fontWeight:700 }}>
                ⚠️ সার্ভেয়াররা বুকিং দিতে পারবেন না
              </div>
            ) : (
              <>
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-[#7ED957] hover:bg-[#6cc14c] text-white py-3 px-6 rounded-lg font-semibold text-lg transition duration-300 shadow-md flex justify-center items-center gap-2"
                >
                  {bookingLoading && (
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 w-5 h-5" />
                  )}
                  {bookingLoading ? "প্রক্রিয়া হচ্ছে..." : "বুক দিন"}
                  <style>{`.loader{border-top-color:#fff;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
                </button>
                {!selectedDate && (
                  <p className="text-center text-sm text-gray-400 mt-3">
                    উপরের ক্যালেন্ডার থেকে তারিখ বেছে নিন
                  </p>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SurveyorsDetails;