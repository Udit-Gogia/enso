import * as React from "react";

import { cn } from "@/lib/utils";
import { SmoothInput } from "./SmoothInput";
import type { LucideIcon } from "lucide-react";
import { DatePicker } from "./DateInput";
import { TimePicker } from "./TimePicker";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    icon?: LucideIcon;
  }
>(({ className, type, icon, ...props }, ref) => {
  if (
    type === "text" ||
    type === "password" ||
    type === "email" ||
    type === "number"
  ) {
    return (
      <SmoothInput
        type={type as "text" | "password" | "email"}
        wrapperClassName="w-full"
        icon={icon}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

          className,
        )}
        {...props}
      />
    );
  }

  if (type === "date") {
    return (
      <DatePicker
        value={props.value as string | undefined}
        onChange={(newValue) => {
          props.onChange?.({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        minDate={props.min as string | undefined}
        maxDate={props.max as string | undefined}
        className={className}
      />
    );
  }

  if (type === "time") {
    return (
      <TimePicker
        value={props.value as string | undefined}
        onChange={(newValue) => {
          props.onChange?.({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        minTime={props.min as string | undefined}
        className={className}
      />
    );
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
