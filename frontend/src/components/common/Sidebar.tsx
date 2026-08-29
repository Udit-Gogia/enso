import EnsoTitle from "./EnsoTitle";

import SidebarOption from "./SidebarOption";
import {
  DASHBOARD_FIELD,
  DASHBOARD_FIELDS,
} from "@/constants/sidebarConstants";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LogOutIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { logout } from "@/lib/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import { Persona } from "@/features/auth/constants/types";
import ROUTES from "@/routes/Routes";

const ENSO_EASE = [0.16, 1, 0.3, 1] as const;

export default function Sidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role } = useAuthContext();
  const location = useLocation();

  const onHoverChange = (option: string | null) => {
    setHovered(option);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={` relative flex h-full shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? "w-[76px]" : "w-[280px]"}`}
    >
      {/* HEADER */}
      <div className="relative h-20 shrink-0">
        {/* Enso Logo */}
        <motion.div
          initial={false}
          animate={{
            opacity: isCollapsed ? 0 : 1,
            filter: isCollapsed ? "blur(6px)" : "blur(0px)",
            x: isCollapsed ? -6 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: ENSO_EASE,
          }}
          className={`absolute left-5 mt-5 -translate-y-1/2 whitespace-nowrap ${isCollapsed ? "pointer-events-none" : "pointer-events-auto"}`}
        >
          <EnsoTitle />
        </motion.div>

        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`group absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg px-0 py-0 text-ink-muted hover:bg-surface-page hover:text-ink-secondary active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0
            ${isCollapsed ? "left-1/2 -translate-x-1/2" : "right-4"}`}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: isCollapsed ? 180 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: ENSO_EASE,
            }}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" />
            ) : (
              <PanelLeftClose className="h-[18px] w-[18px]" />
            )}
          </motion.div>
        </Button>
      </div>

      {/* NAVIGATION */}
      <nav
        className={`
          flex
          flex-1
          flex-col
          gap-1
          ${isCollapsed ? "px-2" : "px-3"}
        `}
      >
        {role &&
          (DASHBOARD_FIELDS[role.toLowerCase() as Persona] ?? []).map(
            (field: DASHBOARD_FIELD) => (
              <SidebarOption
                key={field.id}
                field={field}
                hovered={hovered}
                onHoverChange={onHoverChange}
                isSelected={location.pathname === ROUTES[field.redirectPath]}
                collapsed={isCollapsed}
              />
            ),
          )}
      </nav>

      {/* LOGOUT */}
      <div
        className={`
          shrink-0
          pb-3
          ${isCollapsed ? "px-2" : "px-3"}
        `}
      >
        <Button
          variant="ghost"
          onClick={logout}
          aria-label="Logout"
          title={isCollapsed ? "Logout" : undefined}
          className={` group relative h-11 w-full px-0 py-0 font-normal text-ink-body hover:bg-surface-page hover:text-ink active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          {/* Icon */}
          <motion.div
            initial={false}
            animate={{
              x: 0,
            }}
            className={`
              flex
              shrink-0
              items-center
              justify-center
              ${isCollapsed ? "" : "ml-3"}
            `}
          >
            <LogOutIcon
              className="
                h-[19px]
                w-[19px]
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </motion.div>

          {/* Label */}
          <motion.span
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -6 : 0,
              filter: isCollapsed ? "blur(6px)" : "blur(0px)",
            }}
            transition={{
              duration: 0.45,
              ease: ENSO_EASE,
            }}
            className={`
              absolute
              left-12
              whitespace-nowrap
              text-sm
              font-medium
              ${isCollapsed ? "pointer-events-none" : "pointer-events-auto"}
            `}
          >
            Logout
          </motion.span>
        </Button>
      </div>
    </aside>
  );
}
