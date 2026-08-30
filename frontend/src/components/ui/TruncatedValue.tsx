import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TruncatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () =>
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p ref={ref} className="text-xs font-bold text-ink mt-0.5 truncate">
          {value}
        </p>
      </TooltipTrigger>
      {isOverflowing && (
        <TooltipContent className="bg-surface">{value}</TooltipContent>
      )}
    </Tooltip>
  );
}
