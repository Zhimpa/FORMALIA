"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CalculadoraIGV } from "@/components/calculadoras/CalculadoraIGV";
import { CalculadoraCostoLaboral } from "@/components/calculadoras/CalculadoraCostoLaboral";
import { CalculadoraPuntoEquilibrio } from "@/components/calculadoras/CalculadoraPuntoEquilibrio";
import { CalculadoraImpuestoRenta } from "@/components/calculadoras/CalculadoraImpuestoRenta";
import { CalculadoraNRUS } from "@/components/calculadoras/CalculadoraNRUS";

type TabId = "igv" | "laboral" | "equilibrio" | "renta" | "nrus";

const TABS: { id: TabId; label: string; emoji: string; descripcion: string }[] = [
  {
    id: "igv",
    label: "IGV",
    emoji: "🧾",
    descripcion: "Calcula el 18% y el débito/crédito fiscal mensual",
  },
  {
    id: "laboral",
    label: "Costo laboral",
    emoji: "👷",
    descripcion: "Sueldo + beneficios sociales por régimen",
  },
  {
    id: "equilibrio",
    label: "Punto de equilibrio",
    emoji: "⚖️",
    descripcion: "Mínimo de ventas para no perder dinero",
  },
  {
    id: "renta",
    label: "Impuesto a la Renta",
    emoji: "📊",
    descripcion: "RMT vs RG — cuánto pagas según tu utilidad",
  },
  {
    id: "nrus",
    label: "Cuota NRUS",
    emoji: "🟦",
    descripcion: "Categoría y cuota fija mensual del Nuevo RUS",
  },
];

export function CalculadorasUI() {
  const [tab, setTab] = useState<TabId>("igv");

  const tabActual = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-contenido px-4 py-6">
          <h1 className="text-2xl font-bold text-neutral-900">Calculadoras tributarias</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Herramientas para entender los números de tu negocio en Perú — datos 2026
          </p>
        </div>

        {/* Tab bar — horizontally scrollable on mobile */}
        <div className="mx-auto max-w-contenido px-4">
          <div
            role="tablist"
            aria-label="Calculadoras"
            className="flex gap-1 overflow-x-auto pb-px"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                  tab === t.id
                    ? "border-b-2 border-marca-600 text-marca-700 bg-marca-50"
                    : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <span aria-hidden="true">{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-contenido px-4 py-6">
        <div
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
        >
          {/* Tab heading */}
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-neutral-800">
              <span aria-hidden="true" className="mr-2">{tabActual.emoji}</span>
              {tabActual.label}
            </h2>
            <p className="text-sm text-neutral-500">{tabActual.descripcion}</p>
          </div>

          {/* Calculator */}
          <div className="max-w-xl">
            {tab === "igv" && <CalculadoraIGV />}
            {tab === "laboral" && <CalculadoraCostoLaboral />}
            {tab === "equilibrio" && <CalculadoraPuntoEquilibrio />}
            {tab === "renta" && <CalculadoraImpuestoRenta />}
            {tab === "nrus" && <CalculadoraNRUS />}
          </div>
        </div>
      </div>
    </div>
  );
}
