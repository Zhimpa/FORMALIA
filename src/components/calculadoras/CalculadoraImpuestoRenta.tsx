"use client";

import { useState } from "react";
import { calcularImpuestoRenta } from "@/lib/calculadoras";
import { TASAS_IR, UIT } from "@/config/parametros-peru";
import { cn } from "@/lib/utils";

const fmtS = (n: number) =>
  `S/ ${new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

export function CalculadoraImpuestoRenta() {
  const [utilidad, setUtilidad] = useState("");

  const u = parseFloat(utilidad) || 0;
  const resultado = u > 0 ? calcularImpuestoRenta(u) : null;

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-600">
        Compara cuánto pagarías de Impuesto a la Renta en el Régimen MYPE Tributario (RMT) versus el Régimen General (RG) con tu utilidad anual estimada.
      </p>

      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <Campo
          id="ir-utilidad"
          label="Utilidad anual estimada (S/)"
          value={utilidad}
          onChange={setUtilidad}
          ayuda="Ingresos del año menos todos tus costos y gastos deducibles"
        />
      </div>

      {resultado && (
        <>
          {/* Comparativa RMT vs RG */}
          <div className="rounded-xl border border-marca-200 bg-marca-50 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-700">Comparativa de regímenes tributarios</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* RMT */}
              <div className="rounded-xl border-2 border-exito-400 bg-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-exito-700 uppercase tracking-wide">RMT</span>
                  <span className="rounded-full bg-exito-100 px-2 py-0.5 text-xs font-medium text-exito-700">Recomendado</span>
                </div>
                <p className="text-xs text-neutral-500">Régimen MYPE Tributario</p>
                <p className="text-2xl font-bold text-exito-700">{fmtS(resultado.impuestoRMT)}</p>
                <p className="text-xs text-neutral-500">Tasa efectiva: {resultado.tasaEfectivaRMT}%</p>
              </div>

              {/* RG */}
              <div className="rounded-xl border border-neutral-200 bg-white p-4 space-y-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">RG</span>
                <p className="text-xs text-neutral-500">Régimen General</p>
                <p className="text-2xl font-bold text-neutral-700">{fmtS(resultado.impuestoRG)}</p>
                <p className="text-xs text-neutral-500">Tasa efectiva: {resultado.tasaEfectivaRG}%</p>
              </div>
            </div>

            {resultado.ahorroRMT > 0 && (
              <div className="rounded-lg bg-exito-100 border border-exito-200 px-4 py-3">
                <p className="text-sm font-semibold text-exito-800">
                  Ahorro con RMT: {fmtS(resultado.ahorroRMT)}
                </p>
                <p className="text-xs text-exito-700 mt-0.5">
                  Si estás en RG y puedes migrar a RMT, pagarías {fmtS(resultado.ahorroRMT)} menos al año.
                </p>
              </div>
            )}
          </div>

          {/* Detalle RMT */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-3">
            <h3 className="text-sm font-semibold text-neutral-700">Cálculo detallado — RMT</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-600">Utilidad anual</td>
                  <td className="py-2 text-right font-medium text-neutral-800">{fmtS(resultado.utilidad)}</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-600">
                    Tramo hasta 15 UIT ({fmtS(resultado.detalleRMT.tramoBase)})
                    <span className="ml-2 text-xs text-neutral-400">× {TASAS_IR.rmt.tramoHasta15UIT.valor}%</span>
                  </td>
                  <td className="py-2 text-right font-medium text-neutral-800">{fmtS(resultado.detalleRMT.impuestoBase)}</td>
                </tr>
                {resultado.detalleRMT.tramoExceso > 0 && (
                  <tr className="border-b border-neutral-100">
                    <td className="py-2 text-neutral-600">
                      Exceso de 15 UIT ({fmtS(resultado.detalleRMT.tramoExceso)})
                      <span className="ml-2 text-xs text-neutral-400">× 29.5%</span>
                    </td>
                    <td className="py-2 text-right font-medium text-neutral-800">{fmtS(resultado.detalleRMT.impuestoExceso)}</td>
                  </tr>
                )}
                <tr className="border-t-2 border-neutral-200">
                  <td className="py-2.5 font-semibold text-neutral-800">Total IR en RMT</td>
                  <td className="py-2.5 text-right font-bold text-base text-marca-700">{fmtS(resultado.impuestoRMT)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-neutral-500">
              El límite de 15 UIT en 2026 equivale a {fmtS(resultado.detalleRMT.limite15UIT)} (UIT = S/ {UIT.valor.toLocaleString("es-PE")}). Utilidad por encima de ese monto paga la tasa de {TASAS_IR.rmt.tramoExceso15UIT.valor}% igual que en RG.
            </p>
          </div>
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
