import type { Metadata } from "next";
import { WizardRegimen } from "./WizardRegimen";

export const metadata: Metadata = {
  title: "¿Qué régimen tributario me conviene?",
  description:
    "Descubre en 4 preguntas cuál es el régimen tributario ideal para tu negocio en Perú: NRUS, RER, RMT o Régimen General. Basado en las reglas de SUNAT 2026.",
};

export default function PageRegimen() {
  return (
    <>
      <div className="border-b border-amber-100 bg-amber-50 px-4 py-3">
        <p className="mx-auto max-w-contenido text-center text-xs text-amber-700">
          <strong>Información educativa.</strong> Los resultados son orientativos y no constituyen asesoría tributaria.
          Consulta con un contador público colegiado para decisiones específicas sobre tu negocio.
        </p>
      </div>
      <WizardRegimen />
    </>
  );
}
