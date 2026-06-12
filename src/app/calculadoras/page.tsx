import type { Metadata } from "next";
import { CalculadorasUI } from "./CalculadorasUI";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";

export const metadata: Metadata = {
  title: "Calculadoras tributarias Perú 2026 — IGV, Costo laboral, NRUS, Impuesto a la Renta",
  description:
    "Calcula el IGV, el costo laboral real de un trabajador, el punto de equilibrio de tu negocio, el Impuesto a la Renta (RMT vs RG) y la cuota NRUS. Datos actualizados 2026.",
};

export default function PageCalculadoras() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-900">Calculadoras</h1>
          <p className="mt-2 text-neutral-500">
            Herramientas de cálculo tributario y laboral para emprendedores peruanos. Datos actualizados 2026.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <UltimaVerificacion fecha="junio 2026" fuente="SUNAT / MTPE" />
            <p className="text-xs text-neutral-400">
              Resultados orientativos. No constituyen asesoría tributaria.
            </p>
          </div>
        </div>
      </div>
      <CalculadorasUI />
    </div>
  );
}
