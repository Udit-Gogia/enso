import api from "@/lib/axios";
import { setAccessToken, setSetupToken } from "@/lib/token";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useAuth() {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToRegister() {
    navigate("/register");
  }

  async function submitLogin(data: { email: string; password: string }) {
    try {
      const response = await api.post("/api/auth/login", data);

      const { token, role } = response.data;

      if (role === "SETUP_REQUIRED") {
        setSetupToken(token);
        toast.info("Please complete your profile setup.");
        navigate("/profile-setup");
        return;
      }

      setAccessToken(token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message ?? "Unable to login.";
      toast.error(message, { position: "bottom-right" });
    }
  }

  async function submitRegister(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await api.post("/api/auth/register", data);

      setSetupToken(response.data.setupToken);
      navigate("/profile-setup");
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "Something went wrong. Please try again.";
      toast.error(message, {
        position: "bottom-right",
      });
    }
  }

  return { submitLogin, submitRegister, navigateToLogin, navigateToRegister };
}
