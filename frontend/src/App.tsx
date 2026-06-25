import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { AnimatePresence } from "framer-motion";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
