import { DASHBOARD_FIELD } from "@/constants/sidebarConstants";
import ROUTES from "@/routes/Routes";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SidebarOption({
  field,
  onHoverChange,
  hovered,
  isSelected,
}: {
  field: DASHBOARD_FIELD;
  onHoverChange: (option: string | null) => void;
  hovered: string | null;
  isSelected: boolean;
}) {
  const navigate = useNavigate();
  const Icon = field.icon;
  return (
    <div
      key={field.id}
      onMouseEnter={() => onHoverChange(field.id)}
      onMouseLeave={() => onHoverChange(null)}
      onClick={() => navigate(ROUTES[field.redirectPath])}
      className="group/sidebar relative px-4 py-1 cursor-pointer"
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-sm bg-primary/20" />
      )}

      {hovered === field.id && (
        <motion.div
          layoutId="sidebar-hover"
          className="pointer-events-none absolute inset-0 rounded-sm bg-neutral-200/50"
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 60,
            mass: 0.6,
          }}
        />
      )}

      <div className="relative flex items-center gap-2 py-2 ">
        <Icon className="h-5 w-5 text-neutral-700" />

        <span className="text-md font-medium text-neutral-700 transition-transform duration-150 group-hover/sidebar:translate-x-1">
          {field.label}
        </span>
      </div>
    </div>
  );
}
