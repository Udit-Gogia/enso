import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { hasAccessToken } from "@/lib/auth";
import { clearAllTokens, getAccessToken, getRole } from "@/lib/token";
import api from "@/lib/axios";

interface AuthContextValue {
  isValid: boolean;
  isValidating: boolean;
  role: string | null;
  revalidate: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [role, setRoleState] = useState<string | null>(null);

  async function validateToken() {
    setIsValidating(true);
    const tokenExists = hasAccessToken();

    if (!tokenExists) {
      setIsValid(false);
      setRoleState(null);
      setIsValidating(false);
      return;
    }

    try {
      const token = getAccessToken();
      await api.get("/api/auth/isTokenValid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsValid(true);
      setRoleState(getRole());
    } catch (error) {
      console.error("Token validation failed:", error);
      clearAllTokens();
      setIsValid(false);
      setRoleState(null);
    } finally {
      setIsValidating(false);
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isValid, isValidating, role, revalidate: validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
