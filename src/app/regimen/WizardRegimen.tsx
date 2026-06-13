"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import {
  PREGUNTAS,
  calcularResultado,
  nombreRegimen,
  wizardCompleto,
  type Respuestas,
  type RegimeId,
  type ResultadoWizard,
} from "@/lib/wizard-regimen";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";
import { FormularioSuscripcion } from "@/components/FormularioSuscripcion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export function WizardRegimen() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});

  const enResultado = paso >= PREGUNTAS.length;

  // useMemo evita recalcular el resultado en cada render — solo recalcula cuando respuestas cambia
  const resultado = useMemo(
    () => (enResultado && wizardCompleto(respuestas) ? calcularResultado(respuestas) : null),
    [enResultado, respuestas],
  );

  // useCallback sin dependencias: usa actualizaciones funcionales para no capturar respuestas en el closure
  const seleccionar = useCallback((preguntaId: keyof Respuestas, valor: string) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor as never }));
    setPaso((p) => p + 1);
  }, []);

  const retroceder = () => setPaso((p) => Math.max(0, p - 1));

  const reiniciar = () => {
    track("wizard_reinicio");
    setRespuestas({});
    setPaso(0);
  };

  // ── Analítica de funnel ────────────────────────────────────────────────────
  // Inicio del wizard (una sola vez al montar)
  useEffect(() => { track("wizard_inicio"); }, []);

  // Avance por pasos: registra qué pregunta se acaba de responder.
  // Solo trackea avances (no retrocesos) para calcular abandonos correctamente.
  const pasoAnterior = useRef(-1);
  useEffect(() => {
    if (paso > 0 && paso > pasoAnterior.current) {
      const pregunta = PREGUNTAS[paso - 1];
      if (pregunta) {
        track("wizard_paso", {
          paso,                          // 1–4
          total: PREGUNTAS.length,       // siempre 4
          pregunta: pregunta.id,         // id de la pregunta respondida
        });
      }
    }
    pasoAnterior.current = paso;
  }, [paso]);

  // Resultado alcanzado
  useEffect(() => {
    if (resultado) {
      track("wizard_resultado", {
        regimen: resultado.regimenRecomendado,
        alternativo: resultado.regimenAlternativo ?? "ninguno",
      });
    }
  }, [resultado]);

  return (
    <div className="contenedor py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Título */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            ¿Qué régimen tributario me conviene?
          </h1>
          <p className="mt-2 text-neutral-600">
            Responde 4 preguntas y te diremos qué régimen es mejor para tu negocio.
          </p>
        </div>

        {enResultado && resultado ? (
          <Resultado resultado={resultado} onReiniciar={reiniciar} />
        ) : (
          <PreguntaActual
            paso={paso}
            respuestas={respuestas}
            onSeleccionar={seleccionar}
            onRetroceder={retroceder}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pantalla de pregunta
// ---------------------------------------------------------------------------

interface PreguntaActualProps {
  paso: number;
  respuestas: Respuestas;
  onSeleccionar: (id: keyof Respuestas, valor: string) => void;
  onRetroceder: () => void;
}

function PreguntaActual({ paso, respuestas, onSeleccionar, onRetroceder }: PreguntaActualProps) {
  const pregunta = PREGUNTAS[paso];
  if (!pregunta) return null;

  const valorActual = respuestas[pregunta.id];
  const totalPasos = PREGUNTAS.length;
  const progreso = Math.round((paso / totalPasos) * 100);

  return (
    <div>
      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-neutral-500">
          <span>
            Pregunta <strong className="text-neutral-700">{paso + 1}</strong> de{" "}
            <strong className="text-neutral-700">{totalPasos}</strong>
          </span>
          <span>{progreso}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
          role="progressbar"
          aria-valuenow={paso + 1}
          aria-valuemin={1}
          aria-valuemax={totalPasos}
          aria-label={`Pregunta ${paso + 1} de ${totalPasos}`}
        >
          <div
            className="h-full rounded-full bg-marca-600 transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <Card>
        <CardBody className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            {pregunta.texto}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {pregunta.ayuda}
          </p>

          {/* Opciones */}
          <div className="mt-6 space-y-3" role="group" aria-label={`Opciones para: ${pregunta.texto}`}>
            {pregunta.opciones.map((opcion) => {
              const seleccionada = valorActual === opcion.valor;
              return (
                <button
                  key={opcion.valor}
                  type="button"
                  onClick={() => onSeleccionar(pregunta.id, opcion.valor)}
                  className={cn(
                    "w-full rounded-xl border-2 px-5 py-4 text-left transition-all duration-150",
                    "hover:border-marca-400 hover:bg-marca-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2",
                    seleccionada
                      ? "border-marca-600 bg-marca-50"
                      : "border-neutral-200 bg-white",
                  )}
                  aria-pressed={seleccionada}
                >
                  <div className="flex items-start gap-4">
                    {/* Indicador circular */}
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        seleccionada
                          ? "border-marca-600 bg-marca-600"
                          : "border-neutral-300 bg-white",
                      )}
                      aria-hidden="true"
                    >
                      {seleccionada && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28 2.28L4.5 8.06 1.72 5.28a.75.75 0 00-1.06 1.06l3.34 3.34a.75.75 0 001.06 0l6.28-6.28a.75.75 0 00-1.06-1.06z" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <p className={cn(
                        "font-medium",
                        seleccionada ? "text-marca-800" : "text-neutral-900",
                      )}>
                        {opcion.texto}
                      </p>
                      {opcion.detalle && (
                        <p className="mt-0.5 text-sm text-neutral-500">{opcion.detalle}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between">
            {paso > 0 ? (
              <button
                type="button"
                onClick={onRetroceder}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2 rounded"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Anterior
              </button>
            ) : (
              <span />
            )}
            <p className="text-xs text-neutral-400">
              Haz clic en una opción para avanzar
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pantalla de resultado
// ---------------------------------------------------------------------------

const COLORES_REGIMEN: Record<RegimeId, { fondo: string; texto: string; borde: string; badge: string }> = {
  NRUS: {
    fondo: "bg-emerald-50",
    texto: "text-emerald-900",
    borde: "border-emerald-300",
    badge: "bg-emerald-100 text-emerald-800",
  },
  RER: {
    fondo: "bg-sky-50",
    texto: "text-sky-900",
    borde: "border-sky-300",
    badge: "bg-sky-100 text-sky-800",
  },
  RMT: {
    fondo: "bg-marca-50",
    texto: "text-marca-900",
    borde: "border-marca-300",
    badge: "bg-marca-100 text-marca-800",
  },
  RG: {
    fondo: "bg-neutral-50",
    texto: "text-neutral-900",
    borde: "border-neutral-300",
    badge: "bg-neutral-200 text-neutral-700",
  },
};

interface ResultadoProps {
  resultado: ResultadoWizard;
  onReiniciar: () => void;
}

function Resultado({ resultado, onReiniciar }: ResultadoProps) {
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const { regimenRecomendado, regimenAlternativo, explicacion, razones, advertencias, tabla } = resultado;
  const colores = COLORES_REGIMEN[regimenRecomendado];

  const handleDescargarPDF = async () => {
    setGenerandoPDF(true);
    try {
      const { generarPDFResultado } = await import("@/lib/pdf-resultado");
      await generarPDFResultado(resultado);
      track("wizard_pdf", { regimen: regimenRecomendado });
    } catch (err) {
      console.error("Error al generar PDF:", err);
    } finally {
      setGenerandoPDF(false);
    }
  };

  const handleCompartirWA = () => {
    track("wizard_whatsapp", { regimen: regimenRecomendado });
    const nombre = nombreRegimen(regimenRecomendado);
    const razonesTexto = razones
      .slice(0, 2)
      .map((r) => `- ${r}`)
      .join("\n");
    const texto = [
      `🏢 *Mi régimen tributario recomendado según Formalia:*`,
      ``,
      `✅ *${nombre}*`,
      ``,
      razonesTexto,
      ``,
      `📊 ¿Cuál te conviene? Descúbrelo gratis en 4 preguntas:`,
      `https://formalia.vercel.app/regimen`,
    ].join("\n");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="space-y-6">
      {/* Tarjeta de recomendación principal */}
      <div className={cn("rounded-2xl border-2 p-6 sm:p-8", colores.fondo, colores.borde)}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-neutral-500">Tu régimen recomendado</p>
            <h2 className={cn("mt-1 text-2xl font-bold sm:text-3xl", colores.texto)}>
              {nombreRegimen(regimenRecomendado)}
            </h2>
          </div>
          <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", colores.badge)}>
            ✓ Recomendado para ti
          </span>
        </div>
        <p className={cn("mt-4 leading-relaxed", colores.texto)}>{explicacion}</p>
      </div>

      {/* Por qué */}
      <Card>
        <CardBody>
          <h3 className="font-semibold text-neutral-900">
            ¿Por qué {nombreRegimen(regimenRecomendado)}?
          </h3>
          <ul className="mt-3 space-y-2.5">
            {razones.map((razon, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-exito-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-neutral-700">{razon}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Advertencias */}
      {advertencias.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-800">Ten en cuenta:</h3>
          {advertencias.map((adv, i) => (
            <Alert key={i} variante="advertencia">
              {adv}
            </Alert>
          ))}
        </div>
      )}

      {/* Tabla comparativa */}
      {regimenAlternativo && (
        <Card>
          <CardBody className="p-0">
            <h3 className="px-5 pt-5 pb-3 font-semibold text-neutral-900">
              {nombreRegimen(regimenRecomendado)} vs {nombreRegimen(regimenAlternativo)}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-neutral-100 bg-neutral-50">
                    <th className="px-5 py-2.5 text-left font-medium text-neutral-600 w-2/5">
                      Aspecto
                    </th>
                    <th className="px-4 py-2.5 text-left font-semibold text-marca-800 w-3/10">
                      {nombreRegimen(regimenRecomendado)}
                      <span className="ml-1.5 text-xs font-normal text-marca-600">
                        (recomendado)
                      </span>
                    </th>
                    <th className="px-4 py-2.5 text-left font-medium text-neutral-600 w-3/10">
                      {nombreRegimen(regimenAlternativo)}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {tabla.map((fila) => (
                    <tr key={fila.aspecto} className="hover:bg-neutral-50">
                      <td className="px-5 py-3 text-neutral-500 text-xs">{fila.aspecto}</td>
                      <td className="px-4 py-3 font-medium text-neutral-900">{fila.recomendado}</td>
                      <td className="px-4 py-3 text-neutral-600">{fila.alternativo ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Compartir / Descargar */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Llévate tu resultado
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDescargarPDF}
            disabled={generandoPDF}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2"
          >
            <IconoDescarga className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {generandoPDF ? "Generando…" : "Descargar mi resultado en PDF"}
          </button>
          <button
            type="button"
            onClick={handleCompartirWA}
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <IconoWhatsApp className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Compartir por WhatsApp
          </button>
        </div>
      </div>

      {/* Suscripción */}
      <div className="rounded-xl border border-marca-100 bg-marca-50 p-5 sm:p-6">
        <FormularioSuscripcion conSubtitulo={false} tema="claro" fuente="wizard" />
      </div>

      {/* Disclaimer y verificación */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-500">
        <strong className="text-neutral-600">Aviso:</strong> Esta recomendación es orientativa.
        Factores como el tipo exacto de actividad, estructura societaria o situación tributaria
        previa pueden cambiar el análisis. Consulta con un contador público colegiado antes de
        inscribirte.
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UltimaVerificacion fecha="junio 2026" fuente="SUNAT / MEF / D.Leg. 937, 968, 1269" />
        <div className="flex flex-wrap gap-3">
          <Button variante="secundario" tamaño="sm" onClick={onReiniciar}>
            ↺ Volver a empezar
          </Button>
          <Button variante="primario" tamaño="sm" href="/formalizacion">
            Siguiente: Formaliza tu empresa →
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Iconos para compartir
// ---------------------------------------------------------------------------

function IconoDescarga({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
