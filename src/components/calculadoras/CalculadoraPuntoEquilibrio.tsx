"use client";

import { useState } from "react";
import { calcularPuntoEquilibrio } from "@/lib/calculadoras";
import { cn } from "@/lib/utils";

const fmtS = (n: number) =>
  `S/ ${new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

const fmtN = (n: number) =>
  new Intl.NumberFormat("es-PE").format(n);

export function CalculadoraPuntoEquilibrio() {
  const [costosFijos, setCostosFijos] = useState("");
  const [costoVariable, setCostoVariable] = useState("");
  const [precio, setPrecio] = useState("");

  const cf = parseFloat(costosFijos) || 0;
  const cv = parseFloat(costoVariable) || 0;
  const p = parseFloat(precio) || 0;

  const tieneInputs = p > 0 && (cf > 0 || cv > 0 || p > 0);
  const resultado = tieneInputs && p > 0 ? calcularPuntoEquilibrio(cf, cv, p) : null;

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-600">
        Calcula cuántas unidades necesitas vender para no perder dinero. Si vendes menos de esa cantidad, estás perdiendo. Si vendes más, estás ganando.
      </p>

      <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
        <Campo
          id="pe-fijos"
          label="Costos fijos mensuales (S/)"
          value={costosFijos}
          onChange={setCostosFijos}
          ayuda="Lo que pagas igual aunque no vendas nada: alquiler, sueldos fijos, servicios"
        />
        <Campo
          id="pe-variable"
          label="Costo variable por unidad (S/)"
          value={costoVariable}
          onChange={setCostoVariable}
          ayuda="Lo que gastas para producir o comprar cada unidad: materia prima, comisiones"
        />
        <Campo
          id="pe-precio"
          label="Precio de venta por unidad (S/)"
          value={precio}
          onChange={setPrecio}
          ayuda="Lo que cobras al cliente por cada unidad"
        />
      </div>

      {resultado && (
        <>
          {resultado.esViable ? (
            <div className="rounded-xl border border-exito-200 bg-exito-50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700">Punto de equilibrio</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white border border-exito-200 p-3">
                  <p className="text-xs text-neutral-500">Unidades mínimas al mes</p>
                  <p className="text-2xl font-bold text-exito-700">{fmtN(resultado.peUnidades!)}</p>
                  <p className="text-xs text-neutral-400">unidades</p>
                </div>
                <div className="rounded-lg bg-white border border-exito-200 p-3">
                  <p className="text-xs text-neutral-500">Ventas mínimas en soles</p>
                  <p className="text-2xl font-bold text-exito-700">{fmtS(resultado.peSoles!)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-exito-100 border border-exito-200 p-3">
                  <p className="text-xs text-neutral-500">Margen de contribución</p>
                  <p className="text-base font-bold text-exito-700">
                    {fmtS(resultado.margenContribucion)} / unidad
                  </p>
                  <p className="text-xs text-neutral-400">{resultado.margenContribucionPct}% del precio</p>
                </div>
                <div className="rounded-lg bg-exito-100 border border-exito-200 p-3">
                  <p className="text-xs text-neutral-500">Costos fijos cubiertos</p>
                  <p className="text-base font-bold text-exito-700">{fmtS(cf)}</p>
                  <p className="text-xs text-neutral-400">en {fmtN(resultado.peUnidades!)} unidades</p>
                </div>
              </div>
              <div className="rounded-lg bg-white border border-exito-200 p-4 space-y-1">
                <p className="text-xs font-semibold text-neutral-700">¿Cómo leer esto?</p>
                <p className="text-xs text-neutral-600">
                  Cada vez que vendes una unidad a {fmtS(p)}, ganas {fmtS(resultado.margenContribucion)} para cubrir tus costos fijos. Con {fmtN(resultado.peUnidades!)} unidades cubres los {fmtS(cf)} de costos fijos y no pierdes ni ganas. Desde la unidad {fmtN(resultado.peUnidades! + 1)} en adelante, esos {fmtS(resultado.margenContribucion)} son utilidad pura.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-peligro-200 bg-peligro-50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-peligro-800">No es viable con estos números</h3>
              <p className="text-sm text-peligro-700">
                El precio de venta ({fmtS(p)}) es menor o igual al costo variable ({fmtS(cv)}). Margen de contribución: {fmtS(resultado.margenContribucion)}.
              </p>
              <p className="text-sm text-neutral-600">
                Para que el negocio sea rentable, el precio de venta debe ser mayor al costo de producir cada unidad. Sube el precio o reduce el costo variable.
              </p>
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
          step="0.01"
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
