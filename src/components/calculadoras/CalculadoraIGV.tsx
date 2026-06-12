"use client";

import { useState } from "react";
import { calcularIGV, calcularDebitoCredito } from "@/lib/calculadoras";
import { cn } from "@/lib/utils";

const fmtS = (n: number) =>
  `S/ ${new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;

type Modo = "simple" | "mensual";

export function CalculadoraIGV() {
  const [modo, setModo] = useState<Modo>("simple");
  const [monto, setMonto] = useState("");
  const [incluyeIGV, setIncluyeIGV] = useState(false);
  const [ventas, setVentas] = useState("");
  const [compras, setCompras] = useState("");

  const montoNum = parseFloat(monto);
  const ventasNum = parseFloat(ventas) || 0;
  const comprasNum = parseFloat(compras) || 0;

  const rSimple = !isNaN(montoNum) && montoNum > 0 ? calcularIGV(montoNum, incluyeIGV) : null;
  const rMensual = ventasNum > 0 || comprasNum > 0 ? calcularDebitoCredito(ventasNum, comprasNum) : null;

  return (
    <div className="space-y-5">
      <p className="text-sm text-neutral-600">
        Calcula el IGV de cualquier precio, o descubre cuánto IGV debes pagar a SUNAT este mes según tus ventas y compras.
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["simple", "mensual"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModo(m)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              modo === m ? "bg-marca-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {m === "simple" ? "Calcular IGV" : "Débito / Crédito mensual"}
          </button>
        ))}
      </div>

      {modo === "simple" && (
        <>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
            <fieldset>
              <legend className="text-sm font-medium text-neutral-700 mb-2">¿El precio ya incluye el IGV?</legend>
              <div className="flex gap-4">
                {[false, true].map((v) => (
                  <label key={String(v)} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="incluyeIGV"
                      checked={incluyeIGV === v}
                      onChange={() => setIncluyeIGV(v)}
                      className="accent-marca-600"
                    />
                    <span className="text-sm text-neutral-700">
                      {v ? "Sí (ya tiene IGV incluido)" : "No (precio sin IGV)"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Campo
              id="igv-monto"
              label={incluyeIGV ? "Precio con IGV (S/)" : "Precio sin IGV (S/)"}
              value={monto}
              onChange={setMonto}
              ayuda={incluyeIGV ? "El precio que ya tiene el 18% incluido" : "El precio base antes de agregar el 18%"}
            />
          </div>

          {rSimple && (
            <div className="rounded-xl border border-marca-200 bg-marca-50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700">Resultado</h3>
              <div className="grid grid-cols-3 gap-3">
                <Stat label="Precio sin IGV" valor={fmtS(rSimple.montoBase)} />
                <Stat label="IGV (18%)" valor={fmtS(rSimple.igv)} destacado />
                <Stat label="Precio con IGV" valor={fmtS(rSimple.montoTotal)} />
              </div>
              <p className="text-xs text-neutral-600">
                {incluyeIGV
                  ? `De ese precio total, ${fmtS(rSimple.igv)} corresponde al Estado (SUNAT) y ${fmtS(rSimple.montoBase)} es el valor real.`
                  : `Al precio base debes agregar ${fmtS(rSimple.igv)}. El cliente paga ${fmtS(rSimple.montoTotal)} en total.`}
              </p>
            </div>
          )}
        </>
      )}

      {modo === "mensual" && (
        <>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 space-y-4">
            <Campo
              id="igv-ventas"
              label="Ventas del mes sin IGV (S/)"
              value={ventas}
              onChange={setVentas}
              ayuda="Total de lo que vendiste este mes, antes de agregar el 18%"
            />
            <Campo
              id="igv-compras"
              label="Compras del mes con crédito fiscal, sin IGV (S/)"
              value={compras}
              onChange={setCompras}
              ayuda="Solo compras con factura electrónica — generan crédito fiscal a tu favor"
            />
          </div>

          {rMensual && (
            <div className="rounded-xl border border-marca-200 bg-marca-50 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-neutral-700">Resultado mensual</h3>
              <div className="grid grid-cols-3 gap-3">
                <Stat label="IGV de tus ventas (débito)" valor={fmtS(rMensual.debitoFiscal)} />
                <Stat label="IGV de tus compras (crédito)" valor={fmtS(rMensual.creditoFiscal)} />
                <Stat
                  label={rMensual.debesPagar ? "IGV a pagar a SUNAT" : "Saldo a tu favor"}
                  valor={fmtS(Math.abs(rMensual.saldo))}
                  tipo={rMensual.saldo > 0 ? "advertencia" : rMensual.saldo < 0 ? "exito" : "normal"}
                  destacado
                />
              </div>
              <p className="text-xs text-neutral-600">
                {rMensual.saldo > 0
                  ? `Debes pagar ${fmtS(rMensual.saldo)} a SUNAT este mes. Fórmula: débito fiscal (${fmtS(rMensual.debitoFiscal)}) − crédito fiscal (${fmtS(rMensual.creditoFiscal)}).`
                  : rMensual.saldo < 0
                  ? `Tienes ${fmtS(-rMensual.saldo)} a tu favor. Ese saldo reduce lo que pagas el mes siguiente.`
                  : "Tus ventas y compras se compensan exactamente. No pagas ni recibes nada este mes."}
              </p>
            </div>
          )}
        </>
      )}

      <Disclaimer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared UI helpers
// ---------------------------------------------------------------------------

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

function Stat({
  label, valor, destacado = false, tipo = "normal",
}: {
  label: string; valor: string; destacado?: boolean; tipo?: "normal" | "advertencia" | "exito";
}) {
  const base =
    tipo === "advertencia"
      ? "bg-advertencia-50 border-advertencia-200"
      : tipo === "exito"
      ? "bg-exito-50 border-exito-200"
      : destacado
      ? "bg-marca-100 border-marca-200"
      : "bg-white border-neutral-200";
  const text =
    tipo === "advertencia"
      ? "text-advertencia-800"
      : tipo === "exito"
      ? "text-exito-700"
      : destacado
      ? "text-marca-800"
      : "text-neutral-900";

  return (
    <div className={cn("rounded-lg border p-3", base)}>
      <p className="text-xs text-neutral-500">{label}</p>
      <p className={cn("mt-0.5 text-base font-bold", text)}>{valor}</p>
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
