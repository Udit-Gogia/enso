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
    <FieldLabel className="text-sm font-medium " htmlFor={htmlFor}>
      {label}
      {isRequired && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};

export default FieldTitle;
