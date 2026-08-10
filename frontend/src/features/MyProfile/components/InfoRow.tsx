export function InfoRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-6 ${isLast ? "border-b-0" : "border-b"} border-border-soft py-4 last:border-b-0 `}
    >
      <span className="shrink-0 text-sm font-medium text-ink-muted">
        {label}
      </span>

      <span className="min-w-0 flex-1 text-right text-sm font-semibold text-ink-900">
        {value}
      </span>
    </div>
  );
}
