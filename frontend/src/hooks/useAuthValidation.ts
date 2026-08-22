import { useEffect, useState } from "react";
import { hasAccessToken } from "@/lib/auth";
import { clearAllTokens, getAccessToken } from "@/lib/token";
import api from "@/lib/axios";

export function useAuthValidation() {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const tokenExists = hasAccessToken();

      if (!tokenExists) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        const token = getAccessToken();

        const response = await api.get("/api/auth/isTokenValid", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response");

        if (!response) {
          clearAllTokens();
          setIsValid(false);
          return;
        }

        setIsValid(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  return { isValidating, isValid };
}
