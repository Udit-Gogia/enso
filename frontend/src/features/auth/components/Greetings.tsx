interface GreetingsProps {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  title: string;
  description?: string;
  footerComp?: JSX.Element;
}
export function Greetings({
  className = "",
  descriptionClassName = "",
  titleClassName = "",
  title,
  description = "",
  footerComp,
}: GreetingsProps) {
  return (
    <div className={`mx-auto text-center flex flex-col gap-2 ${className}`}>
      <h2
        className={`font-display text-3xl font-semibold tracking-tight text-ink ${titleClassName}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={` text-base leading-relaxed max-w-[600px] text-ink-muted ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
      <footer className="w-full">{footerComp}</footer>
    </div>
  );
}
