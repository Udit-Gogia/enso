import LandingPage from "@/pages/LandingPage";
import { Login } from "@/pages/Login";
import ProfileSetup from "@/pages/ProfileSetup";
import ProfileSetupForm from "@/pages/ProfileSetupForm";
import { Register } from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./Routes";
import Analytics from "@/pages/Analytics";
import Myprofile from "@/pages/Myprofile";
import PageLayout from "@/components/common/pageLayout";
import PublicLayout from "@/components/common/publicLayout";

export default function AnimatedRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
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
      </Route>

      <Route element={<PageLayout />}>
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute require="auth">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <ProtectedRoute require="auth">
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MY_PROFILE}
          element={
            <ProtectedRoute require="auth">
              <Myprofile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
