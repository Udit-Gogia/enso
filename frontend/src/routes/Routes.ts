export type Screens =
  | "LANDING"
  | "REGISTER"
  | "LOGIN"
  | "DASHBOARD"
  | "PROFILE_SETUP"
  | "ANALYTICS"
  | "MY_PROFILE"
  | "PERSONA_PROFILE_SETUP";

const ROUTES: Record<Screens, string> = {
  LANDING: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",
  PROFILE_SETUP: "/profile-setup",
  ANALYTICS: "/analytics",
  MY_PROFILE: "/my-profile",
  PERSONA_PROFILE_SETUP: "/profile-setup/:persona",
};

export default ROUTES;
