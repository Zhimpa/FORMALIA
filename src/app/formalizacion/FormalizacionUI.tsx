"use client";

import { useState } from "react";
import {
  TIPOS_EMPRESA,
  FILAS_COMPARATIVA,
  TEXTO_ADVERTENCIA_FE,
  contarCompletados,
  exportarTexto,
  type TipoEmpresaId,
  type TipoEmpresa,
  type PasoFormalizacion,
} from "@/lib/formalizacion";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function FormalizacionUI() {
  const [tipoId, setTipoId] = useState<TipoEmpresaId | null>(null);
  const [vista, setVista] = useState<"selector" | "checklist">("selector");
  const [comparativaAbierta, setComparativaAbierta] = useState(false);
  const [completados, setCompletados] = useState<
    Partial<Record<TipoEmpresaId, Record<string, boolean>>>
  >({});

  const tipoActual = tipoId
    ? TIPOS_EMPRESA.find((t) => t.id === tipoId) ?? null
    : null;

  const togglePaso = (id: TipoEmpresaId, pasoId: string) => {
    setCompletados((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [pasoId]: !(prev[id]?.[pasoId] ?? false) },
    }));
  };

  const handleExport = () => {
    if (!tipoActual) return;
    const texto = exportarTexto(tipoActual, completados[tipoActual.id] ?? {});
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `checklist-formalizacion-${tipoActual.id}-contaperu.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (vista === "checklist" && tipoActual) {
    const estadoActual = completados[tipoActual.id] ?? {};
    const { completados: n, total } = contarCompletados(tipoActual.pasos, estadoActual);
    const progreso = total > 0 ? Math.round((n / total) * 100) : 0;

    return (
      <div className="contenedor py-8 sm:py-12">
        <div className="mx-auto max-w-2xl">
          {/* Back + header */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setVista("selector")}
              className="mb-4 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2 rounded"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Cambiar tipo de empresa
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">{tipoActual.emoji}</span>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                  {tipoActual.nombre}
                </h1>
                <p className="text-sm text-neutral-500">{tipoActual.paraQuien}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-neutral-600">
                <strong className="text-neutral-900">{n}</strong> de{" "}
                <strong className="text-neutral-900">{total}</strong> pasos completados
              </span>
              <span className="font-semibold text-marca-700">{progreso}%</span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200"
              role="progressbar"
              aria-valuenow={n}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${n} de ${total} pasos completados`}
            >
              <div
                className="h-full rounded-full bg-marca-600 transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>

          {/* SUNAT alert — always visible */}
          <div className="mb-6">
            <Alert variante="advertencia">{TEXTO_ADVERTENCIA_FE}</Alert>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {tipoActual.pasos.map((paso, i) => (
              <PasoItem
                key={paso.id}
                paso={paso}
                numero={i + 1}
                hecho={estadoActual[paso.id] === true}
                onToggle={() => togglePaso(tipoActual.id, paso.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <UltimaVerificacion fecha="junio 2026" fuente="SUNAT · SUNARP · D.Leg. 1409" />
            <Button variante="secundario" tamaño="sm" onClick={handleExport}>
              ↓ Exportar checklist (.txt)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Selector view
  // ---------------------------------------------------------------------------
  return (
    <div className="contenedor py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Formaliza tu empresa
          </h1>
          <p className="mt-2 mx-auto max-w-2xl text-neutral-600">
            Elige el tipo de empresa y sigue el checklist paso a paso. Todos los costos
            son datos reales de SUNAT y SUNARP (2026).
          </p>
        </div>

        {/* Step 1: Type selector */}
        <section aria-labelledby="h-tipo">
          <h2 id="h-tipo" className="mb-4 text-lg font-semibold text-neutral-800">
            Paso 1 — ¿Qué tipo de empresa quieres?
          </h2>
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            role="list"
          >
            {TIPOS_EMPRESA.map((tipo) => {
              const sel = tipoId === tipo.id;
              return (
                <button
                  key={tipo.id}
                  type="button"
                  role="listitem"
                  onClick={() => setTipoId(tipo.id)}
                  aria-pressed={sel}
                  className={cn(
                    "w-full rounded-xl border-2 p-4 text-left transition-all duration-150",
                    "hover:border-marca-400 hover:bg-marca-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2",
                    sel ? "border-marca-600 bg-marca-50" : "border-neutral-200 bg-white"
                  )}
                >
                  <div className="text-2xl mb-2" aria-hidden="true">{tipo.emoji}</div>
                  <div className={cn("font-semibold text-sm leading-snug", sel ? "text-marca-800" : "text-neutral-900")}>
                    {tipo.nombre}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500 leading-snug">
                    {tipo.paraQuien}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge texto={tipo.costoResumen} activo={sel} />
                    <Badge texto={tipo.tiempoResumen} activo={sel} />
                  </div>
                  {sel && (
                    <p className="mt-2 text-xs font-semibold text-marca-700">✓ Seleccionado</p>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Ventajas / Desventajas del tipo seleccionado */}
        {tipoActual && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-exito-700">Ventajas</h3>
                <ul className="space-y-1.5">
                  {tipoActual.ventajas.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-exito-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-peligro-700">Desventajas</h3>
                <ul className="space-y-1.5">
                  {tipoActual.desventajas.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: CTA to checklist */}
        <section className="mt-8" aria-labelledby="h-checklist">
          <h2 id="h-checklist" className="mb-4 text-lg font-semibold text-neutral-800">
            Paso 2 — Sigue el checklist
          </h2>
          {tipoActual ? (
            <div className="flex flex-col gap-3 rounded-xl border-2 border-marca-200 bg-marca-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-marca-900">
                  {tipoActual.emoji} {tipoActual.nombre}
                </p>
                <p className="text-sm text-marca-700">
                  {tipoActual.pasos.length} pasos · {tipoActual.costoResumen} · {tipoActual.tiempoResumen}
                </p>
              </div>
              <Button variante="primario" tamaño="sm" onClick={() => setVista("checklist")}>
                Ver checklist →
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-400">
              Selecciona un tipo de empresa arriba para ver su checklist paso a paso.
            </div>
          )}
        </section>

        {/* Comparison table */}
        <section className="mt-10" aria-labelledby="h-comparativa">
          <button
            type="button"
            id="h-comparativa"
            onClick={() => setComparativaAbierta((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-3.5 text-left hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2"
            aria-expanded={comparativaAbierta}
          >
            <span className="font-semibold text-neutral-800">
              Comparativa completa de los 5 tipos de empresa
            </span>
            <span className="text-sm text-neutral-500 flex items-center gap-1">
              {comparativaAbierta ? "Ocultar" : "Ver tabla"}
              <svg
                className={cn("h-4 w-4 transition-transform", comparativaAbierta && "rotate-180")}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>

          {comparativaAbierta && (
            <div className="mt-2 overflow-x-auto rounded-xl border border-neutral-200 shadow-card">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 w-32">
                      Aspecto
                    </th>
                    {TIPOS_EMPRESA.map((tipo) => (
                      <th
                        key={tipo.id}
                        className={cn(
                          "px-4 py-3 text-left text-xs font-semibold whitespace-nowrap",
                          tipoId === tipo.id
                            ? "bg-marca-50 text-marca-700"
                            : "text-neutral-700"
                        )}
                      >
                        {tipo.emoji} {tipo.nombreCorto}
                        {tipoId === tipo.id && (
                          <span className="ml-1 text-marca-500">✓</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {FILAS_COMPARATIVA.map((fila) => (
                    <tr key={fila.aspecto} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 text-xs font-medium text-neutral-500 align-top">
                        {fila.aspecto}
                      </td>
                      {TIPOS_EMPRESA.map((tipo) => (
                        <td
                          key={tipo.id}
                          className={cn(
                            "px-4 py-3 text-xs align-top",
                            tipoId === tipo.id
                              ? "bg-marca-50 font-medium text-marca-800"
                              : "text-neutral-700"
                          )}
                        >
                          {fila.valores[tipo.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-end">
          <UltimaVerificacion fecha="junio 2026" fuente="SUNAT · SUNARP · D.Leg. 1409" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Badge({ texto, activo }: { texto: string; activo: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        activo ? "bg-marca-100 text-marca-800" : "bg-neutral-100 text-neutral-600"
      )}
    >
      {texto}
    </span>
  );
}

interface PasoItemProps {
  paso: PasoFormalizacion;
  numero: number;
  hecho: boolean;
  onToggle: () => void;
}

function PasoItem({ paso, numero, hecho, onToggle }: PasoItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 transition-colors duration-150",
        hecho ? "border-exito-200 bg-exito-50" : "border-neutral-200 bg-white"
      )}
    >
      <label className="flex cursor-pointer items-start gap-4 p-4">
        {/* Accessible hidden checkbox */}
        <input
          type="checkbox"
          checked={hecho}
          onChange={onToggle}
          className="sr-only"
          aria-label={`Marcar como completado: ${paso.titulo}`}
        />

        {/* Visual checkbox */}
        <span
          className={cn(
            "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all",
            hecho ? "border-exito-500 bg-exito-500" : "border-neutral-300 bg-white"
          )}
          aria-hidden="true"
        >
          {hecho && (
            <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                hecho ? "bg-exito-100 text-exito-700" : "bg-neutral-100 text-neutral-500"
              )}
            >
              {numero}
            </span>
            <span
              className={cn(
                "font-semibold text-sm",
                hecho ? "text-exito-700 line-through opacity-70" : "text-neutral-900"
              )}
            >
              {paso.titulo}
            </span>
            {paso.opcional && (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                Opcional
              </span>
            )}
          </div>

          {!hecho && (
            <>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                {paso.descripcion}
              </p>

              {/* Cost / time badges */}
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                  {paso.costoTexto}
                </span>
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {paso.tiempoTexto}
                </span>
              </div>

              {/* Warning alert */}
              {paso.advertenciaTexto && (
                <div className="mt-3">
                  <Alert variante="advertencia">{paso.advertenciaTexto}</Alert>
                </div>
              )}

              {/* Additional note */}
              {paso.notaAdicional && (
                <p className="mt-2 text-xs italic text-neutral-400">{paso.notaAdicional}</p>
              )}

              {/* Official links */}
              {paso.enlacesOficiales.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {paso.enlacesOficiales.map((enlace) => (
                    <a
                      key={enlace.url}
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:border-marca-300 hover:text-marca-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      {enlace.texto}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </label>
    </div>
  );
}
