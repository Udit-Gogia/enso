import { BrowserRouter } from "react-router-dom";

import AnimatedRoutes from "./routes/AnimatedRoutes";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster richColors />
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
