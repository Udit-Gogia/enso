import { cn } from "@/lib/utils";
import ensoLogo from "../../assets/logo/Enso.svg";
import { useNavigate } from "react-router-dom";

type RedirectTo = "home" | "dashboard";

export default function EnsoTitle({
  className,
  redirectTo,
}: {
  className?: string;
  redirectTo?: RedirectTo;
}) {
  const navigate = useNavigate();

  const paths: Record<RedirectTo, string> = {
    home: "/",
    dashboard: "/dashboard",
  } as const;

  return (
    <div
      className={cn(
        `pointer-events-auto flex items-center gap-2 text-2xl font-bold tracking-tight text-ink ${redirectTo ? "hover:cursor-pointer" : ""}`,
        className,
      )}
      onClick={() => {
        if (redirectTo) navigate(paths[redirectTo]);
      }}
    >
      <img src={ensoLogo} alt="Enso Logo" className="h-7 w-7" />
      <span>Enso</span>
    </div>
  );
}
