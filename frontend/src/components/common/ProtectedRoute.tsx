import { Navigate } from "react-router-dom";
import { isLoggedIn, hasSetupToken } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  require: "auth" | "setup" | "guest";
}

export function ProtectedRoute({ children, require }: ProtectedRouteProps) {
  const loggedIn = isLoggedIn();
  const setupPending = hasSetupToken();

  if (require === "auth" && !loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (require === "setup" && !setupPending && !loggedIn) {
    return <Navigate to="/register" replace />;
  }

  if (require === "setup" && loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  if (require === "guest" && loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
