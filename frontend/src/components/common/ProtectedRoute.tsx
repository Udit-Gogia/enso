import { Navigate } from "react-router-dom";
import { hasSetupToken } from "@/lib/auth";
import { useAuthValidation } from "@/hooks/useAuthValidation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  require: "auth" | "setup" | "guest";
}

export function ProtectedRoute({ children, require }: ProtectedRouteProps) {
  const { isValid: loggedIn, isValidating } = useAuthValidation();

  const setupPending = hasSetupToken();

  if (isValidating) return <></>;

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
