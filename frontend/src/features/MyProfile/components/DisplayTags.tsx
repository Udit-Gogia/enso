import { toSentenceCase } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// export function DisplayTags({
//   tags,
//   noTagMessage,
// }: {
//   tags: string[];
//   theme?: "vendor" | "customer";
//   noTagMessage?: string;
// }) {
//   return (
//     <div className="flex flex-wrap justify-start gap-1.5">
//       {tags.length > 0 ? (
//         tags.map((tag) => (
//           <span
//             key={tag}
//             className="rounded-full bg-brand-blue/5 px-2.5 py-1 text-xs font-medium text-brand-blue-deep"
//           >
//             {toSentenceCase(tag.replace("_", " "))}
//           </span>
//         ))
//       ) : (
//         <span className="text-danger text-xs font-semibold">
//           {noTagMessage}
//         </span>
//       )}
//     </div>
//   );
// }

const roleColors: Record<"blue" | "green" | "red" | "primary", String> = {
  red: "text-destructive bg-destructive/10",
  blue: "text-brand-blue-deep bg-brand-blue/10",
  green: "text-success bg-success/10",
  primary: "text-primary bg-primary/10",
};

export function DisplayTags({
  tags,
  noTagMessage,
  previewCount,
  theme,
}: {
  tags: string[];
  theme?: "blue" | "green" | "red" | "primary";
  noTagMessage?: string;
  previewCount?: number;
}) {
  const visibleTags = previewCount != null ? tags.slice(0, previewCount) : tags;
  const hiddenTags = previewCount != null ? tags.slice(previewCount) : [];

  return (
    <div className="flex flex-wrap justify-start gap-1.5">
      {tags.length > 0 ? (
        <>
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue-deep ${theme ? roleColors[theme] : ""}`}
            >
              {toSentenceCase(tag.replace("_", " "))}
            </span>
          ))}
          {hiddenTags.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={`rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue-deep cursor-default ${theme ? roleColors[theme] : ""}`}
                >
                  +{hiddenTags.length} more
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-surface text-xs">
                {hiddenTags
                  .map((tag) => toSentenceCase(tag.replace("_", " ")))
                  .join(", ")}
              </TooltipContent>
            </Tooltip>
          )}
        </>
      ) : (
        <span className="text-danger text-xs font-semibold">
          {noTagMessage}
        </span>
      )}
    </div>
  );
}
