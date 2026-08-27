import { Persona } from "@/features/auth/constants/types";
import { Screens } from "@/routes/Routes";
import {
  CalendarPlus,
  LayoutGrid,
  LucideProps,
  PieChart,
  Search,
  User,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type DASHBOARD_FIELD = {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  redirectPath: Screens;
};

export const DASHBOARD_FIELDS: Record<Persona, DASHBOARD_FIELD[]> = {
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      redirectPath: "DASHBOARD",
    },
    {
      id: "vendor-search",
      label: "Find Vendors",
      icon: Search,
      redirectPath: "VENDOR_SEARCH",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      redirectPath: "MY_PROFILE",
    },
    {
      id: "booking-request",
      label: "Request Booking",
      icon: CalendarPlus,
      redirectPath: "BOOKING_REQUEST",
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      redirectPath: "ANALYTICS",
    },
  ],
  customer: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      redirectPath: "DASHBOARD",
    },
    {
      id: "vendor-search",
      label: "Find Vendors",
      icon: Search,
      redirectPath: "VENDOR_SEARCH",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      redirectPath: "MY_PROFILE",
    },
    {
      id: "booking-request",
      label: "Request Booking",
      icon: CalendarPlus,
      redirectPath: "BOOKING_REQUEST",
    },

    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      redirectPath: "ANALYTICS",
    },
  ],
  vendor: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      redirectPath: "DASHBOARD",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      redirectPath: "MY_PROFILE",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: PieChart,
      redirectPath: "ANALYTICS",
    },
  ],
};
