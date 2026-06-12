import type { Metadata } from "next";
import { TERMINOS } from "@/lib/glosario";
import { GlosarioUI } from "./GlosarioUI";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";

export const metadata: Metadata = {
  title: "Glosario contable y tributario — Perú 2026",
  description:
    "Más de 60 términos de contabilidad y tributación en lenguaje simple: IGV, UIT, CTS, SIRE, crédito fiscal, devengado y más. Con ejemplos en soles.",
};

export default function PageGlosario() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-900">Glosario</h1>
          <p className="mt-2 text-neutral-500">
            {TERMINOS.length} términos de contabilidad y tributación peruana, en lenguaje simple. Busca cualquier término para ver su definición y un ejemplo práctico.
          </p>
          <div className="mt-4">
            <UltimaVerificacion fecha="junio 2026" fuente="SUNAT / MEF / MTPE" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-8">
        <div className="max-w-2xl">
          <GlosarioUI />
        </div>
      </div>
    </div>
  );
}
