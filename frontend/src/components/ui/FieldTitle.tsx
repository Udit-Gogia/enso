import { cn } from "@/lib/utils";
import { FieldLabel } from "./field";

const FieldTitle = ({
  label,
  htmlFor,
  isRequired,
  className,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  isRequired?: boolean;
}) => {
  return (
    <FieldLabel
      className={cn("text-sm font-medium flex gap-1 items-center", className)}
      htmlFor={htmlFor}
    >
      {label}
      {isRequired && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};

export default FieldTitle;
