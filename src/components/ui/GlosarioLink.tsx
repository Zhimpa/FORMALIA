"use client";

import Link from "next/link";
import { useState, useId } from "react";
import { TERMINOS, normalizar } from "@/lib/glosario";
import { cn } from "@/lib/utils";

interface GlosarioLinkProps {
  termino: string;
  children?: React.ReactNode;
}

/**
 * Término técnico con tooltip de definición que enlaza al glosario.
 * Si `termino` no existe en el glosario, renderiza `children` sin adornos.
 */
export function GlosarioLink({ termino, children }: GlosarioLinkProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  const dato = TERMINOS.find((t) => normalizar(t.termino) === normalizar(termino));

  if (!dato) return <>{children ?? termino}</>;

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Link
        href={`/glosario?q=${encodeURIComponent(termino)}`}
        className="border-b border-dotted border-marca-400 text-marca-700 no-underline transition-colors hover:border-solid hover:border-marca-600 hover:text-marca-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-500 focus-visible:ring-offset-1"
        aria-describedby={id}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children ?? termino}
      </Link>

      {/* Tooltip — siempre en DOM para que aria-describedby funcione con lectores de pantalla */}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 z-50 mb-2 w-64 max-w-[min(16rem,90vw)] -translate-x-1/2 rounded-lg bg-neutral-900 px-3 py-2.5 text-left text-sm leading-snug text-white shadow-lg transition-opacity duration-150",
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <p className="mb-1 text-xs font-semibold text-marca-300">{dato.termino}</p>
        <p className="text-neutral-200">{dato.definicion}</p>
        <p className="mt-2 text-xs text-neutral-400">Clic para ver en glosario →</p>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full -translate-x-1/2 h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-neutral-900"
        />
      </span>
    </span>
  );
}
