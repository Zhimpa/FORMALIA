"use client";

import { useState } from "react";
import { calcularCuotaNRUS } from "@/lib/calculadoras";
import { cn } from "@/lib/utils";

const fmtS = (n: number) =>
  `S/ ${new Intl.NumberFormat("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)}`;

export function CalculadoraNRUS() {
  const [ingresos, setIngresos] = useState("");

  const ingresosNum = parseFloat(ingresos) || 0;
  const resultado = calcularCuotaNRUS(ingresosNum);

  const estaVacio = !ingresos || ingresosNum === 0;

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-600">
        El Nuevo RUS es el régimen más simple: pagas una cuota fija mensual según cuánto vendes. No llevas contabilidad, no declaras IGV.
      </p>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
        <Campo
          id="nrus-ingresos"
          label="Ingresos o compras mensuales (el mayor)"
          value={ingresos}
          onChange={setIngresos}
          ayuda="Si tus compras son más altas que tus ventas, usa el monto de compras"
        />

        {/* Tabla de categorías siempre visible */}
        <div className="rounded-lg border border-neutral-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500">Categoría</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-neutral-500">Ingresos/compras máximos</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-neutral-500">Cuota mensual</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 1, tope: resultado.topeCat1, cuota: 20 },
                { cat: 2, tope: resultado.topeCat2, cuota: 50 },
              ].map(({ cat, tope, cuota }) => {
                const activa = !estaVacio && resultado.categoria === cat;
                return (
                  <tr key={cat} className={cn("border-t border-neutral-100", activa && "bg-exito-50")}>
                    <td className={cn("px-3 py-2 font-medium", activa ? "text-exito-700" : "text-neutral-700")}>
                      Categoría {cat}
                      {activa && <span className="ml-2 text-xs text-exito-600">← estás aquí</span>}
                    </td>
                    <td className={cn("px-3 py-2 text-right", activa ? "text-exito-700" : "text-neutral-600")}>
                      Hasta {fmtS(tope)}/mes
                    </td>
                    <td className={cn("px-3 py-2 text-right font-semibold", activa ? "text-exito-700" : "text-neutral-700")}>
                      {fmtS(cuota)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {!estaVacio && (
        <>
          {resultado.superaTope ? (
            <div className="rounded-xl border border-advertencia-300 bg-advertencia-50 p-5 space-y-2">
              <h3 className="text-sm font-semibold text-advertencia-800">Superas el tope del Nuevo RUS</h3>
              <p className="text-sm text-advertencia-700">
                Con ingresos de {fmtS(ingresosNum)}/mes superas el límite de {fmtS(resultado.topeCat2)}/mes de la Categoría 2. No puedes estar en el Nuevo RUS.
              </p>
              <p className="text-sm text-neutral-700">
                Opciones: cambia a <strong>RER</strong> (tasa 1.5% ingresos netos, con contabilidad simplificada) o a <strong>RMT / RG</strong> si tienes mayores necesidades. Consulta con un contador.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-exito-200 bg-exito-50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700">Tu cuota mensual fija</h3>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-exito-600 text-white px-5 py-4 text-center min-w-[100px]">
                  <p className="text-xs opacity-80">Categoría</p>
                  <p className="text-3xl font-bold">{resultado.categoria}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-exito-700">{fmtS(resultado.cuotaMensual!)}</p>
                  <p className="text-sm text-neutral-600">por mes, cuota fija</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {fmtS(resultado.cuotaMensual! * 12)} al año en total
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-white border border-exito-200 p-3 space-y-1">
                <p className="text-xs font-semibold text-neutral-700">Recuerda:</p>
                <ul className="text-xs text-neutral-600 space-y-0.5">
                  <li>• Solo puedes emitir boletas de venta (no facturas).</li>
                  <li>• Ideal para ventas a consumidores finales: mercado, tienda, transporte.</li>
                  <li>• No puedes vender bienes o servicios gravados con ISC, joyas, combustibles, ni ser agente de retención/percepción.</li>
                  <li>• Paga la cuota en cualquier banco antes del vencimiento según tu RUC.</li>
                </ul>
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
