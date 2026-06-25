import { FieldLabel } from "./field";

const FieldTitle = ({
  label,
  htmlFor,
  isRequired,
}: {
  label: string;
  htmlFor: string;
  isRequired?: boolean;
}) => {
  return (
    <FieldLabel
      className="text-sm font-medium flex gap-1 items-center"
      htmlFor={htmlFor}
    >
      {label}
      {isRequired && <span className="text-destructive opacity-70">*</span>}
    </FieldLabel>
  );
};

export default FieldTitle;
