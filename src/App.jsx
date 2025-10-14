import { Route, Routes } from "react-router-dom";
import "./App.css";

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
import SurveyorsDetails from "./components/pages/SurveyorsDetails.jsx";
import AdminPermission from "./components/pages/AdminPermission.jsx";
import UserDashboard from "./components/pages/UserDashboard.jsx";
import SurveyorDashboard from "./components/pages/SurveyorDashboard.jsx";
import AllSurveyors from "./components/pages/AllSurveyors.jsx";
import ForgotPassword from "./components/pages/ForgetPassword.jsx";
import ResetPassword from "./components/pages/ResetPassword.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";


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
        <Route path="/allsurveyors" element={<AllSurveyors />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />


        {/* Demo add Admin pages */}
        <Route path="/users" element={<AdminPanel />} />
        <Route path="/surveyors/:id" element={<SurveyorsDetails />} />
<Route path="/dashboard" element={<UserDashboard />} />
<Route path="/surveyor-dashboard" element={<SurveyorDashboard/>} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
