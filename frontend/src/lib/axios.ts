import axios from "axios";
import { getAccessToken } from "./token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request automatically — except auth endpoints,
// which either don't need a token yet (login/register) or are explicitly
// about validating one already (isTokenValid handles its own header).
api.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url?.startsWith("/api/auth/");
  if (!isAuthEndpoint) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
