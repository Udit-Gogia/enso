import { toSentenceCase } from "@/lib/utils";

export function DisplayTags({
  tags,
}: {
  tags: string[];
  theme?: "vendor" | "customer";
}) {
  return (
    <div className="flex flex-wrap justify-start gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
        >
          {toSentenceCase(tag.replace("_", " "))}
        </span>
      ))}
    </div>
  );
}
