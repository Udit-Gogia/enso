export type Screens =
  | "LANDING"
  | "REGISTER"
  | "LOGIN"
  | "DASHBOARD"
  | "PROFILE_SETUP"
  | "ANALYTICS"
  | "MY_PROFILE"
  | "VENDOR_SEARCH"
  | "PERSONA_PROFILE_SETUP";

const ROUTES: Record<Screens, string> = {
  LANDING: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",
  PROFILE_SETUP: "/profile-setup",
  ANALYTICS: "/analytics",
  MY_PROFILE: "/my-profile",
  VENDOR_SEARCH: "/vendors",
  PERSONA_PROFILE_SETUP: "/profile-setup/:persona",
};

export default ROUTES;
