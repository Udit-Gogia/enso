import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { UserProfile } from "../constants/types";
import { logout } from "@/lib/auth";

export default function useGetProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    status_code: Number;
    error_msg: String;
  } | null>(null);

  useEffect(() => {
    api
      .get<UserProfile>("/api/profile/me")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        setError({
          status_code: err.response.status,
          error_msg: "Failed to load profile",
        });
        if (err.response.status === 403) logout();
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    profile,
    loading,
    error,
  };
}
