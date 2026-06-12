"use client";

import { useState, useRef, useId, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  /** Definición simple del término, sin jerga técnica */
  contenido: string;
  children: React.ReactNode;
  posicion?: "arriba" | "abajo";
  className?: string;
}

/**
 * Envuelve un término técnico y muestra su definición al pasar el cursor,
 * al enfocarlo con teclado o al tocar en móvil (toggle).
 *
 * Uso:
 *   <Tooltip contenido="Valor base para calcular impuestos y multas en Perú.">
 *     UIT
 *   </Tooltip>
 */
export function Tooltip({ contenido, children, posicion = "arriba", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pinned, setPinned] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);

  const isVisible = visible || pinned;

  // Cierra el tooltip al hacer clic fuera (modo pinned / toque en móvil)
  useEffect(() => {
    if (!pinned) return;
    const handler = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setPinned(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [pinned]);

  const bubbleClases = cn(
    "absolute z-50 w-64 max-w-[min(16rem,90vw)] rounded-lg bg-neutral-900 px-3 py-2 text-sm leading-snug text-white shadow-lg",
    "left-1/2 -translate-x-1/2 transition-opacity duration-150",
    posicion === "arriba" ? "bottom-full mb-2" : "top-full mt-2",
    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
  );

  return (
    <span
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        setPinned((p) => !p);
      }}
      tabIndex={0}
      aria-describedby={id}
      // role="button" solo para touch; en desktop es decorativo
    >
      {/* Término con subrayado punteado que indica "hay más info" */}
      <span className="cursor-help border-b border-dotted border-neutral-400 leading-none">
        {children}
      </span>

      {/* Burbuja — siempre en DOM para que aria-describedby funcione con lectores de pantalla */}
      <span id={id} role="tooltip" className={bubbleClases}>
        {contenido}
        {/* Flecha decorativa */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 h-0 w-0",
            "border-x-[6px] border-x-transparent",
            posicion === "arriba"
              ? "top-full border-t-[6px] border-t-neutral-900"
              : "bottom-full border-b-[6px] border-b-neutral-900",
          )}
        />
      </span>
    </span>
  );
}
