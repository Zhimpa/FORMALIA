"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CRONOGRAMA_2026,
  MESES_ES,
  diasRestantes,
  type DigitoRUC,
} from "@/config/cronograma-sunat";

const DIGITOS: DigitoRUC[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type EstadoFecha = "vencido" | "hoy" | "urgente" | "proximo" | "futuro";

function clasificar(fechaStr: string): EstadoFecha {
  const dias = diasRestantes(fechaStr);
  if (dias < 0) return "vencido";
  if (dias === 0) return "hoy";
  if (dias <= 7) return "urgente";
  if (dias <= 30) return "proximo";
  return "futuro";
}

const ESTADO_ESTILOS: Record<EstadoFecha, { fila: string; badge: string; texto: string }> = {
  vencido: {
    fila: "opacity-50",
    badge: "bg-neutral-100 text-neutral-500 border-neutral-200",
    texto: "Vencido",
  },
  hoy: {
    fila: "bg-peligro-50",
    badge: "bg-peligro-600 text-white border-peligro-600",
    texto: "Hoy",
  },
  urgente: {
    fila: "bg-peligro-50/60",
    badge: "bg-peligro-100 text-peligro-800 border-peligro-200",
    texto: "",
  },
  proximo: {
    fila: "bg-advertencia-50/40",
    badge: "bg-advertencia-100 text-advertencia-800 border-advertencia-200",
    texto: "",
  },
  futuro: {
    fila: "",
    badge: "bg-exito-50 text-exito-700 border-exito-200",
    texto: "",
  },
};

function BadgeEstado({ fechaStr }: { fechaStr: string }) {
  const estado = clasificar(fechaStr);
  const dias = diasRestantes(fechaStr);
  const estilos = ESTADO_ESTILOS[estado];

  let label: string;
  if (estilos.texto) {
    label = estilos.texto;
  } else if (dias < 0) {
    label = `Hace ${Math.abs(dias)} días`;
  } else if (dias === 1) {
    label = "Mañana";
  } else {
    label = `${dias} días`;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums",
        estilos.badge,
      )}
    >
      {label}
    </span>
  );
}

export function CalendarioUI() {
  const [digito, setDigito] = useState<DigitoRUC | null>(null);

  const { meses, nota, fuente, ultimaVerificacion } = CRONOGRAMA_2026;

  return (
    <div className="space-y-6">
      {/* Instrucción */}
      <p className="text-sm text-neutral-600">
        Selecciona el último dígito de tu RUC para ver tus fechas de vencimiento de declaraciones mensuales.
      </p>

      {/* Digit selector */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-neutral-700">
          Último dígito de mi RUC
        </legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Último dígito del RUC">
          {DIGITOS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDigito(d)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition-colors",
                digito === d
                  ? "border-marca-600 bg-marca-600 text-white shadow-sm"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-marca-400 hover:bg-marca-50",
              )}
              aria-pressed={digito === d}
            >
              {d}
            </button>
          ))}
        </div>
        {digito !== null && (
          <p className="mt-2 text-xs text-neutral-500">
            Tu RUC termina en{" "}
            <span className="font-semibold text-neutral-800">{digito}</span>.
          </p>
        )}
      </fieldset>

      {/* Calendar table */}
      {digito !== null ? (
        <>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-peligro-500" aria-hidden="true" />
              <span className="text-neutral-600">Hoy / &lt;7 días</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-advertencia-400" aria-hidden="true" />
              <span className="text-neutral-600">8–30 días</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-exito-500" aria-hidden="true" />
              <span className="text-neutral-600">Más de 30 días</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" aria-hidden="true" />
              <span className="text-neutral-600">Vencido</span>
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Período
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Vencimiento
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {meses.map((mes) => {
                  const fechaStr = mes.porDigito[digito];
                  const estado = clasificar(fechaStr);
                  return (
                    <tr
                      key={`${mes.periodoAnio}-${mes.periodoMes}`}
                      className={cn(
                        "border-b border-neutral-100 last:border-0 transition-colors",
                        ESTADO_ESTILOS[estado].fila,
                      )}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "font-medium",
                            estado === "vencido" ? "text-neutral-400" : "text-neutral-800",
                          )}
                        >
                          {MESES_ES[mes.periodoMes]} {mes.periodoAnio}
                        </span>
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        <span
                          className={cn(
                            "font-mono text-xs",
                            estado === "vencido" ? "text-neutral-400" : "text-neutral-700",
                            estado === "hoy" && "font-bold text-peligro-700",
                          )}
                        >
                          {fechaStr}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <BadgeEstado fechaStr={fechaStr} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Applicability note */}
          <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-500 space-y-1">
            <p>
              <span className="font-semibold text-neutral-700">Aplica a:</span> PDT 621 (IGV + Renta mensual) y PLAME (planilla mensual).
            </p>
            <p>
              <span className="font-semibold text-neutral-700">No aplica a:</span> NRUS (cuota mensual tiene su propio cronograma), DJ Anual (vence marzo–abril del año siguiente).
            </p>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-white py-14 text-center">
          <svg
            className="mb-3 h-10 w-10 text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          <p className="text-sm font-medium text-neutral-500">
            Selecciona el último dígito de tu RUC arriba
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            El dígito está en la posición final de tus 11 números de RUC
          </p>
        </div>
      )}

      {/* Source note */}
      <div className="rounded-lg border border-advertencia-200 bg-advertencia-50 px-4 py-3 text-xs text-advertencia-800">
        <p className="font-semibold mb-0.5">Verifica siempre el cronograma oficial</p>
        <p>
          {nota} Fuente de referencia: {fuente}. Última verificación: {ultimaVerificacion}.{" "}
          <a
            href="https://www.sunat.gob.pe/cronograma"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-advertencia-900"
          >
            sunat.gob.pe/cronograma
          </a>
        </p>
      </div>
    </div>
  );
}
