export type Screens =
  | "LANDING"
  | "REGISTER"
  | "LOGIN"
  | "DASHBOARD"
  | "PROFILE_SETUP"
  | "ANALYTICS"
  | "MY_PROFILE"
  | "BOOKING_REQUEST"
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
  BOOKING_REQUEST: "/request-booking",
  PERSONA_PROFILE_SETUP: "/profile-setup/:persona",
};

export default ROUTES;
