"use client";

import { useDialKit } from "dialkit";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";

const INPUT_TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "password", label: "Password" },
  { value: "email", label: "Email" },
  { value: "number", label: "Number" },
  { value: "tel", label: "Tel" },
  { value: "url", label: "URL" },
  { value: "search", label: "Search" },
];
const inputWrapperClassName = cn();

const inputClassName =
  "w-full bg-transparent outline-none placeholder:text-foreground/40";

type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
  wrapperClassName?: string;
};
type SmoothInputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search";

const SELECTION_API_TYPES = new Set<SmoothInputType>([
  "text",
  "password",
  "search",
  "tel",
  "url",
]);

// Types the browser won't let us read selectionStart on — always render
// these as "text" so the Selection API works, and rebuild their behavior
// in JS instead of relying on the native type.
const RENDER_TYPE_OVERRIDES: Partial<Record<SmoothInputType, "text">> = {
  email: "text",
  number: "text",
};

const EMAIL_SCHEMA = z.string().email();
// zod v4: use z.email() instead — .string().email() is deprecated but still works.

const sanitizeNumberInput = (
  raw: string,
  allowDecimal: boolean,
  allowNegative: boolean,
): string => {
  let value = raw.replace(allowDecimal ? /[^0-9.-]/g : /[^0-9-]/g, "");

  if (allowNegative) {
    const isNegative = value.startsWith("-");
    value = value.replace(/-/g, "");
    if (isNegative) value = "-" + value;
  } else {
    value = value.replace(/-/g, "");
  }

  if (allowDecimal) {
    const firstDot = value.indexOf(".");
    if (firstDot !== -1) {
      value =
        value.slice(0, firstDot + 1) +
        value.slice(firstDot + 1).replace(/\./g, "");
    }
  } else {
    value = value.replace(/\./g, "");
  }

  return value;
};

const getInputMode = (
  semanticType: SmoothInputType,
  allowDecimal: boolean,
): InputFieldProps["inputMode"] => {
  switch (semanticType) {
    case "email":
      return "email";
    case "number":
      return allowDecimal ? "decimal" : "numeric";
    case "tel":
      return "tel";
    case "url":
      return "url";
    case "search":
      return "search";
    default:
      return undefined;
  }
};

type SmoothInputProps = Omit<InputFieldProps, "type"> & {
  type?: SmoothInputType;
  allowDecimal?: boolean;
  allowNegative?: boolean;
  onValidityChange?: (isValid: boolean) => void;
};

const Input = ({ className, wrapperClassName, ...props }: InputFieldProps) => {
  return (
    <div className={cn(inputWrapperClassName, wrapperClassName)}>
      <input className={cn(inputClassName, className)} {...props} />
    </div>
  );
};

const PASSWORD_CHAR = navigator.userAgent.match(/firefox|fxios/i)
  ? "\u25CF"
  : "\u2022";

const SmoothInput = ({
  className,
  wrapperClassName,
  value,
  defaultValue,
  onChange,
  onBlur,
  type,
  placeholder,
  style,
  allowDecimal = true,
  allowNegative = false,
  onValidityChange,
  ...props
}: SmoothInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [touched, setTouched] = useState(false);
  const caretX = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;

  const params = useDialKit(
    "Smooth Input",
    {
      inputType: {
        type: "select",
        options: INPUT_TYPE_OPTIONS,
        default: type ?? "text",
      },
      placeholder: {
        type: "text",
        default: placeholder ?? "smooth input",
        placeholder: "Empty state text…",
      },
      fontSize: [24, 12, 48, 2],
      spring: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      },
      clear: { type: "action", label: "Clear value" },
    },
    {
      onAction: (path) => {
        if (path !== "clear") return;

        if (!isControlled) {
          setInternalValue("");
        }

        onChange?.({
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        caretOpacity.set(0);
      },
    },
  );

  const springCaretX = useSpring(
    caretX,
    prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : params.spring,
  );

  const inputValue = isControlled ? String(value) : internalValue;
  const activeType = (type ?? params.inputType) as SmoothInputType;
  const renderedType = (RENDER_TYPE_OVERRIDES[activeType] ??
    activeType) as SmoothInputType;
  const supportsCustomCaret = SELECTION_API_TYPES.has(renderedType);
  const resolvedInputMode = getInputMode(activeType, allowDecimal);

  const displayPlaceholder =
    params.placeholder || placeholder || "smooth input";

  const isEmailInvalid =
    activeType === "email" &&
    touched &&
    inputValue !== "" &&
    !EMAIL_SCHEMA.safeParse(inputValue).success;

  useEffect(() => {
    if (activeType !== "email") return;
    const valid =
      inputValue === "" || EMAIL_SCHEMA.safeParse(inputValue).success;
    onValidityChange?.(valid);
  }, [activeType, inputValue, onValidityChange]);

  const syncMeasureSpan = () => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return;

    const styles = window.getComputedStyle(input);
    const isPassword = input.type === "password";

    let fontSize = styles.fontSize;
    if (
      PASSWORD_CHAR === "\u2022" &&
      isPassword &&
      !navigator.userAgent.match(/chrome|chromium|crios/i)
    ) {
      fontSize = `${parseFloat(fontSize) + 6.25}px`;
    }

    measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`;
    measureSpan.style.letterSpacing = styles.letterSpacing;
    measureSpan.style.fontFeatureSettings = styles.fontFeatureSettings;
    measureSpan.style.fontVariationSettings = styles.fontVariationSettings;
  };

  const measurePrefixWidth = (text: string) => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return null;

    syncMeasureSpan();
    measureSpan.textContent = text;

    const paddingLeft =
      parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

    return text.length > 0
      ? measureSpan.offsetWidth + paddingLeft
      : paddingLeft - 1;
  };

  const scrollCaretIntoView = (
    target: HTMLInputElement,
    absoluteWidth: number,
  ) => {
    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
    const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
    const visibleLeft = target.scrollLeft + paddingLeft;

    if (absoluteWidth > visibleRight) {
      target.scrollLeft = Math.min(
        absoluteWidth - target.clientWidth + paddingRight,
        maxScroll,
      );
      return;
    }

    if (absoluteWidth < visibleLeft) {
      target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
    }
  };

  const getCaretIndex = (target: HTMLInputElement) => {
    if (!supportsCustomCaret) return 0;
    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;

    if (selectionStart === selectionEnd) {
      return selectionStart;
    }

    return target.selectionDirection === "backward"
      ? selectionStart
      : selectionEnd;
  };

  const updateCaretFromInput = (target: HTMLInputElement) => {
    if (!supportsCustomCaret) return;
    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;
    const hasSelection = selectionStart !== selectionEnd;
    const caretIndex = getCaretIndex(target);
    const isPassword = target.type === "password";
    const textBeforeCaret = isPassword
      ? PASSWORD_CHAR.repeat(caretIndex)
      : target.value.slice(0, caretIndex);

    const absoluteWidth = measurePrefixWidth(textBeforeCaret);
    if (absoluteWidth === null) return;

    scrollCaretIntoView(target, absoluteWidth);

    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const caretPosition = absoluteWidth - target.scrollLeft;
    const minX = paddingLeft - 1;
    const maxX = target.clientWidth - paddingRight;
    const isCaretVisible = caretPosition >= minX && caretPosition <= maxX + 1;

    caretX.set(Math.min(caretPosition, maxX));

    if (!isCaretVisible || hasSelection) {
      caretOpacity.set(0);
      return;
    }

    caretOpacity.set(1);
  };

  const updateCaretRef = useRef(updateCaretFromInput);
  updateCaretRef.current = updateCaretFromInput;
  const caretOpacityRef = useRef(caretOpacity);
  caretOpacityRef.current = caretOpacity;

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretRef.current(input);
    }
  }, [inputValue]);

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretRef.current(input);
    }
  }, [renderedType, params.fontSize]);

  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;
    if (!input || !container) return;

    const updateCaretIfFocused = () => {
      if (document.activeElement === input) {
        updateCaretRef.current(input);
      }
    };

    const handleSelectionChange = () => {
      if (document.activeElement !== input) return;

      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          updateCaretRef.current(input);
        }
      });
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.fonts.addEventListener("loadingdone", updateCaretIfFocused);
    void document.fonts.ready.then(updateCaretIfFocused);
    input.addEventListener("scroll", updateCaretIfFocused);

    const resizeObserver = new ResizeObserver(updateCaretIfFocused);
    resizeObserver.observe(container);

    updateCaretIfFocused();

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.fonts.removeEventListener("loadingdone", updateCaretIfFocused);
      input.removeEventListener("scroll", updateCaretIfFocused);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn(inputWrapperClassName, wrapperClassName)}>
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 p-0"
        style={{
          caretColor: supportsCustomCaret ? "transparent" : "currentColor",
          fontSize: params.fontSize,
        }}
      >
        <input
          inputMode={resolvedInputMode}
          {...props}
          ref={inputRef}
          type={renderedType}
          placeholder={displayPlaceholder}
          aria-invalid={isEmailInvalid || undefined}
          className={cn(
            inputClassName,
            "col-start-1 col-end-2 row-start-1 row-end-2 text-inherit font-semibold",
            className,
          )}
          style={style}
          value={inputValue}
          onChange={(e) => {
            if (activeType === "number") {
              e.target.value = sanitizeNumberInput(
                e.target.value,
                allowDecimal,
                allowNegative,
              );
            }

            const nextValue = e.target.value;
            if (!isControlled) setInternalValue(nextValue);
            onChange?.(e);

            if (supportsCustomCaret) {
              requestAnimationFrame(() => updateCaretRef.current(e.target));
            }
          }}
          onBlur={(e) => {
            caretOpacityRef.current.set(0);
            setTouched(true);
            onBlur?.(e);
          }}
        />
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
        />
        {supportsCustomCaret && (
          <motion.div
            className="bg-primary-deep pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 h-[0.9em] w-0.5 self-center"
            style={{ x: springCaretX, opacity: caretOpacity }}
          />
        )}
      </div>
    </div>
  );
};

export { Input, SmoothInput };
