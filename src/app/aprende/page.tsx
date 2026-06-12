import type { Metadata } from "next";
import { getArticulosMetadata } from "@/lib/aprende";
import { AprendeIndex } from "./AprendeIndex";

export const metadata: Metadata = {
  title: "Aprende — Guía de contabilidad y tributación en Perú 2026",
  description:
    "Artículos en tres niveles: conceptos básicos de contabilidad, IGV, facturación electrónica, SIRE, planillas, ratios financieros y cierre anual. Explicado para emprendedores y negocios peruanos.",
};

export default function PageAprende() {
  const articulos = getArticulosMetadata();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <h1 className="text-3xl font-bold text-neutral-900">Aprende</h1>
          <p className="mt-2 max-w-xl text-neutral-500">
            Guía práctica de contabilidad y tributación peruana, en lenguaje simple. Artículos en tres niveles: desde los fundamentos hasta el cierre anual.
          </p>
          {/* Level legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-exito-500" aria-hidden="true" />
              <span className="text-neutral-600">Básico — sin conocimientos previos</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-advertencia-500" aria-hidden="true" />
              <span className="text-neutral-600">Intermedio — para quienes ya operan un negocio</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-peligro-500" aria-hidden="true" />
              <span className="text-neutral-600">Avanzado — para contadores y dueños experimentados</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-contenido px-4 py-8">
        <AprendeIndex articulos={articulos} />
      </div>
    </div>
  );
}
