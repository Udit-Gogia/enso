import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import FieldTitle from "@/components/ui/FieldTitle";

type AuthFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  autoComplete?: string;
  isPassword?: boolean;
  description?: string;
  hint?: React.ReactNode;
};

export function AuthField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  disabled = false,
  autoComplete,
  isPassword = false,
  description,
  hint,
}: AuthFieldProps<T>) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="flex flex-col gap-2"
        >
          <FieldTitle label={label} htmlFor={String(name)} isRequired />

          {isPassword ? (
            <InputGroup className="border-none">
              <Input
                {...field}
                id={String(name)}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-required
                aria-invalid={fieldState.invalid}
                className="rounded-sm h-11 placeholder:text-muted-foreground/60"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors duration-300 ease-in-out"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </InputGroup>
          ) : (
            <Input
              {...field}
              id={String(name)}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              required
              aria-required
              aria-invalid={fieldState.invalid}
              className="rounded-sm h-11 placeholder:text-muted-foreground/60"
              onChange={(e) => {
                const val =
                  type === "tel"
                    ? e.target.value.replace(/\D/g, "")
                    : e.target.value;
                field.onChange(val);
              }}
            />
          )}

          {description && (
            <FieldDescription className="text-ink-muted">
              {description}
            </FieldDescription>
          )}

          {hint}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
