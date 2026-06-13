"use client";

import { useState } from "react";
import { calcularCostoLaboral, type RegimenLaboral } from "@/lib/calculadoras";
import { cn } from "@/lib/utils";

const fmtS = (n: number) =>
  `S/ ${new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

const REGIMENES: { id: RegimenLaboral; label: string; descripcion: string }[] = [
  { id: "general", label: "Régimen General", descripcion: "MYPE Tributario o General — sin límite de trabajadores" },
  { id: "pequeña", label: "Pequeña Empresa", descripcion: "Ventas hasta 1,700 UIT/año (S/ 9,350,000)" },
  { id: "micro", label: "Microempresa", descripcion: "Ventas hasta 150 UIT/año (S/ 825,000)" },
];

const FILAS_DESGLOSE: { key: keyof ReturnType<typeof calcularCostoLaboral>; label: string; nota: string }[] = [
  { key: "essaludMensual", label: "ESSALUD (empleador)", nota: "9% del sueldo bruto" },
  { key: "ctsMensual", label: "CTS (provisión mensual)", nota: "Compensación por tiempo de servicio" },
  { key: "gratificacionesMensual", label: "Gratificaciones (provisión)", nota: "Julio y diciembre · incluye bonificación extraordinaria 9% (Ley 30334)" },
  { key: "vacacionesMensual", label: "Vacaciones (provisión)", nota: "15 o 30 días según régimen" },
];

export function CalculadoraCostoLaboral() {
  const [sueldo, setSueldo] = useState("1000");
  const [regimen, setRegimen] = useState<RegimenLaboral>("general");

  const sueldoNum = parseFloat(sueldo) || 0;
  const resultado = sueldoNum > 0 ? calcularCostoLaboral(sueldoNum, regimen) : null;

  const comparativa = sueldoNum > 0
    ? REGIMENES.map((r) => calcularCostoLaboral(sueldoNum, r.id))
    : null;

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-600">
        Calcula cuánto te cuesta realmente un trabajador más allá del sueldo: ESSALUD, CTS, gratificaciones y vacaciones según el régimen laboral.
      </p>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
        <Campo
          id="cl-sueldo"
          label="Sueldo bruto mensual (S/)"
          value={sueldo}
          onChange={setSueldo}
          ayuda="Lo que el trabajador recibe antes de descuentos"
        />

        <fieldset>
          <legend className="text-sm font-medium text-neutral-700 mb-2">Régimen laboral</legend>
          <div className="space-y-2">
            {REGIMENES.map((r) => (
              <label key={r.id} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-3 cursor-pointer hover:bg-neutral-50 transition-colors">
                <input
                  type="radio"
                  name="regimen"
                  value={r.id}
                  checked={regimen === r.id}
                  onChange={() => setRegimen(r.id)}
                  className="mt-0.5 accent-marca-600"
                />
                <div>
                  <span className="text-sm font-medium text-neutral-800">{r.label}</span>
                  <span className="block text-xs text-neutral-500">{r.descripcion}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {resultado && (
        <>
          {/* Desglose */}
          <div className="rounded-xl border border-marca-200 bg-marca-50 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-700">
              Desglose mensual — {REGIMENES.find((r) => r.id === regimen)?.label}
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-marca-100">
                  <td className="py-2 text-neutral-600">Sueldo bruto</td>
                  <td className="py-2 text-right font-medium text-neutral-800">{fmtS(resultado.sueldoBruto)}</td>
                </tr>
                {FILAS_DESGLOSE.map(({ key, label, nota }) => {
                  const valor = resultado[key] as number;
                  const esGratis = valor === 0;
                  return (
                    <tr key={key} className="border-b border-marca-100">
                      <td className="py-2 text-neutral-600">
                        {label}
                        <span className="ml-2 text-xs text-neutral-400">{nota}</span>
                      </td>
                      <td className={cn("py-2 text-right font-medium", esGratis ? "text-exito-600" : "text-neutral-800")}>
                        {esGratis ? "No aplica" : `+ ${fmtS(valor)}`}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-marca-300">
                  <td className="py-2.5 font-semibold text-neutral-800">Costo real mensual promedio</td>
                  <td className="py-2.5 text-right font-bold text-lg text-marca-700">{fmtS(resultado.costoMensualPromedio)}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="rounded-lg bg-white border border-marca-200 px-3 py-2">
                <p className="text-xs text-neutral-500">Multiplicador</p>
                <p className="text-base font-bold text-marca-700">×{resultado.multiplicador}</p>
              </div>
              <div className="rounded-lg bg-white border border-marca-200 px-3 py-2">
                <p className="text-xs text-neutral-500">Costo anual total</p>
                <p className="text-base font-bold text-marca-700">{fmtS(resultado.costoAnual)}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-600">
              Multiplicador ×{resultado.multiplicador} significa que por cada sol de sueldo, el negocio paga S/ {resultado.multiplicador} en total. El costo anual incluye meses con gratificación.
            </p>
          </div>

          {/* Comparativa 3 regímenes */}
          {comparativa && (
            <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700">Comparativa entre regímenes (sueldo {fmtS(sueldoNum)})</h3>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm min-w-[360px]">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-2 text-left text-xs font-medium text-neutral-500">Régimen</th>
                      <th className="py-2 text-right text-xs font-medium text-neutral-500">Costo mensual</th>
                      <th className="py-2 text-right text-xs font-medium text-neutral-500">Multiplicador</th>
                      <th className="py-2 text-right text-xs font-medium text-neutral-500">Costo anual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativa.map((c, i) => (
                      <tr key={c.regimen} className={cn("border-b border-neutral-100", c.regimen === regimen && "bg-marca-50")}>
                        <td className="py-2 font-medium text-neutral-800">
                          {REGIMENES[i].label}
                          {c.regimen === regimen && <span className="ml-2 text-xs text-marca-600">(actual)</span>}
                        </td>
                        <td className="py-2 text-right text-neutral-800">{fmtS(c.costoMensualPromedio)}</td>
                        <td className="py-2 text-right text-neutral-800">×{c.multiplicador}</td>
                        <td className="py-2 text-right font-medium text-neutral-800">{fmtS(c.costoAnual)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <Disclaimer />
    </div>
  );
}

function Campo({
  id, label, value, onChange, ayuda,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; ayuda?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-500 pointer-events-none">S/</span>
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min="0"
          step="1"
          placeholder="0"
          className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-marca-500 focus:outline-none focus:ring-2 focus:ring-marca-500"
        />
      </div>
      {ayuda && <p className="mt-1 text-xs text-neutral-500">{ayuda}</p>}
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="border-t border-neutral-100 pt-3 text-xs italic text-neutral-400">
      Información referencial. Consulta con un contador público colegiado para asesoría personalizada.
    </p>
  );
}
