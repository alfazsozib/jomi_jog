import { useEffect, useState } from "react";
import axios from "axios";

/**
 * SurveyorBookingCalendar
 * Props:
 *   surveyorId  - the surveyor's _id
 *   onDateSelect(dateKey: string) - called when user picks an available date
 */

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

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const today = new Date();
today.setHours(0, 0, 0, 0);
const toKey = (date) => date.toISOString().split("T")[0];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

const SurveyorBookingCalendar = ({ surveyorId, onDateSelect }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cur, setCur] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  useEffect(() => {
    if (!surveyorId) return;
    fetchBookedDates();
  }, [surveyorId]);

  const fetchBookedDates = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://jomijog.com/api/users/${surveyorId}/booked-dates`
      );
      setBookedDates(data.bookedDates || []);
    } catch (err) {
      setBookedDates([]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSelect = (key) => {
    setSelectedDate(key);
    if (onDateSelect) onDateSelect(key);
  };

  const daysInMonth = getDaysInMonth(cur.year, cur.month);
  const firstDay = getFirstDay(cur.year, cur.month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h3 style={styles.title}>📅 Select Appointment Date</h3>
        <p style={styles.subtitle}>
          Red dates are already booked. Pick a green date to proceed.
        </p>

        {loading ? (
          <div style={styles.loading}>Loading availability...</div>
        ) : (
          <>
            {/* Nav */}
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

            {/* Cells */}
            <div style={styles.dayGrid}>
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;

                const date = new Date(cur.year, cur.month, day);
                date.setHours(0, 0, 0, 0);
                const key = toKey(date);
                const isPast = date < today;
                const isBooked = bookedDates.includes(key);
                const isSelected = selectedDate === key;
                const isToday = key === toKey(today);
                const isDisabled = isPast || isBooked;

                let cellStyle = { ...styles.dayCell };

                if (isSelected) {
                  cellStyle = { ...cellStyle, ...styles.selectedCell };
                } else if (isBooked) {
                  cellStyle = { ...cellStyle, ...styles.bookedCell };
                } else if (isPast) {
                  cellStyle = { ...cellStyle, ...styles.pastCell };
                } else if (isToday) {
                  cellStyle = { ...cellStyle, ...styles.todayCell };
                } else {
                  cellStyle = { ...cellStyle, ...styles.availCell };
                }

                return (
                  <div
                    key={key}
                    style={cellStyle}
                    onClick={() => !isDisabled && handleSelect(key)}
                    title={
                      isPast ? "Past date"
                      : isBooked ? "Already booked"
                      : "Available — click to select"
                    }
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={styles.legend}>
              <span style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: COLORS.primary }} /> Available
              </span>
              <span style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: "#ef4444" }} /> Booked
              </span>
              <span style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: "#f59e0b", border: `2px solid ${COLORS.primaryDark}` }} /> Selected
              </span>
              <span style={styles.legendItem}>
                <span style={{ ...styles.legendDot, background: "#d1d5db" }} /> Past
              </span>
            </div>

            {/* Selected date display */}
            {selectedDate && (
              <div style={styles.selectedDisplay}>
                ✓ Selected:{" "}
                <strong>
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-GB", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </strong>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrap: { width: "100%" },
  card: {
    background: COLORS.white, borderRadius: 24, padding: 28,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    border: `1px solid ${COLORS.primaryLight}`,
  },
  title: { fontSize: 18, fontWeight: 700, color: COLORS.dark, margin: "0 0 6px" },
  subtitle: { fontSize: 13, color: COLORS.muted, marginBottom: 20, lineHeight: 1.5 },
  loading: { textAlign: "center", padding: 40, color: COLORS.muted },

  calHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 16,
  },
  navBtn: {
    background: COLORS.primaryLight, border: "none", borderRadius: 8,
    width: 34, height: 34, cursor: "pointer", fontSize: 20,
    color: COLORS.primaryDark, fontWeight: 700,
  },
  monthLabel: { fontWeight: 700, fontSize: 16, color: COLORS.dark },

  dayGrid: {
    display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4,
  },
  dayName: {
    textAlign: "center", fontSize: 10, fontWeight: 700, color: COLORS.muted,
    padding: "4px 0", textTransform: "uppercase",
  },
  dayCell: {
    textAlign: "center", borderRadius: 10, padding: "9px 0",
    fontSize: 13, fontWeight: 600, transition: "all 0.15s",
    userSelect: "none", position: "relative",
  },
  pastCell: { color: "#d1d5db", cursor: "not-allowed" },
  bookedCell: {
    background: "#fef2f2", color: "#ef4444",
    border: "2px solid #fca5a5", cursor: "not-allowed",
  },
  todayCell: {
    background: COLORS.primaryLight, color: COLORS.primaryDark,
    border: `2px solid ${COLORS.primary}`, cursor: "pointer", fontWeight: 800,
  },
  availCell: {
    background: COLORS.primaryLight, color: COLORS.primaryDark,
    border: "2px solid transparent", cursor: "pointer",
  },
  selectedCell: {
    background: "#f59e0b", color: COLORS.white,
    border: `2px solid ${COLORS.primaryDark}`, cursor: "pointer", fontWeight: 800,
  },

  legend: {
    display: "flex", gap: 12, marginTop: 16,
    justifyContent: "center", flexWrap: "wrap",
  },
  legendItem: {
    display: "flex", alignItems: "center", gap: 5,
    fontSize: 11, color: COLORS.muted,
  },
  legendDot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },

  selectedDisplay: {
    marginTop: 16, padding: "12px 16px",
    background: COLORS.primaryLight, borderRadius: 12,
    color: COLORS.primaryDark, fontSize: 14, textAlign: "center",
    border: `1px solid ${COLORS.primary}`,
  },
};

export default SurveyorBookingCalendar;