import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UIT, RMV, IGV as IGV_PARAM, RMT, TASAS_IR, LIBROS_CONTABLES } from "@/config/parametros-peru";
import { Tooltip } from "@/components/ui/Tooltip";
import { UltimaVerificacion } from "@/components/UltimaVerificacion";

export const metadata: Metadata = {
  title: "Formalia — Formaliza tu negocio y entiende tus impuestos",
  description:
    "Herramientas gratuitas para emprendedores peruanos: elige tu régimen tributario (NRUS, RMT, RG), calcula IGV y planilla, aprende contabilidad y formaliza tu empresa paso a paso. UIT 2026: S/ 5,500.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Formalia — Tu aliado para crecer",
    description:
      "Herramientas gratuitas para emprendedores peruanos: régimen tributario, calculadoras, formalización empresarial y glosario contable. Actualizado 2026.",
    locale: "es_PE",
    type: "website",
    siteName: "Formalia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formalia — Tu aliado para crecer",
    description: "Herramientas gratuitas para emprendedores peruanos. UIT 2026: S/ 5,500.",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Formalia",
  alternateName: "Formalia — Tu aliado para crecer",
  url: "https://formalia.pe",
  description: "Herramientas de contabilidad, formalización y tributación para emprendedores peruanos",
  applicationCategory: "BusinessApplication",
  inLanguage: "es-PE",
  offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
  operatingSystem: "Web",
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type IconNombre = "regimen" | "formalizacion" | "calculadoras" | "aprende" | "glosario" | "calendario";

interface Herramienta {
  href: string;
  icono: IconNombre;
  titulo: string;
  desc: React.ReactNode;
  iconoBg: string;
  iconoColor: string;
}

interface PasoPerfil { href: string; texto: string; }
interface Perfil {
  id: string; titulo: string; subtitulo: string; descripcion: string;
  borderColor: string; badgeClases: string; chevronColor: string; pasos: PasoPerfil[];
}

const T = {
  IGV:  <Tooltip contenido="Impuesto General a las Ventas. Tasa del 18% sobre el precio de venta que debes declarar mensualmente a SUNAT.">IGV</Tooltip>,
  UIT:  <Tooltip contenido="Unidad Impositiva Tributaria. Valor base para calcular multas, impuestos y beneficios. En 2026: S/ 5,500.">UIT</Tooltip>,
  NRUS: <Tooltip contenido="Nuevo Régimen Único Simplificado. Para negocios pequeños con ingresos hasta S/ 8,000/mes. Paga una cuota fija mensual.">NRUS</Tooltip>,
  RER:  <Tooltip contenido="Régimen Especial de Renta. Pago fijo de 1.5% sobre ingresos netos mensuales. Tope: S/ 525,000 al año.">RER</Tooltip>,
  RMT:  <Tooltip contenido="Régimen MYPE Tributario. IR al 10% hasta 15 UIT de utilidad; 29.5% por el exceso. Para ingresos hasta 1,700 UIT anuales.">RMT</Tooltip>,
  CTS:  <Tooltip contenido="Compensación por Tiempo de Servicios. Beneficio laboral equivalente a ~1 sueldo por año, depositado en mayo y noviembre.">CTS</Tooltip>,
  SIRE: <Tooltip contenido="Sistema Integrado de Registros Electrónicos. Plataforma de SUNAT para llevar los registros de compras y ventas de forma digital.">SIRE</Tooltip>,
  RUC:  <Tooltip contenido="Registro Único de Contribuyentes. Número de 11 dígitos que identifica a tu empresa ante SUNAT. Es gratuito y obligatorio.">RUC</Tooltip>,
};

const HERRAMIENTAS: Herramienta[] = [
  { href: "/regimen",      icono: "regimen",      titulo: "¿Qué régimen tributario me conviene?", desc: <>Wizard de 4 preguntas: {T.NRUS}, {T.RER}, {T.RMT} o Régimen General.</>,               iconoBg: "bg-marca-100",       iconoColor: "text-marca-700"       },
  { href: "/formalizacion",icono: "formalizacion",titulo: "Formaliza tu empresa paso a paso",      desc: <>De emprendedor sin {T.RUC} a empresa con comprobantes electrónicos.</>,                 iconoBg: "bg-acento-100",      iconoColor: "text-acento-700"      },
  { href: "/calculadoras", icono: "calculadoras", titulo: "Calculadoras tributarias y laborales",  desc: <>{T.IGV}, costo laboral, punto de equilibrio, renta anual y {T.NRUS}.</>,               iconoBg: "bg-advertencia-100", iconoColor: "text-advertencia-700" },
  { href: "/aprende",      icono: "aprende",      titulo: "Aprende contabilidad",                  desc: <>11 artículos en 3 niveles: ecuación contable, {T.SIRE}, ratios y cierre.</>,            iconoBg: "bg-info-100",        iconoColor: "text-info-700"        },
  { href: "/glosario",     icono: "glosario",     titulo: "Glosario contable y tributario",        desc: <>Más de 65 términos: {T.IGV}, {T.UIT}, {T.CTS}, {T.SIRE}, crédito fiscal y más.</>,     iconoBg: "bg-peligro-100",     iconoColor: "text-peligro-700"     },
  { href: "/calendario",   icono: "calendario",   titulo: "Calendario de vencimientos SUNAT",      desc: <>Fechas de declaración mensual por dígito de {T.RUC}. Cronograma 2026.</>,               iconoBg: "bg-neutral-200",     iconoColor: "text-neutral-700"     },
];

const PERFILES: Perfil[] = [
  {
    id: "informal", titulo: "Emprendedor informal", subtitulo: "Quiero formalizarme",
    descripcion: "Tienes un negocio sin RUC o recién empezando y quieres operar legalmente, emitir facturas y evitar multas de SUNAT.",
    borderColor: "border-acento-200", badgeClases: "bg-acento-100 text-acento-800", chevronColor: "text-acento-600",
    pasos: [
      { href: "/regimen",      texto: "Descubre qué régimen tributario te conviene" },
      { href: "/formalizacion",texto: "Guía para crear tu empresa paso a paso" },
      { href: "/calculadoras", texto: "Calcula cuánto pagarás de impuestos" },
    ],
  },
  {
    id: "mype", titulo: "MYPE formal", subtitulo: "Quiero optimizar mis obligaciones",
    descripcion: "Ya tienes RUC y declaras mensualmente. Quieres cumplir sin errores, calcular bien tu IGV y no pagar de más.",
    borderColor: "border-marca-200", badgeClases: "bg-marca-100 text-marca-800", chevronColor: "text-marca-600",
    pasos: [
      { href: "/calendario",   texto: "Ver mis fechas de vencimiento SUNAT 2026" },
      { href: "/calculadoras", texto: "Calcular IGV, planilla y punto de equilibrio" },
      { href: "/aprende",      texto: "Aprender sobre SIRE y facturación electrónica" },
      { href: "/glosario",     texto: "Consultar términos contables y tributarios" },
    ],
  },
  {
    id: "contador", titulo: "Contador o estudiante", subtitulo: "Quiero profundizar",
    descripcion: "Estudias contabilidad o la ejerces. Buscas contenido técnico con ejemplos prácticos peruanos en soles.",
    borderColor: "border-advertencia-200", badgeClases: "bg-advertencia-100 text-advertencia-800", chevronColor: "text-advertencia-700",
    pasos: [
      { href: "/aprende",      texto: "Artículos de contabilidad: ratios, costos, cierre" },
      { href: "/glosario",     texto: "Glosario técnico con 65+ términos" },
      { href: "/calculadoras", texto: "Calculadoras para ejercicios prácticos" },
    ],
  },
];

const STATS = [
  { num: "5",    label: "Calculadoras", desc: "tributarias y laborales" },
  { num: "65+",  label: "Términos",     desc: "en el glosario contable" },
  { num: "11",   label: "Artículos",    desc: "de contabilidad peruana" },
  { num: "100%", label: "Gratuito",     desc: "sin registro requerido"  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Inicio() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeccionHero />
      <SeccionFuentesOficiales />
      <SeccionStats />
      <SeccionHerramientas />
      <SeccionPerfiles />
      <SeccionCTAFinal />
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero — two-column: text left + mock UI right
// ---------------------------------------------------------------------------

function SeccionHero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden bg-marca-900">
      {/* Decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-marca-800/60" />
        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-marca-800/30" />
        <div className="absolute right-[5%] top-[10%] h-72 w-72 rounded-full bg-acento-500/8 blur-3xl" />
      </div>

      <div className="contenedor relative py-14 sm:py-18 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px]">

          {/* ---- Left: Text ---- */}
          <div>
            {/* Tagline */}
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-acento-400">
              <span aria-hidden="true" className="h-px w-8 bg-acento-500" />
              Tu aliado para crecer.
            </p>

            {/* H1 */}
            <h1
              id="hero-titulo"
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
            >
              Formaliza tu negocio.{" "}
              <span className="text-acento-400">Entiende tus números.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-marca-200 sm:text-lg">
              Herramientas gratuitas diseñadas para la realidad tributaria peruana:
              elige tu régimen, calcula impuestos y planilla, y formaliza tu empresa
              paso a paso.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/regimen"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-acento-500 px-7 py-3.5 text-base font-semibold text-white no-underline shadow-lg transition-all hover:bg-acento-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento-400 focus-visible:ring-offset-2 focus-visible:ring-offset-marca-900"
              >
                Elige tu régimen tributario
                <IconoFlechaDerecha className="h-5 w-5" />
              </Link>
              <Link
                href="/formalizacion"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-base font-semibold text-white no-underline transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-marca-900"
              >
                Formaliza tu empresa
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-marca-400">
              <span className="flex items-center gap-1.5">
                <span className="text-acento-500" aria-hidden="true">✓</span>
                Sin registro
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-acento-500" aria-hidden="true">✓</span>
                100% gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-acento-500" aria-hidden="true">✓</span>
                Actualizado 2026
              </span>
            </div>

            {/* Última verificación */}
            <div className="mt-5">
              <UltimaVerificacion fecha="junio 2026" fuente="SUNAT / MEF / MTPE" className="border-white/20 bg-white/10 text-marca-200" />
            </div>

            {/* Disclaimer */}
            <p className="mt-3 text-xs text-marca-500">
              Información con fines educativos. No constituye asesoría tributaria ni legal.
              Consulta con un contador público colegiado para decisiones específicas.
            </p>
          </div>

          {/* ---- Right: Mock UI ---- */}
          <div className="hidden lg:block">
            <MockHeroUI />
          </div>
        </div>
      </div>
    </section>
  );
}

function MockHeroUI() {
  return (
    <div className="relative">
      {/* Main card */}
      <div className="relative rounded-2xl border border-white/15 bg-marca-800/70 p-6 shadow-2xl ring-1 ring-inset ring-white/10 backdrop-blur">
        {/* Card header */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-marca-400">
            Resultado del wizard
          </p>
          <span className="rounded-full bg-acento-500/20 px-2.5 py-1 text-xs font-semibold text-acento-300">
            ✓ Recomendado
          </span>
        </div>

        {/* Regime result */}
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-acento-500/15 text-acento-400">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-12.5 0-.372 1.515m2.062 8.43" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-white">Régimen MYPE Tributario</p>
            <p className="text-xs leading-snug text-acento-400">
              IR anual: {TASAS_IR.rmt.tramoHasta15UIT.valor}% hasta 15 UIT (S/ {TASAS_IR.rmt.limite15UITEnSoles.valor.toLocaleString("es-PE")} en 2026); {TASAS_IR.rmt.tramoExceso15UIT.valor}% por el exceso
            </p>
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-2.5" aria-label="Características del régimen">
          {[
            `Hasta S/ ${(RMT.topeIngresosAnual.valor / 1_000_000).toFixed(2).replace(".", ",")}M de ingresos anuales`,
            `Pago a cuenta mensual: ${TASAS_IR.pagoACuentaMinimo.valor}%`,
            `3 libros contables (hasta ${LIBROS_CONTABLES.tramo1.topeUIT.valor} UIT de ingresos)`,
            "Emite facturas y boletas electrónicas",
          ].map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-marca-200">
              <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-acento-500/20 text-center text-xs leading-4 text-acento-400" aria-hidden="true">✓</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Simulation box */}
        <div className="mt-5 rounded-xl border border-acento-500/25 bg-acento-500/10 p-3.5">
          <p className="mb-2 text-xs font-medium text-marca-400">Simulación · Utilidad anual S/ 80,000</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-marca-200">Impuesto a la Renta:</span>
            <span className="text-base font-bold text-acento-300">S/ 8,000</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-marca-500">vs. Régimen General</span>
            <span className="text-xs font-semibold text-acento-400">Ahorras S/ 15,600</span>
          </div>
        </div>
      </div>

      {/* Floating card — IGV */}
      <div
        className="absolute -bottom-5 -left-6 rounded-xl border border-white/10 bg-marca-700 px-4 py-3 shadow-xl"
        aria-hidden="true"
      >
        <p className="text-xs text-marca-400">IGV neto (mayo)</p>
        <p className="text-xl font-bold text-white">S/ 1,620</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-acento-400">
          <span>↑</span> Calculado al instante
        </p>
      </div>

      {/* Floating badge — vencimiento */}
      <div
        className="absolute -right-4 top-6 rounded-xl border border-white/10 bg-marca-700 px-3 py-2.5 shadow-xl"
        aria-hidden="true"
      >
        <p className="text-xs font-semibold text-acento-300">Vence 12/06/2026</p>
        <p className="text-xs text-marca-400">Dígito RUC: 3</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fuentes oficiales strip — "trusted by" equivalent
// ---------------------------------------------------------------------------

function SeccionFuentesOficiales() {
  const orgs = ["SUNAT", "SUNARP", "MTPE", "INDECOPI", "MEF", "ESSALUD"];
  return (
    <div className="border-b border-neutral-100 bg-white py-5">
      <div className="contenedor">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Información oficial verificada en fuentes del Estado peruano
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {orgs.map((org) => (
            <span key={org} className="text-sm font-bold text-neutral-300 sm:text-base">
              {org}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats strip
// ---------------------------------------------------------------------------

function SeccionStats() {
  return (
    <section aria-label="Estadísticas de Formalia" className="bg-white py-12 sm:py-16">
      <div className="contenedor">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center">
              <dt className="text-4xl font-bold text-marca-700 sm:text-5xl">{s.num}</dt>
              <dd className="mt-1 text-sm font-semibold text-neutral-700">{s.label}</dd>
              <dd className="text-xs text-neutral-400">{s.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Herramientas grid
// ---------------------------------------------------------------------------

function SeccionHerramientas() {
  return (
    <section aria-labelledby="herramientas-titulo" className="border-t border-neutral-100 bg-neutral-50 py-14 sm:py-20">
      <div className="contenedor">
        <header className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-acento-600">Herramientas</p>
          <h2 id="herramientas-titulo" className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="mt-3 text-neutral-600">
            Herramientas gratuitas diseñadas para la realidad tributaria y contable peruana.
          </p>
        </header>

        <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HERRAMIENTAS.map((h) => (
            <li key={h.href}>
              <Link
                href={h.href}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 no-underline shadow-card transition-all hover:border-marca-200 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marca-600 focus-visible:ring-offset-2"
              >
                <div
                  aria-hidden="true"
                  className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-xl", h.iconoBg)}
                >
                  <IconoHerramienta nombre={h.icono} className={cn("h-6 w-6", h.iconoColor)} />
                </div>
                <h3 className="text-base font-semibold leading-snug text-neutral-900">{h.titulo}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{h.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-marca-600">
                  <span>Ir a la herramienta</span>
                  <IconoFlechaDerecha className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Profiles — "¿Por dónde empiezo?"
// ---------------------------------------------------------------------------

function SeccionPerfiles() {
  return (
    <section aria-labelledby="perfiles-titulo" className="bg-white py-14 sm:py-20">
      <div className="contenedor">
        <header className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-acento-600">Tu punto de partida</p>
          <h2 id="perfiles-titulo" className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            ¿Por dónde empiezo?
          </h2>
          <p className="mt-3 text-neutral-600">
            Según tu situación, aquí tienes el camino más directo hacia tus objetivos.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {PERFILES.map((perfil) => (
            <article
              key={perfil.id}
              aria-labelledby={`perfil-${perfil.id}-titulo`}
              className={cn("flex flex-col rounded-2xl border-2 bg-white p-6 shadow-card", perfil.borderColor)}
            >
              <span className={cn("mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold", perfil.badgeClases)}>
                {perfil.subtitulo}
              </span>
              <h3 id={`perfil-${perfil.id}-titulo`} className="text-lg font-bold text-neutral-900">
                {perfil.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{perfil.descripcion}</p>
              <ul role="list" className="mt-5 flex-1 space-y-2.5">
                {perfil.pasos.map((paso) => (
                  <li key={paso.href}>
                    <Link
                      href={paso.href}
                      className="group flex items-start gap-2 text-sm text-neutral-700 no-underline hover:text-marca-700"
                    >
                      <IconoChevronDerecha className={cn("mt-0.5 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5", perfil.chevronColor)} />
                      {paso.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bottom CTA — full-width dark section
// ---------------------------------------------------------------------------

function SeccionCTAFinal() {
  return (
    <section aria-labelledby="cta-titulo" className="relative overflow-hidden bg-marca-900 py-16 sm:py-20">
      {/* Decorative emerald glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[30%] top-0 h-64 w-64 rounded-full bg-acento-500/10 blur-3xl" />
        <div className="absolute right-[20%] bottom-0 h-48 w-48 rounded-full bg-acento-500/8 blur-2xl" />
      </div>

      <div className="contenedor relative text-center">
        {/* Tagline */}
        <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold text-acento-400">
          <span aria-hidden="true" className="h-px w-8 bg-acento-500" />
          Formalia · Tu aliado para crecer.
          <span aria-hidden="true" className="h-px w-8 bg-acento-500" />
        </p>

        <h2 id="cta-titulo" className="text-3xl font-bold text-white sm:text-4xl">
          Da el primer paso hoy.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-marca-200">
          Formal, gratis y sin complicaciones. Únete a los emprendedores peruanos que
          ya usan Formalia para entender sus números y hacer crecer sus negocios.
        </p>

        {/* Pillars */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-marca-300">
          {[
            ["✓", "Formalización simple"],
            ["↑", "Crecimiento del negocio"],
            ["◎", "Acompañamiento confiable"],
          ].map(([icono, texto]) => (
            <span key={texto} className="flex items-center gap-1.5">
              <span className="font-bold text-acento-400" aria-hidden="true">{icono}</span>
              {texto}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/regimen"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-acento-500 px-8 py-4 text-base font-bold text-white no-underline shadow-lg transition-all hover:bg-acento-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento-400 focus-visible:ring-offset-2 focus-visible:ring-offset-marca-900"
          >
            Elige tu régimen tributario
            <IconoFlechaDerecha className="h-5 w-5" />
          </Link>
          <Link
            href="/calculadoras"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-base font-semibold text-white no-underline transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-marca-900"
          >
            Ver calculadoras
          </Link>
        </div>

        {/* Normative data strip */}
        <div
          aria-label="Datos normativos de referencia 2026"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-marca-800 pt-8 text-sm"
        >
          {(
            [
              ["UIT 2026", `S/ ${UIT.valor.toLocaleString("es-PE")}`],
              ["RMV",      `S/ ${RMV.valor.toLocaleString("es-PE")}`],
              ["IGV",      `${IGV_PARAM.valor}%`],
              ["IR-RMT",   `${TASAS_IR.rmt.tramoHasta15UIT.valor}% / ${TASAS_IR.rmt.tramoExceso15UIT.valor}%`],
            ] as [string, string][]
          ).map(([label, valor]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="text-marca-500">{label}</span>
              <span className="font-semibold text-marca-200">{valor}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function IconoFlechaDerecha({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconoChevronDerecha({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function IconoHerramienta({ nombre, className }: { nombre: IconNombre; className?: string }) {
  if (nombre === "regimen") return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-12.5 0-.372 1.515m2.062 8.43" />
    </svg>
  );
  if (nombre === "formalizacion") return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
    </svg>
  );
  if (nombre === "calculadoras") return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" />
    </svg>
  );
  if (nombre === "aprende") return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
  if (nombre === "glosario") return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H18v-.008Zm0 2.25h.008v.008H18V15Z" />
    </svg>
  );
}
