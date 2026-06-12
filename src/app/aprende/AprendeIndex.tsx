"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ArticuloMeta, Nivel } from "@/lib/aprende";
import { NIVEL_LABEL, NIVEL_COLOR } from "@/lib/aprende-ui";

type Filtro = Nivel | "todos";

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "basico", label: "Básico" },
  { id: "intermedio", label: "Intermedio" },
  { id: "avanzado", label: "Avanzado" },
];

const FILTRO_ACTIVO_COLOR: Record<Filtro, string> = {
  todos: "bg-neutral-800 text-white",
  basico: "bg-exito-600 text-white",
  intermedio: "bg-advertencia-500 text-white",
  avanzado: "bg-peligro-600 text-white",
};

interface Props {
  articulos: ArticuloMeta[];
}

export function AprendeIndex({ articulos }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const visibles = filtro === "todos" ? articulos : articulos.filter((a) => a.nivel === filtro);

  const porNivel: Partial<Record<Nivel, ArticuloMeta[]>> = {};
  for (const a of visibles) {
    if (!porNivel[a.nivel]) porNivel[a.nivel] = [];
    porNivel[a.nivel]!.push(a);
  }

  const nivelOrden: Nivel[] = ["basico", "intermedio", "avanzado"];

  return (
    <div>
      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filtrar por nivel"
        className="flex flex-wrap gap-2 mb-8"
      >
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
              filtro === f.id
                ? cn(FILTRO_ACTIVO_COLOR[f.id], "border-transparent")
                : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
            )}
            aria-pressed={filtro === f.id}
          >
            {f.label}
            {f.id !== "todos" && (
              <span className={cn("ml-1.5 text-xs opacity-70")}>
                ({articulos.filter((a) => a.nivel === f.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Articles grouped by level */}
      <div className="space-y-10">
        {nivelOrden.map((nivel) => {
          const grupo = porNivel[nivel];
          if (!grupo || grupo.length === 0) return null;

          return (
            <section key={nivel} aria-labelledby={`nivel-${nivel}`}>
              <div className="flex items-center gap-3 mb-4">
                <h2 id={`nivel-${nivel}`} className="text-lg font-semibold text-neutral-800">
                  {NIVEL_LABEL[nivel]}
                </h2>
                <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", NIVEL_COLOR[nivel])}>
                  {grupo.length} {grupo.length === 1 ? "artículo" : "artículos"}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.map((a) => (
                  <ArticuloCard key={a.slug} articulo={a} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {visibles.length === 0 && (
        <p className="py-12 text-center text-sm text-neutral-500">
          No hay artículos para este filtro.
        </p>
      )}
    </div>
  );
}

function ArticuloCard({ articulo }: { articulo: ArticuloMeta }) {
  const { slug, titulo, nivel, descripcion, lecturaMinutos } = articulo;

  return (
    <Link
      href={`/aprende/${slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-500"
    >
      {/* Level badge + reading time */}
      <div className="mb-3 flex items-center justify-between">
        <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", NIVEL_COLOR[nivel])}>
          {NIVEL_LABEL[nivel]}
        </span>
        <span className="flex items-center gap-1 text-xs text-neutral-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {lecturaMinutos} min
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold text-neutral-900 group-hover:text-marca-700 transition-colors leading-snug">
        {titulo}
      </h3>

      {/* Description */}
      <p className="text-xs text-neutral-500 leading-relaxed flex-1">{descripcion}</p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-marca-600 group-hover:text-marca-800 transition-colors">
        Leer artículo
        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}
