import type { Metadata } from "next";
import { FormalizacionUI } from "./FormalizacionUI";

export const metadata: Metadata = {
  title: "Formaliza tu empresa en Perú — Guía paso a paso 2026",
  description:
    "Aprende a formalizar tu negocio en Perú: Persona Natural, EIRL, SAC, SRL o SACS digital. Checklist interactivo con costos reales de SUNAT y SUNARP (2026).",
};

export default function PageFormalizacion() {
  return (
    <>
      <div className="border-b border-amber-100 bg-amber-50 px-4 py-3">
        <p className="mx-auto max-w-contenido text-center text-xs text-amber-700">
          <strong>Información educativa.</strong> Los costos y plazos son estimados orientativos y pueden variar.
          Verifica los aranceles vigentes en SUNARP, SUNAT y tu municipalidad antes de iniciar el trámite.
        </p>
      </div>
      <FormalizacionUI />
    </>
  );
}
