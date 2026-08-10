export function SectionCard({
  icon,
  iconBg,
  title,
  className,
  children,
  desc,
}: {
  icon?: React.ReactNode;
  iconBg?: string;
  title: string;
  className?: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 border border-surface-page shadow-md ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
          >
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-ink-900">{title}</h3>
          <p className="text-sm text-ink-muted">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
