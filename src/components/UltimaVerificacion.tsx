import { cn } from "@/lib/utils";

interface UltimaVerificacionProps {
  fecha: string;
  fuente?: string;
  className?: string;
}

export function UltimaVerificacion({ fecha, fuente, className }: UltimaVerificacionProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-600",
        className,
      )}
      title={fuente ? `Fuente: ${fuente}` : undefined}
    >
      {/* Icon inherits container color so it works on both light and dark backgrounds */}
      <svg
        className="h-3.5 w-3.5 flex-shrink-0 opacity-70"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span>
        <span className="font-medium">Datos verificados:</span>{" "}
        <time dateTime={fecha}>{fecha}</time>
      </span>
      {fuente && (
        <span className="hidden opacity-70 sm:inline">
          · {fuente}
        </span>
      )}
    </div>
  );
}
