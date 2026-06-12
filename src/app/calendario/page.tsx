import type { Metadata } from "next";
import { CalendarioUI } from "./CalendarioUI";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";

export const metadata: Metadata = {
  title: "Calendario de vencimientos SUNAT 2026",
  description:
    "Consulta tus fechas de declaración mensual según el último dígito de tu RUC. PDT 621 (IGV + Renta) y PLAME. Cronograma SUNAT 2026.",
};

export default function PageCalendario() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-900">Calendario de vencimientos</h1>
          <p className="mt-2 text-neutral-500">
            Cronograma SUNAT 2026 · Selecciona el último dígito de tu RUC para ver tus fechas de
            declaración mensual.
          </p>
          <div className="mt-4">
            <UltimaVerificacion fecha="enero 2026" fuente="SUNAT (R.S. 000227-2025/SUNAT)" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-8">
        <div className="max-w-2xl">
          <CalendarioUI />
        </div>
      </div>
    </div>
  );
}
