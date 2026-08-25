import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { hasAccessToken } from "@/lib/auth";
import { clearAllTokens, getAccessToken } from "@/lib/token";
import api from "@/lib/axios";

interface AuthContextValue {
  isValid: boolean;
  isValidating: boolean;
  revalidate: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  async function validateToken() {
    setIsValidating(true);
    const tokenExists = hasAccessToken();

    if (!tokenExists) {
      setIsValid(false);
      setIsValidating(false);
      return;
    }

    try {
      const token = getAccessToken();
      await api.get("/api/auth/isTokenValid", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsValid(true);
    } catch (error) {
      console.error("Token validation failed:", error);
      clearAllTokens();
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isValid, isValidating, revalidate: validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
