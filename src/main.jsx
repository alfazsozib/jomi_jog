import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CartSurveyor from "./components/cart/CartSurveyor.jsx";
import CartConsultant from "./components/cart/CartConsultant.jsx";
import About from "./components/pages/About.jsx";
import ContactPage from "./components/pages/ContactPage.jsx";
import Footer from "./components/pages/Footer.jsx";
import Home from "./components/pages/Home.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignUpPage from "./components/pages/SignupPage.jsx";
import TermsAndConditions from "./components/pages/TermsAndConditions.jsx";

import GeneralKnowledge from "./components/pages/GeneralKnowledge.jsx";
import SurveyorsDetails from "./components/pages/SurveyorsDetails.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
