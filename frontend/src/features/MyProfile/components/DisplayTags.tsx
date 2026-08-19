import { toSentenceCase } from "@/lib/utils";

export function DisplayTags({
  tags,
  noTagMessage,
}: {
  tags: string[];
  theme?: "vendor" | "customer";
  noTagMessage?: string;
}) {
  return (
    <div className="flex flex-wrap justify-start gap-1.5">
      {tags.length > 0 ? (
        tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand-blue/5 px-2.5 py-1 text-xs font-medium text-brand-blue-deep"
          >
            {toSentenceCase(tag.replace("_", " "))}
          </span>
        ))
      ) : (
        <span className="text-danger text-xs font-semibold">
          {noTagMessage}
        </span>
      )}
    </div>
  );
}
