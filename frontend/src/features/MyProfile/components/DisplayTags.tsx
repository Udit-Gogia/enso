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

export function DisplayTags({
  tags,
  noTagMessage,
  previewCount,
}: {
  tags: string[];
  theme?: "vendor" | "customer";
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
              className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue-deep"
            >
              {toSentenceCase(tag.replace("_", " "))}
            </span>
          ))}
          {hiddenTags.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-xs font-medium text-brand-blue-deep cursor-default">
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
