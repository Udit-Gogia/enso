import LandingPage from "@/pages/LandingPage";
import { Login } from "@/pages/Login";
import ProfileSetup from "@/pages/ProfileSetup";
import ProfileSetupForm from "@/pages/ProfileSetupForm";
import { Register } from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import ROUTES from "./Routes";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public — redirect to dashboard if already logged in */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute require="guest">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <ProtectedRoute require="guest">
              <Register />
            </ProtectedRoute>
          }
        />

        {/* Setup — requires setupToken or redirects */}
        <Route
          path={ROUTES.PROFILE_SETUP}
          element={
            <ProtectedRoute require="setup">
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PERSONA_PROFILE_SETUP}
          element={
            <ProtectedRoute require="setup">
              <ProfileSetupForm />
            </ProtectedRoute>
          }
        />

        {/* Protected — requires accessToken */}
        <Route
          path={ROUTES.DASHBOARD}
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
