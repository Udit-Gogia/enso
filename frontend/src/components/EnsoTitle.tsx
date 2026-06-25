import { cn } from "@/lib/utils";
import ensoLogo from "../assets/logo/Enso.svg";

export default function EnsoTitle({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-2 text-2xl font-bold tracking-tight text-ink",
        className,
      )}
    >
      <img src={ensoLogo} alt="Enso Logo" className="h-9 w-9" />
      <span>Enso</span>
    </div>
  );
}
