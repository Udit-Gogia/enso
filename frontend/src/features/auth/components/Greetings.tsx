interface GreetingsProps {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  title: string;
  showDescription?: boolean;
}
export function Greetings({
  className = "",
  descriptionClassName = "",
  titleClassName = "",
  title,
  showDescription = true,
}: GreetingsProps) {
  return (
    <div className={`mx-auto text-center flex flex-col gap-1 ${className}`}>
      <h2
        className={`font-display text-3xl font-semibold tracking-tight text-ink ${titleClassName}`}
      >
        {title}
      </h2>

      {showDescription && (
        <p
          className={`mt-3 text-base leading-relaxed max-w-[600px] text-ink-muted ${descriptionClassName}`}
        >
          Select the role that best matches how you'll use Enso. You can update
          it later from your account settings.
        </p>
      )}
    </div>
  );
}
