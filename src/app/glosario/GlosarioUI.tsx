"use client";

import { useState, useId, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  TERMINOS,
  CATEGORIA_LABEL,
  CATEGORIA_COLOR,
  normalizar,
  type GlosarioCategoria,
  type GlosarioTermino,
} from "@/lib/glosario";

export function GlosarioUI() {
  const inputId = useId();
  const [busqueda, setBusqueda] = useState("");

  // Pre-rellena la búsqueda desde ?q= (usado por GlosarioLink para llegar al término)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setBusqueda(q);
  }, []);

  const q = normalizar(busqueda.trim());

  const visibles: GlosarioTermino[] =
    q.length === 0
      ? TERMINOS
      : TERMINOS.filter(
          (t) =>
            normalizar(t.termino).includes(q) ||
            (t.sigla && normalizar(t.sigla).includes(q)) ||
            normalizar(t.definicion).includes(q) ||
            normalizar(t.ejemplo).includes(q),
        );

  // Agrupar por letra inicial
  const porLetra: Record<string, GlosarioTermino[]> = {};
  for (const t of visibles) {
    const letra = t.termino[0].toUpperCase();
    if (!porLetra[letra]) porLetra[letra] = [];
    porLetra[letra].push(t);
  }
  const letras = Object.keys(porLetra).sort();

  return (
    <div>
      {/* Search box */}
      <div className="relative mb-6">
        <label htmlFor={inputId} className="sr-only">
          Buscar término contable o tributario
        </label>
        <svg
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          id={inputId}
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar: IGV, CTS, devengado, RUC..."
          autoFocus
          className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-marca-500 focus:outline-none focus:ring-2 focus:ring-marca-500 shadow-sm"
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => setBusqueda("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-400 hover:text-neutral-600"
            aria-label="Limpiar búsqueda"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-neutral-500" aria-live="polite" aria-atomic="true">
        {q.length > 0 ? (
          visibles.length > 0 ? (
            <>
              <span className="font-medium text-neutral-800">{visibles.length}</span>{" "}
              {visibles.length === 1 ? "término encontrado" : "términos encontrados"} para{" "}
              <span className="font-medium text-neutral-800">&ldquo;{busqueda}&rdquo;</span>
            </>
          ) : (
            <>
              Sin resultados para{" "}
              <span className="font-medium text-neutral-800">&ldquo;{busqueda}&rdquo;</span>
              {" "}— prueba con otra palabra.
            </>
          )
        ) : (
          <>
            <span className="font-medium text-neutral-800">{TERMINOS.length}</span> términos en total
          </>
        )}
      </p>

      {/* Term groups */}
      {letras.length > 0 ? (
        <div className="space-y-8">
          {letras.map((letra) => (
            <section key={letra} aria-labelledby={`letra-${letra}`}>
              <h2
                id={`letra-${letra}`}
                className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400"
              >
                {letra}
              </h2>
              <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white overflow-hidden">
                {porLetra[letra].map((termino) => (
                  <TerminoCard key={termino.termino} termino={termino} busqueda={q} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-medium text-neutral-700">Sin resultados</p>
          <p className="mt-1 text-sm text-neutral-500">
            Intenta con otro término — prueba &ldquo;IGV&rdquo;, &ldquo;planilla&rdquo; o &ldquo;UIT&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}

function TerminoCard({
  termino: t,
  busqueda,
}: {
  termino: GlosarioTermino;
  busqueda: string;
}) {
  return (
    <div className="px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-neutral-900">
            <Highlight texto={t.termino} busqueda={busqueda} />
            {t.sigla && t.sigla !== t.termino && (
              <span className="ml-1.5 text-xs font-medium text-neutral-500">
                (<Highlight texto={t.sigla} busqueda={busqueda} />)
              </span>
            )}
          </h3>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs font-medium shrink-0",
              CATEGORIA_COLOR[t.categoria],
            )}
          >
            {CATEGORIA_LABEL[t.categoria]}
          </span>
        </div>
      </div>

      <p className="text-sm text-neutral-700 leading-relaxed">
        <Highlight texto={t.definicion} busqueda={busqueda} />
      </p>

      {t.ejemplo && (
        <p className="mt-2 text-xs text-neutral-500 leading-relaxed border-l-2 border-neutral-200 pl-3 italic">
          <span className="not-italic font-medium text-neutral-600">Ejemplo: </span>
          <Highlight texto={t.ejemplo} busqueda={busqueda} />
        </p>
      )}
    </div>
  );
}

/** Resalta las coincidencias de búsqueda en un texto */
function Highlight({ texto, busqueda }: { texto: string; busqueda: string }) {
  if (!busqueda) return <>{texto}</>;

  // Buscamos por índice en la versión normalizada
  const textoNorm = normalizar(texto);
  const parts: { text: string; highlight: boolean }[] = [];
  let cursor = 0;

  while (cursor < texto.length) {
    const idx = textoNorm.indexOf(busqueda, cursor);
    if (idx === -1) {
      parts.push({ text: texto.slice(cursor), highlight: false });
      break;
    }
    if (idx > cursor) {
      parts.push({ text: texto.slice(cursor, idx), highlight: false });
    }
    parts.push({ text: texto.slice(idx, idx + busqueda.length), highlight: true });
    cursor = idx + busqueda.length;
  }

  return (
    <>
      {parts.map((p, i) =>
        p.highlight ? (
          <mark key={i} className="bg-advertencia-200 text-neutral-900 rounded-sm px-0.5">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}
