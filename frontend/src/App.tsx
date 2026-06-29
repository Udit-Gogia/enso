import { BrowserRouter } from "react-router-dom";

import AnimatedRoutes from "./routes/AnimatedRoutes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
