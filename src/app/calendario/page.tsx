import type { Metadata } from "next";
import { CalendarioUI } from "./CalendarioUI";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";
import { FormularioSuscripcion } from "@/components/FormularioSuscripcion";
import { CRONOGRAMA_2026 } from "@/config/cronograma-sunat";

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
            <UltimaVerificacion
              fecha={`enero ${CRONOGRAMA_2026.anio}`}
              fuente={`SUNAT · ${CRONOGRAMA_2026.baseLegal}`}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-8">
        <div className="max-w-2xl space-y-10">
          <CalendarioUI />

          {/* Suscripción */}
          <div className="rounded-xl border border-marca-100 bg-marca-50 p-5 sm:p-6">
            <FormularioSuscripcion conSubtitulo={true} tema="claro" />
          </div>
        </div>
      </div>
    </div>
  );
}
