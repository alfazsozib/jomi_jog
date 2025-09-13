import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        // Fetch all approved bookings from backend
        const { data } = await axios.get("http://localhost:5000/api/bookings/admin");
        // Filter only approved bookings
        const approvedBookings = data
          .filter((b) => b.status === "approved")
          .map((b) => ({
            id: b._id,
            clientName: b.user.name,
            surveyorName: b.surveyor.name,
            date: new Date(b.createdAt).toLocaleDateString("en-CA"), // YYYY-MM-DD
            amount: b.price + " টাকা",
          }));
        setTransactions(approvedBookings);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const visibleTransactions = showAll ? transactions : transactions.slice(0, 6);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Navbar />

      {/* Navigation buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap bg-[#69DB7C] rounded-2xl px-6 sm:px-12 lg:px-20 py-3 gap-3">
          <Link to="/users" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full bg-white font-semibold">Users</Link>
          <Link to="/admin-surveyors" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">Surveyor List</Link>
          <Link to="/add-surveyor" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">Add More Surveyors</Link>
          <Link to="/transactions" className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition">Transactions</Link>
          <Link
            to="/admin/permissions"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Booking Requests
          </Link>
        </div>
      </div>

      {/* Total Transactions */}
      <div className="flex justify-center mb-6">
        <div className="px-4 sm:px-6 py-2 bg-green-100 rounded text-sm sm:text-base lg:text-lg font-medium">
          Total Transactions: {transactions.length}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-lg">Loading transactions...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Transaction Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {visibleTransactions.map((txn) => (
            <div
              key={txn.id}
              className="border border-green-400 rounded-lg shadow hover:shadow-lg transition duration-300 p-4 text-sm sm:text-base"
            >
              <p><b>গ্রাহকের নাম:</b> {txn.clientName}</p>
              <p><b>সার্ভেয়রের নাম:</b> {txn.surveyorName}</p>
              <p><b>তারিখ:</b> {txn.date}</p>
              <p><b>লেনদেন:</b> {txn.amount}</p>
            </div>
          ))}
        </div>
      )}

      {/* See More Button */}
      {!loading && transactions.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-green-200 hover:bg-green-300 rounded text-sm sm:text-base lg:text-lg transition duration-200"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
