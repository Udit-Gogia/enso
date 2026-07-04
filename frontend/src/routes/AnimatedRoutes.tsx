import LandingPage from "@/pages/LandingPage";
import { Login } from "@/pages/Login";
import ProfileSetup from "@/pages/ProfileSetup";
import ProfileSetupForm from "@/pages/ProfileSetupForm";
import { Register } from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public — redirect to dashboard if already logged in */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute require="guest">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute require="guest">
              <Register />
            </ProtectedRoute>
          }
        />

        {/* Setup — requires setupToken or redirects */}
        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute require="setup">
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-setup/:persona"
          element={
            <ProtectedRoute require="setup">
              <ProfileSetupForm />
            </ProtectedRoute>
          }
        />

        {/* Protected — requires accessToken */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute require="auth">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
