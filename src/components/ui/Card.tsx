import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  titulo: string;
  subtitulo?: string;
  icono?: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ titulo, subtitulo, icono, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start gap-3 border-b border-neutral-100 px-5 py-4", className)}>
      {icono && (
        <span className="mt-0.5 flex-shrink-0 text-marca-600" aria-hidden="true">
          {icono}
        </span>
      )}
      <div>
        <h3 className="font-semibold text-neutral-900">{titulo}</h3>
        {subtitulo && <p className="mt-0.5 text-sm text-neutral-600">{subtitulo}</p>}
      </div>
    </div>
  );
}

export function CardBody({ className, children }: CardProps) {
  return <div className={cn("px-5 py-4", className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn("border-t border-neutral-100 px-5 py-3", className)}>
      {children}
    </div>
  );
}
