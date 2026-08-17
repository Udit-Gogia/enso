export function InfoRow({
  label,
  value,
  isEditing,
  EditInput,
  isLast,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
  isEditing?: boolean;
  EditInput?: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-6 ${isLast ? "border-b-0" : "border-b"} border-border-soft py-4 last:border-b-0 `}
    >
      <span
        className={`shrink-0 text-sm font-medium ${isEditing ? "text-ink" : "text-ink-muted"} transition-all`}
      >
        {label}
      </span>

      {isEditing ? (
        EditInput
      ) : (
        <span className="min-w-0 flex-1 text-right text-sm font-semibold text-ink-900 pb-[1.5px]">
          {value}
        </span>
      )}
    </div>
  );
}
