import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { DASHBOARD_FIELD } from "@/constants/sidebarConstants";
import ROUTES from "@/routes/Routes";

export default function SidebarOption({
  field,
  collapsed,
  onHoverChange,
  hovered,
}: {
  field: DASHBOARD_FIELD;
  collapsed: boolean;
  onHoverChange: (option: string | null) => void;
  hovered: string | null;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const Icon = field.icon;

  const isHovered = hovered === field.id;

  const isSelected = location.pathname === ROUTES[field.redirectPath];

  const handleClick = () => {
    navigate(ROUTES[field.redirectPath]);
  };

  return (
    <motion.div
      key={field.id}
      onMouseEnter={() => onHoverChange(field.id)}
      onMouseLeave={() => onHoverChange(null)}
      onClick={handleClick}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
        mass: 0.5,
      }}
      className="relative cursor-pointer select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* Hover background                                              */}
      {/* ------------------------------------------------------------- */}
      {isHovered && !isSelected && (
        <motion.div
          layoutId="sidebar-hover"
          className="pointer-events-none absolute inset-0 rounded-md bg-surface-page/70"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                  mass: 0.5,
                }
          }
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* Selected background                                            */}
      {/* ------------------------------------------------------------- */}
      {isSelected && (
        <motion.div
          layoutId="sidebar-selected"
          className="pointer-events-none absolute inset-0 rounded-md bg-surface-page"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                  mass: 0.55,
                }
          }
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* Content                                                        */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`relative z-10 flex items-center py-2.5 ${
          collapsed ? "justify-center px-0" : "gap-3 px-4"
        }`}
      >
        {/* Icon */}
        <motion.div
          animate={{
            x: shouldReduceMotion ? 0 : isHovered || isSelected ? 1 : 0,
            scale: shouldReduceMotion ? 1 : isHovered || isSelected ? 1.04 : 1,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 450,
                  damping: 28,
                  mass: 0.45,
                }
          }
          className="shrink-0"
        >
          <Icon
            className={`h-[18px] w-[18px] transition-colors duration-200 ${
              isSelected ? "text-ink-secondary" : "text-ink-muted"
            }`}
            strokeWidth={1.8}
          />
        </motion.div>

        {/* Label */}
        {!collapsed && (
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: -4 }}
            animate={{
              opacity: 1,
              x: shouldReduceMotion ? 0 : isHovered ? 2 : 0,
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.18,
                    ease: "easeOut",
                  }
            }
            className={`whitespace-nowrap text-sm transition-colors duration-200 ${
              isSelected
                ? "font-medium text-ink-secondary"
                : "font-medium text-ink-body"
            }`}
          >
            {field.label}
          </motion.span>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Collapsed tooltip                                               */}
      {/* ------------------------------------------------------------- */}
      {collapsed && isHovered && (
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -4,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.15,
                  delay: 0.2,
                  ease: "easeOut",
                }
          }
          className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-secondary shadow-badge"
        >
          {field.label}
        </motion.div>
      )}
    </motion.div>
  );
}
