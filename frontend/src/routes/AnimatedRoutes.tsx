import LandingPage from "@/pages/LandingPage";
import { Login } from "@/pages/Login";
import ProfileSetup from "@/pages/ProfileSetup";
import ProfileSetupForm from "@/pages/ProfileSetupForm";
import { Register } from "@/pages/Register";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile-setup/:persona" element={<ProfileSetupForm />} />
      </Routes>
    </AnimatePresence>
  );
}
