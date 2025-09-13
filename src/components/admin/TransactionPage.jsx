import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Demo Transaction Data
const demoTransactions = [
  {
    id: 1,
    clientName: "রহিম উদ্দিন",
    surveyorName: "করিম মিয়া",
    date: "2025-01-12",
    amount: "5000 টাকা",
  },
  {
    id: 2,
    clientName: "সোহেল আহমেদ",
    surveyorName: "জাহিদ হাসান",
    date: "2025-01-18",
    amount: "3500 টাকা",
  },
  {
    id: 3,
    clientName: "শাহিনুর রহমান",
    surveyorName: "আরিফুল ইসলাম",
    date: "2025-01-20",
    amount: "7000 টাকা",
  },
  {
    id: 4,
    clientName: "ইমরান হোসেন",
    surveyorName: "আলমগীর কবির",
    date: "2025-01-22",
    amount: "4500 টাকা",
  },
  {
    id: 5,
    clientName: "মোস্তাফিজুর রহমান",
    surveyorName: "হাসান মাহমুদ",
    date: "2025-01-25",
    amount: "6000 টাকা",
  },
  {
    id: 6,
    clientName: "রহিম উদ্দিন",
    surveyorName: "করিম মিয়া",
    date: "2025-01-28",
    amount: "8000 টাকা",
  },
  {
    id: 7,
    clientName: "সোহেল আহমেদ",
    surveyorName: "জাহিদ হাসান",
    date: "2025-02-02",
    amount: "3000 টাকা",
  },
  {
    id: 8,
    clientName: "শাহিনুর রহমান",
    surveyorName: "আরিফুল ইসলাম",
    date: "2025-02-05",
    amount: "9000 টাকা",
  },
  {
    id: 9,
    clientName: "ইমরান হোসেন",
    surveyorName: "আলমগীর কবির",
    date: "2025-02-08",
    amount: "10000 টাকা",
  },
];

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // API call
  useEffect(() => {
    setTimeout(() => {
      setTransactions(demoTransactions);
    }, 500);
  }, []);

  const visibleTransactions = showAll ? transactions : transactions.slice(0, 6);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Navigation buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap bg-[#69DB7C] rounded-2xl px-6 sm:px-12 lg:px-20 py-3 gap-3">
          <Link
            to="/users"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full bg-white font-semibold"
          >
            Users
          </Link>
          
          <Link
            to="/admin-surveyors"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Surveyor List
          </Link><Link
            to="/add-surveyor"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Add More Surveyors
          </Link>
          <Link
            to="/transactions"
            className="px-4 py-2 text-base sm:text-lg lg:text-2xl rounded-full hover:bg-white transition"
          >
            Transactions
          </Link>
        </div>
      </div>

      {/* Total Transactions */}
      <div className="flex justify-center mb-6">
        <div className="px-4 sm:px-6 py-2 bg-green-100 rounded text-sm sm:text-base lg:text-lg font-medium">
          Total Transactions : {transactions.length}
        </div>
      </div>

      {/* Transaction Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {visibleTransactions.map((txn) => (
          <div
            key={txn.id}
            className="border border-green-400 rounded-lg shadow hover:shadow-lg transition duration-300 p-4 text-sm sm:text-base"
          >
            <p>
              <b>গ্রাহকের নাম:</b> {txn.clientName}
            </p>
            <p>
              <b>সার্ভেয়রের নাম:</b> {txn.surveyorName}
            </p>
            <p>
              <b>তারিখ:</b> {txn.date}
            </p>
            <p>
              <b>লেনদেন:</b> {txn.amount}
            </p>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center">
        {transactions.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-green-200 hover:bg-green-300 rounded text-sm sm:text-base lg:text-lg transition duration-200"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
