import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddSurveyor from "./components/admin/AddSurveyor";
import AdminSurveyor from "./components/admin/AdminSurveyor";
import TransactionPage from "./components/admin/TransactionPage";
import UserPage from "./components/admin/User";
import About from "./components/pages/About";
import AddReview from "./components/pages/AddReview";
import Consultant from "./components/pages/Consultant.jsx";
import ContactPage from "./components/pages/ContactPage";
import Footer from "./components/pages/Footer";
import GeneralKnowledge from "./components/pages/GeneralKnowledge";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import Surveyor from "./components/pages/Surveyor";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surveyor" element={<Surveyor />} />
        <Route path="/consultant" element={<Consultant />} />
        <Route path="/about" element={<About />} />
        <Route path="/knowledge" element={<GeneralKnowledge />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/contact-page" element={<ContactPage />} />

        {/* Demo add Admin pages */}
        <Route path="/users" element={<UserPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/admin-surveyors" element={<AdminSurveyor />} />
        <Route path="/add-surveyor" element={<AddSurveyor />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
