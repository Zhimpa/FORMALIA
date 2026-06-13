import type { Metadata } from "next";
import Link from "next/link";
import {
  UIT,
  CUOTAS_NRUS,
  TASAS_IR,
  FACTURACION_ELECTRONICA,
  RER,
  RMT,
  IGV as IGV_PARAM,
} from "@/config/parametros-peru";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas claras a las 10 preguntas más comunes sobre formalización y tributación en Perú: impuestos atrasados, costo del RUC, multas, factura electrónica y más. Fuentes oficiales incluidas.",
};

// ---------------------------------------------------------------------------
// Tipos y datos
// ---------------------------------------------------------------------------

interface FAQ {
  id: string;
  pregunta: string;
  respuesta: React.ReactNode;
  fuentes: { etiqueta: string; url?: string }[];
}

// Se calculan desde parametros-peru.ts para no hardcodear montos
const multaNoDeclarar_RG_RMT = UIT.valor; // 1 UIT — Tabla I
const multaNoDeclarar_RER = UIT.valor * 0.5; // 50% UIT — Tabla II
const multaNoDeclarar_RG_RMT_conRebaja = multaNoDeclarar_RG_RMT * 0.1; // 90% rebaja
const multaNoDeclarar_RER_conRebaja = multaNoDeclarar_RER * 0.1;
const multaFacElec_min = UIT.valor * FACTURACION_ELECTRONICA.multaNoEmitirMinimo.valor; // 0.5 UIT
const multaFacElec_max = UIT.valor * FACTURACION_ELECTRONICA.multaNoEmitirMaximo.valor; // 2 UIT

function fmt(n: number) {
  return n.toLocaleString("es-PE");
}

// ---------------------------------------------------------------------------
// Datos de las FAQ
// ---------------------------------------------------------------------------

const FAQS: FAQ[] = [
  // 1
  {
    id: "impuestos-atrasados",
    pregunta: "¿Formalizarme significa pagar impuestos atrasados?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>No.</strong> Al inscribirte en SUNAT con un RUC, tu historial tributario
          comienza desde esa fecha. SUNAT no cobra tributos por ventas o actividades
          anteriores a la inscripción, salvo que detecte operaciones formales previas no
          declaradas (por ejemplo, si emitiste boletas de negocios ajenos o facturas sin
          RUC).
        </p>
        <p>
          Para el emprendedor que trabajaba de manera informal sin emitir comprobantes,
          la formalización parte de cero. No hay deuda tributaria acumulada por el solo
          hecho de no haber estado inscrito.
        </p>
      </div>
    ),
    fuentes: [{ etiqueta: "SUNAT — Orientación al contribuyente", url: "https://www.sunat.gob.pe/orientacion" }],
  },
  // 2
  {
    id: "costo-ruc",
    pregunta: "¿Cuánto cuesta sacar el RUC?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>Nada. El trámite es completamente gratuito.</strong> Puedes inscribirte al
          RUC de dos formas:
        </p>
        <ul className="space-y-1.5 pl-1">
          <ItemFaq>
            <strong>En línea:</strong> a través del portal sunat.gob.pe con tu DNI
            y clave de RENIEC. Sin filas ni costo alguno.
          </ItemFaq>
          <ItemFaq>
            <strong>Presencialmente:</strong> en cualquier Centro de Servicios SUNAT
            a nivel nacional. Solo necesitas tu DNI vigente.
          </ItemFaq>
        </ul>
        <p>
          Si te cobran algo por esta gestión, es una persona o empresa intermediaria
          —no SUNAT. Desconfía.
        </p>
      </div>
    ),
    fuentes: [{ etiqueta: "SUNAT — Inscripción al RUC (costo: S/ 0)", url: "https://www.sunat.gob.pe" }],
  },
  // 3
  {
    id: "cuanto-pago-impuestos",
    pregunta: "¿Cuánto pagaré de impuestos al mes?",
    respuesta: (
      <div className="space-y-3">
        <p>Depende del régimen tributario en el que te inscribas:</p>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-neutral-700">Régimen</th>
                <th className="px-4 py-2.5 text-left font-semibold text-neutral-700">Pago mensual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-medium text-neutral-800">NRUS</td>
                <td className="px-4 py-3 text-neutral-700">
                  Cuota fija: <strong>S/ {fmt(CUOTAS_NRUS.categoria1.cuotaMensual.valor)}</strong>{" "}
                  (hasta S/ {fmt(CUOTAS_NRUS.categoria1.topeIngresosMensual.valor)}/mes) o{" "}
                  <strong>S/ {fmt(CUOTAS_NRUS.categoria2.cuotaMensual.valor)}</strong>{" "}
                  (hasta S/ {fmt(CUOTAS_NRUS.categoria2.topeIngresosMensual.valor)}/mes).
                  Sin IGV ni DJ anual.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-neutral-800">RER</td>
                <td className="px-4 py-3 text-neutral-700">
                  IR: <strong>{RER.descripcionPago.valor.split("+")[0].trim()}</strong> +
                  IGV <strong>{IGV_PARAM.valor}%</strong> sobre el precio de venta.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-neutral-800">RMT</td>
                <td className="px-4 py-3 text-neutral-700">
                  Pago a cuenta IR: <strong>{TASAS_IR.pagoACuentaMinimo.valor}%</strong>{" "}
                  sobre ingresos netos (hasta {TASAS_IR.pagoACuentaTopeUIT300.valor} UIT acumuladas) +
                  IGV {IGV_PARAM.valor}%. Al año, IR{" "}
                  {TASAS_IR.rmt.tramoHasta15UIT.valor}% hasta 15 UIT de utilidad neta
                  y {TASAS_IR.rmt.tramoExceso15UIT.valor}% por el exceso.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-neutral-800">RG</td>
                <td className="px-4 py-3 text-neutral-700">
                  Pago a cuenta IR: 1.5% o coeficiente + IGV {IGV_PARAM.valor}%.
                  IR anual: {TASAS_IR.rg.tasa.valor}% sobre la renta neta.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500">
          Usa la{" "}
          <Link href="/calculadoras" className="underline hover:opacity-75">
            calculadora de Impuesto a la Renta
          </Link>{" "}
          para estimar tu cargo según tus ingresos reales.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "SUNAT — D.Leg. 937 (NRUS)" },
      { etiqueta: "SUNAT — D.Leg. 968 (RER)" },
      { etiqueta: "SUNAT — D.Leg. 1269 (RMT)" },
      { etiqueta: "SUNAT — LIR D.S. 179-2004-EF (RG)" },
    ],
  },
  // 4
  {
    id: "programas-sociales",
    pregunta: "¿Pierdo programas sociales si me formalizo?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>No necesariamente.</strong> Programas como Juntos, Pensión 65 y Contigo
          evalúan la condición socioeconómica del hogar mediante el{" "}
          <strong>SISFOH</strong> (Sistema de Focalización de Hogares). El criterio es el
          nivel de vida del hogar, no si tienes RUC.
        </p>
        <p>
          Obtener un RUC <strong>no te excluye automáticamente</strong> de estos programas.
          Sin embargo, si tus ingresos aumentan de manera significativa tras la
          formalización, el SISFOH puede reclasificarte en una evaluación periódica.
        </p>
        <p>
          Antes de tomar la decisión, consulta con tu municipalidad o en el portal del
          SISFOH cuáles son los criterios exactos del programa que recibes.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "MIDIS — SISFOH", url: "https://www.gob.pe/sisfoh" },
      { etiqueta: "MIDIS — Programas sociales", url: "https://www.midis.gob.pe" },
    ],
  },
  // 5
  {
    id: "necesito-contador",
    pregunta: "¿Necesito contador desde el día 1?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>No es obligatorio al inicio</strong>, aunque sí recomendable cuando las
          operaciones se vuelven complejas. Así funciona según el régimen:
        </p>
        <ul className="space-y-2 pl-1">
          <ItemFaq>
            <strong>NRUS:</strong> no llevas libros contables. La declaración es la
            cuota mensual que pagas directamente.
          </ItemFaq>
          <ItemFaq>
            <strong>RER:</strong> llevas Registro de Ventas y Registro de Compras.
            Puedes hacerlo tú mismo con una hoja de cálculo o el portal SUNAT.
          </ItemFaq>
          <ItemFaq>
            <strong>RMT (hasta 300 UIT):</strong> 3 libros simplificados. Muchos
            emprendedores los llevan solos al inicio.
          </ItemFaq>
          <ItemFaq>
            <strong>RMT / RG (ingresos altos) o si tienes trabajadores:</strong>{" "}
            aquí un contador público colegiado es recomendable para evitar errores
            costosos en planilla, ITAN y DJ anual.
          </ItemFaq>
        </ul>
        <p>
          La declaración mensual (PDT 621 / SIRE) se hace en el portal SUNAT de forma
          gratuita, y SUNAT ofrece orientación telefónica y presencial sin costo.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "SUNAT — R.S. 234-2006/SUNAT (libros contables)" },
      { etiqueta: "SUNAT — Portal SIRE", url: "https://www.sunat.gob.pe/sire" },
    ],
  },
  // 6
  {
    id: "mes-sin-ventas",
    pregunta: "¿Qué pasa si un mes no vendo nada?",
    respuesta: (
      <div className="space-y-2">
        <p>
          En <strong>RER, RMT y Régimen General</strong>, igual debes presentar tu
          declaración mensual (PDT 621 / SIRE) dentro del plazo, marcando{" "}
          <strong>&ldquo;sin operaciones&rdquo;</strong> (declaración en cero). No presentarla es
          una infracción así no hayas vendido.
        </p>
        <p>
          Las multas por no declarar (Art. 176° numeral 1 del Código Tributario) son:
        </p>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <span className="text-neutral-500">RG / RMT (Tabla I):</span>
            <span className="font-medium text-neutral-800">1 UIT = S/ {fmt(multaNoDeclarar_RG_RMT)}</span>
            <span className="text-neutral-500">Con 90% de rebaja*:</span>
            <span className="font-medium text-exito-700">S/ {fmt(multaNoDeclarar_RG_RMT_conRebaja)}</span>
            <span className="text-neutral-500">RER (Tabla II):</span>
            <span className="font-medium text-neutral-800">50% UIT = S/ {fmt(multaNoDeclarar_RER)}</span>
            <span className="text-neutral-500">Con 90% de rebaja*:</span>
            <span className="font-medium text-exito-700">S/ {fmt(multaNoDeclarar_RER_conRebaja)}</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            * La rebaja del 90% aplica si presentas la declaración omitida{" "}
            <strong>antes de recibir notificación de SUNAT</strong>.
          </p>
        </div>
        <p>
          En <strong>NRUS</strong>, no hay declaración mensual de IR, pero sí debes pagar
          la cuota (S/ {fmt(CUOTAS_NRUS.categoria1.cuotaMensual.valor)} o S/ {fmt(CUOTAS_NRUS.categoria2.cuotaMensual.valor)}) aunque no hayas vendido.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "TUO Código Tributario — Art. 176° numeral 1" },
      { etiqueta: "SUNAT — Tabla de Infracciones y Sanciones (Tabla I y II)" },
    ],
  },
  // 7
  {
    id: "cambiar-regimen",
    pregunta: "¿Puedo cambiar de régimen después?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>Sí.</strong> Las reglas generales de cambio de régimen son:
        </p>
        <ul className="space-y-2 pl-1">
          <ItemFaq>
            <strong>NRUS → RER / RMT / RG:</strong> en cualquier mes del año, siempre que cumplas los requisitos del nuevo régimen (tipo de actividad, ingresos).
          </ItemFaq>
          <ItemFaq>
            <strong>RER / RMT → RG:</strong> en cualquier mes, ya sea voluntariamente o porque superaste el tope de ingresos.
          </ItemFaq>
          <ItemFaq>
            <strong>RG / RMT / RER → NRUS:</strong> solo en enero de cada año (o al inicio de actividades si eres nuevo contribuyente), y cumpliendo todos los requisitos del NRUS.
          </ItemFaq>
          <ItemFaq>
            <strong>Cambio automático a RG:</strong> si en RMT superas las {RMT.topeUIT?.valor ?? 1700} UIT de ingresos netos anuales, pasas al RG ese mismo ejercicio.
          </ItemFaq>
        </ul>
        <p>
          El cambio se realiza a través del portal SUNAT actualizando tu ficha RUC. Te recomendamos verificar los requisitos específicos antes de cambiar.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "SUNAT — Orientación: cambio de régimen", url: "https://www.sunat.gob.pe/orientacion" },
      { etiqueta: "D.Leg. 937 (NRUS) / D.Leg. 968 (RER) / D.Leg. 1269 (RMT)" },
    ],
  },
  // 8
  {
    id: "clave-sol",
    pregunta: "¿Qué es la clave SOL?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>SOL</strong> significa <em>Sistema de Operaciones en Línea</em>. Es tu
          contraseña para acceder al portal virtual de SUNAT (sunat.gob.pe). Con ella puedes:
        </p>
        <ul className="space-y-1.5 pl-1">
          {[
            "Declarar y pagar tus impuestos mensualmente",
            "Emitir boletas y facturas electrónicas de forma gratuita",
            "Consultar tu situación tributaria (deudas, declaraciones)",
            "Actualizar tu ficha RUC o cambiar de régimen",
            "Gestionar trámites sin ir presencialmente a SUNAT",
          ].map((item) => (
            <ItemFaq key={item}>{item}</ItemFaq>
          ))}
        </ul>
        <p>
          La clave SOL es <strong>gratuita</strong> y la obtienes al inscribirte al RUC o
          solicitándola en cualquier Centro de Servicios SUNAT con tu DNI. No la compartas
          con nadie.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "SUNAT — Portal SOL", url: "https://www.sunat.gob.pe/operaciones-en-linea" },
    ],
  },
  // 9
  {
    id: "facturacion-electronica",
    pregunta: "¿Es obligatorio facturar electrónicamente?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>Sí, para la mayoría de contribuyentes.</strong> Desde el{" "}
          <strong>1 de junio de 2026</strong>, todos los nuevos contribuyentes que se
          inscriban en <strong>RER, RMT o Régimen General</strong> son emisores electrónicos
          desde el día de su inscripción al RUC.
        </p>
        <p>
          Si ya estabas inscrito antes de esa fecha, es probable que también seas emisor
          obligado según resoluciones previas. Verifica tu situación en el portal SUNAT.
        </p>
        <p>
          La emisión electrónica es <strong>gratuita</strong> usando el Portal SUNAT
          (facturador gratuito) o la app móvil de SUNAT. También puedes usar proveedores
          privados certificados (OSE/PSE) con planes económicos.
        </p>
        <div className="rounded-lg border border-peligro-100 bg-peligro-50 px-4 py-3 text-sm">
          <p className="font-semibold text-peligro-800">Multa por no emitir comprobante electrónico:</p>
          <p className="mt-1 text-peligro-700">
            De S/ {fmt(multaFacElec_min)} (50% UIT) a S/ {fmt(multaFacElec_max)} (2 UIT),
            más posible cierre temporal del establecimiento.
          </p>
        </div>
      </div>
    ),
    fuentes: [
      { etiqueta: FACTURACION_ELECTRONICA.obligatoriedadNuevosRUC.fuente },
      { etiqueta: "SUNAT — Portal de Facturación Electrónica", url: "https://e-menu.sunat.gob.pe" },
    ],
  },
  // 10
  {
    id: "multa-no-declarar",
    pregunta: "¿Me pueden multar por no declarar?",
    respuesta: (
      <div className="space-y-2">
        <p>
          <strong>Sí.</strong> No presentar la declaración mensual dentro del plazo es
          una infracción tipificada en el <strong>Art. 176° numeral 1 del Código Tributario</strong>.
          Las multas —y sus rebajas si rectificas voluntariamente— son:
        </p>
        <div className="rounded-lg border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-neutral-700">Régimen</th>
                <th className="px-4 py-2.5 text-left font-semibold text-neutral-700">Multa base</th>
                <th className="px-4 py-2.5 text-left font-semibold text-neutral-700">Con 90% rebaja*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 text-neutral-800">RG / RMT</td>
                <td className="px-4 py-3 font-medium text-neutral-800">S/ {fmt(multaNoDeclarar_RG_RMT)} (1 UIT)</td>
                <td className="px-4 py-3 font-medium text-exito-700">S/ {fmt(multaNoDeclarar_RG_RMT_conRebaja)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-neutral-800">RER</td>
                <td className="px-4 py-3 font-medium text-neutral-800">S/ {fmt(multaNoDeclarar_RER)} (50% UIT)</td>
                <td className="px-4 py-3 font-medium text-exito-700">S/ {fmt(multaNoDeclarar_RER_conRebaja)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-600">
          * <strong>Rebaja del 90%:</strong> aplica si presentas la declaración omitida
          antes de que SUNAT te notifique. Después de notificado, la rebaja baja a 80%
          (si regularizas dentro del plazo indicado) y luego a 70%.
        </p>
        <p>
          La declaración en cero es simple: entra al portal SUNAT con tu clave SOL,
          abre el PDT 621 o SIRE, ingresa ceros y envía. No hacerlo nunca vale la pena.
        </p>
      </div>
    ),
    fuentes: [
      { etiqueta: "TUO Código Tributario — Art. 176° numeral 1" },
      { etiqueta: "SUNAT — Tabla de Infracciones y Sanciones (Tablas I y II)" },
      { etiqueta: `UIT 2026: S/ ${fmt(UIT.valor)} (${UIT.fuente})` },
    ],
  },
];

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

export default function PageFAQ() {
  return (
    <div className="min-h-screen bg-white">
      {/* Encabezado */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-contenido px-4 py-10 sm:py-14">
          <p className="text-sm font-medium text-marca-600">Ayuda</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Las 10 dudas más comunes de emprendedores que están pensando en
            formalizarse. Respuestas directas, en lenguaje simple, con fuentes oficiales.
          </p>
        </div>
      </div>

      {/* Índice rápido */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-4">
          <nav aria-label="Índice de preguntas">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Ir directamente a:
            </p>
            <div className="flex flex-wrap gap-2">
              {FAQS.map((faq, i) => (
                <a
                  key={faq.id}
                  href={`#${faq.id}`}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700 transition-colors hover:border-marca-400 hover:bg-marca-50 hover:text-marca-800"
                >
                  {i + 1}. {faq.pregunta.replace("¿", "").replace("?", "").slice(0, 40)}…
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Preguntas */}
      <div className="mx-auto max-w-contenido px-4 py-10 sm:py-14">
        <div className="max-w-3xl space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={faq.id}
              id={faq.id}
              className="group rounded-xl border border-neutral-200 bg-white transition-shadow open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-500 focus-visible:ring-offset-2 rounded-xl">
                {/* Número */}
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-marca-100 text-xs font-bold text-marca-800 mt-0.5">
                  {i + 1}
                </span>
                {/* Pregunta */}
                <span className="flex-1 text-base font-semibold text-neutral-900">
                  {faq.pregunta}
                </span>
                {/* Flecha */}
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>

              {/* Respuesta */}
              <div className="px-5 pb-5 pt-1 pl-16">
                <div className="text-sm leading-relaxed text-neutral-700">
                  {faq.respuesta}
                </div>

                {/* Fuentes */}
                {faq.fuentes.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {faq.fuentes.map((f) =>
                      f.url ? (
                        <a
                          key={f.etiqueta}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-info-200 bg-info-50 px-2.5 py-1 text-xs text-info-700 hover:bg-info-100 transition-colors"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          {f.etiqueta}
                        </a>
                      ) : (
                        <span
                          key={f.etiqueta}
                          className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-600"
                        >
                          {f.etiqueta}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-12 max-w-3xl rounded-2xl border border-marca-100 bg-marca-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-neutral-900">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Explora el glosario de términos tributarios, las calculadoras o escríbenos
            directamente.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/glosario"
              className="rounded-lg border border-marca-200 bg-white px-4 py-2 text-sm font-medium text-marca-700 transition-colors hover:bg-marca-100"
            >
              Glosario de términos
            </Link>
            <Link
              href="/calculadoras"
              className="rounded-lg border border-marca-200 bg-white px-4 py-2 text-sm font-medium text-marca-700 transition-colors hover:bg-marca-100"
            >
              Calculadoras
            </Link>
            <Link
              href="/acerca#contacto"
              className="rounded-lg bg-marca-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-marca-700"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function ItemFaq({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
