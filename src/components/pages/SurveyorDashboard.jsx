import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const COLORS = {
  primary: "#7ED957",
  primaryDark: "#5cb83a",
  primaryLight: "#e8f8de",
  bg: "#F5F3ED",
  dark: "#1a1a2e",
  text: "#2d2d2d",
  muted: "#888",
  white: "#ffffff",
};

// ─── Helpers ───────────────────────────────────────────────
const today = new Date();
today.setHours(0, 0, 0, 0);

const toKey = (date) => date.toISOString().split("T")[0]; // "YYYY-MM-DD"

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ─── Mini Calendar ──────────────────────────────────────────
const Calendar = ({ bookedDates, onToggle, readOnly = false, onSelect }) => {
  const [cur, setCur] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const prev = () => {
    setCur((c) => {
      if (c.month === 0) return { year: c.year - 1, month: 11 };
      return { year: c.year, month: c.month - 1 };
    });
  };

  const next = () => {
    setCur((c) => {
      if (c.month === 11) return { year: c.year + 1, month: 0 };
      return { year: c.year, month: c.month + 1 };
    });
  };

  const daysInMonth = getDaysInMonth(cur.year, cur.month);
  const firstDay = getFirstDay(cur.year, cur.month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={styles.calendarWrap}>
      {/* Header */}
      <div style={styles.calHeader}>
        <button style={styles.navBtn} onClick={prev}>‹</button>
        <span style={styles.monthLabel}>{MONTHS[cur.month]} {cur.year}</span>
        <button style={styles.navBtn} onClick={next}>›</button>
      </div>

      {/* Day names */}
      <div style={styles.dayGrid}>
        {DAYS.map((d) => (
          <div key={d} style={styles.dayName}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={styles.dayGrid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;

          const date = new Date(cur.year, cur.month, day);
          date.setHours(0, 0, 0, 0);
          const key = toKey(date);
          const isPast = date < today;
          const isBooked = bookedDates.includes(key);
          const isToday = key === toKey(today);

          let cellStyle = { ...styles.dayCell };
          if (isPast) cellStyle = { ...cellStyle, ...styles.pastCell };
          else if (isBooked) cellStyle = { ...cellStyle, ...styles.bookedCell };
          else if (isToday) cellStyle = { ...cellStyle, ...styles.todayCell };
          else cellStyle = { ...cellStyle, ...styles.availCell };

          const handleClick = () => {
            if (isPast) return;
            if (readOnly) {
              if (!isBooked && onSelect) onSelect(key);
            } else {
              onToggle(key);
            }
          };

          return (
            <div
              key={key}
              style={cellStyle}
              onClick={handleClick}
              title={
                isPast ? "Past date"
                : isBooked ? (readOnly ? "Already booked" : "Click to unmark")
                : readOnly ? "Click to select"
                : "Click to mark as booked"
              }
            >
              {day}
              {isBooked && !readOnly && (
                <span style={styles.dot} />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        {!readOnly && (
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: COLORS.primary }} /> Available
          </span>
        )}
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: "#ef4444" }} /> Booked
        </span>
        {readOnly && (
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: COLORS.primary }} /> Free
          </span>
        )}
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, background: "#d1d5db" }} /> Past
        </span>
      </div>
    </div>
  );
};

// ─── Main Surveyor Dashboard ────────────────────────────────
const SurveyorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [activeTab, setActiveTab] = useState("calendar");

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    if (!user?._id || user.role !== "surveyor") return;
    fetchBookings();
    fetchBookedDates();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/bookings/surveyor/${user._id}`
      );
      setBookings(data.filter((b) => b.status === "approved"));
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchBookedDates = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${user._id}/booked-dates`
      );
      setBookedDates(data.bookedDates || []);
    } catch (err) {
      // If endpoint not yet made, start empty
      setBookedDates([]);
    }
  };

  const toggleDate = (key) => {
    setBookedDates((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  const saveBookedDates = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}/booked-dates`,
        { bookedDates },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSaveMsg("✓ Availability saved successfully!");
    } catch (err) {
      setSaveMsg("✗ Failed to save. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Surveyor Dashboard</h1>
            <p style={styles.subtitle}>Welcome back, <strong>{user.name}</strong></p>
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <span style={styles.statNum}>{bookings.length}</span>
              <span style={styles.statLabel}>Approved Bookings</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNum}>{bookedDates.length}</span>
              <span style={styles.statLabel}>Blocked Dates</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {["calendar", "bookings"].map((tab) => (
            <button
              key={tab}
              style={activeTab === tab ? { ...styles.tab, ...styles.activeTab } : styles.tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "calendar" ? "📅 Availability Calendar" : "📋 My Bookings"}
            </button>
          ))}
        </div>

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <div style={styles.calSection}>
            <div style={styles.calCard}>
              <h2 style={styles.sectionTitle}>Mark Your Booked Dates</h2>
              <p style={styles.hint}>
                Click on dates to mark them as <strong>booked</strong>. Users won't be able to select these dates when booking you.
              </p>
              <Calendar bookedDates={bookedDates} onToggle={toggleDate} />
              <button
                style={saving ? { ...styles.saveBtn, opacity: 0.7 } : styles.saveBtn}
                onClick={saveBookedDates}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Availability"}
              </button>
              {saveMsg && (
                <p style={{
                  marginTop: 12,
                  color: saveMsg.startsWith("✓") ? COLORS.primaryDark : "#ef4444",
                  fontWeight: 600,
                  textAlign: "center",
                }}>
                  {saveMsg}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <div style={styles.empty}>
                <span style={{ fontSize: 48 }}>📭</span>
                <p>No approved bookings yet.</p>
              </div>
            ) : (
              <div style={styles.bookingGrid}>
                {bookings.map((booking, index) => (
                  <div key={booking._id} style={styles.bookingCard}>
                    <div style={styles.bookingHeader}>
                      <span style={styles.bookingNum}>Booking #{index + 1}</span>
                      <span style={styles.approvedBadge}>✓ Approved</span>
                    </div>
                    <div style={styles.bookingBody}>
                      <div style={styles.infoGroup}>
                        <p style={styles.infoLabel}>👤 Client Name</p>
                        <p style={styles.infoValue}>{booking.userId?.name || "N/A"}</p>
                      </div>
                      <div style={styles.infoGroup}>
                        <p style={styles.infoLabel}>📱 Mobile</p>
                        <p style={styles.infoValue}>{booking.userId?.mobile || "N/A"}</p>
                      </div>
                      <div style={styles.infoGroup}>
                        <p style={styles.infoLabel}>📍 Address</p>
                        <p style={styles.infoValue}>{booking.userId?.address || "N/A"}</p>
                      </div>
                      <div style={styles.infoGroup}>
                        <p style={styles.infoLabel}>💰 Price</p>
                        <p style={styles.infoValue}>{booking.price} টাকা</p>
                      </div>
                      <div style={styles.infoGroup}>
                        <p style={styles.infoLabel}>🏦 Account</p>
                        <p style={styles.infoValue}>{booking.accountNumber || "N/A"}</p>
                      </div>
                      {booking.date && (
                        <div style={styles.infoGroup}>
                          <p style={styles.infoLabel}>📅 Date</p>
                          <p style={styles.infoValue}>
                            {new Date(booking.date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Styles ─────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", background: COLORS.bg, fontFamily: "'Segoe UI', sans-serif" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "32px 20px" },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    marginBottom: 32, flexWrap: "wrap", gap: 16,
  },
  title: { fontSize: 32, fontWeight: 800, color: COLORS.dark, margin: 0 },
  subtitle: { color: COLORS.muted, marginTop: 4, fontSize: 15 },

  statsRow: { display: "flex", gap: 16 },
  statCard: {
    background: COLORS.white, borderRadius: 16, padding: "16px 24px",
    display: "flex", flexDirection: "column", alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)", minWidth: 120,
    border: `2px solid ${COLORS.primaryLight}`,
  },
  statNum: { fontSize: 28, fontWeight: 800, color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.muted, marginTop: 2, textAlign: "center" },

  tabs: { display: "flex", gap: 8, marginBottom: 24 },
  tab: {
    padding: "10px 24px", borderRadius: 12, border: "2px solid #e5e7eb",
    background: COLORS.white, cursor: "pointer", fontWeight: 600,
    fontSize: 14, color: COLORS.muted, transition: "all 0.2s",
  },
  activeTab: {
    background: COLORS.primary, color: COLORS.white,
    border: `2px solid ${COLORS.primary}`,
  },

  calSection: { display: "flex", justifyContent: "center" },
  calCard: {
    background: COLORS.white, borderRadius: 24, padding: 36,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: 480, width: "100%",
  },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: COLORS.dark, marginBottom: 8, marginTop: 0 },
  hint: { color: COLORS.muted, fontSize: 14, marginBottom: 24, lineHeight: 1.6 },

  calendarWrap: { width: "100%" },
  calHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 16,
  },
  navBtn: {
    background: COLORS.primaryLight, border: "none", borderRadius: 8,
    width: 36, height: 36, cursor: "pointer", fontSize: 20,
    color: COLORS.primaryDark, fontWeight: 700, display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  monthLabel: { fontWeight: 700, fontSize: 17, color: COLORS.dark },

  dayGrid: {
    display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4,
  },
  dayName: {
    textAlign: "center", fontSize: 11, fontWeight: 700,
    color: COLORS.muted, padding: "4px 0", textTransform: "uppercase",
  },
  dayCell: {
    textAlign: "center", borderRadius: 10, padding: "8px 0",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "all 0.15s", position: "relative",
    userSelect: "none",
  },
  pastCell: {
    color: "#d1d5db", cursor: "not-allowed", background: "transparent",
  },
  bookedCell: {
    background: "#fef2f2", color: "#ef4444",
    border: "2px solid #fca5a5",
  },
  todayCell: {
    background: COLORS.primaryLight, color: COLORS.primaryDark,
    border: `2px solid ${COLORS.primary}`, fontWeight: 800,
  },
  availCell: {
    background: "transparent", color: COLORS.dark,
    border: "2px solid transparent",
  },
  dot: {
    position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
    width: 4, height: 4, borderRadius: "50%", background: "#ef4444",
  },

  legend: { display: "flex", gap: 16, marginTop: 16, justifyContent: "center", flexWrap: "wrap" },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.muted },
  legendDot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },

  saveBtn: {
    width: "100%", marginTop: 24, padding: "14px 0",
    background: COLORS.primary, color: COLORS.white,
    border: "none", borderRadius: 12, fontWeight: 700,
    fontSize: 16, cursor: "pointer", transition: "background 0.2s",
  },

  empty: {
    textAlign: "center", padding: 60, color: COLORS.muted,
    fontSize: 18, display: "flex", flexDirection: "column",
    alignItems: "center", gap: 12,
  },

  bookingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 },
  bookingCard: {
    background: COLORS.white, borderRadius: 20,
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    border: `1px solid ${COLORS.primaryLight}`, overflow: "hidden",
  },
  bookingHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 20px", background: COLORS.primaryLight,
    borderBottom: `2px solid ${COLORS.primary}`,
  },
  bookingNum: { fontWeight: 700, color: COLORS.dark, fontSize: 16 },
  approvedBadge: {
    background: COLORS.primary, color: COLORS.white,
    borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700,
  },
  bookingBody: { padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  infoGroup: {},
  infoLabel: { fontSize: 11, color: COLORS.muted, fontWeight: 600, margin: "0 0 2px", textTransform: "uppercase" },
  infoValue: { fontSize: 14, color: COLORS.dark, fontWeight: 600, margin: 0 },
};

export default SurveyorDashboard;