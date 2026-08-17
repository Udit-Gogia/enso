import { Button } from "@/components/ui/button";
import {
  Check,
  CheckCheck,
  CheckCircle,
  CheckIcon,
  Pencil,
  X,
} from "lucide-react";

export function SectionCard({
  icon,
  iconBg,
  title,
  className,
  editable,
  displayEditActionButton,
  children,
  desc,
  onEditClick,
  onCancelEdit,
  onSaveEdit,
}: {
  icon?: React.ReactNode;
  iconBg?: string;
  title: string;
  className?: string;
  editable?: boolean;
  displayEditActionButton?: boolean;
  desc?: string;
  onEditClick?: () => void;
  onCancelEdit?: () => void;
  onSaveEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 border border-surface-page shadow-md ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
            >
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-ink-900">{title}</h3>
            <p className="text-sm text-ink-muted">{desc}</p>
          </div>
        </div>
        <section>
          {displayEditActionButton ? (
            <div className="flex gap-1">
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={onCancelEdit}
                className={`rounded-lg flex items-center justify-center text-destructive hover:bg-rose-100/50 active:scale-[0.97] transition-all `}
              >
                <X size={14} />
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={onSaveEdit}
                className={`rounded-lg flex items-center justify-center text-success hover:bg-success/10 active:scale-[0.97] transition-all `}
              >
                <Check size={16} className="font-bold" />
              </Button>
            </div>
          ) : (
            editable && (
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={onEditClick}
                className={`rounded-lg flex items-center justify-center text-ink hover:bg-ink-muted/5 active:scale-[0.97] transition-all `}
              >
                <Pencil size={14} />
              </Button>
            )
          )}
        </section>
      </div>
      {children}
    </div>
  );
}
