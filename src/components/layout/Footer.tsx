import Link from "next/link";
import { FormularioSuscripcion } from "@/components/FormularioSuscripcion";

const enlacesNav = [
  { href: "/", label: "Inicio" },
  { href: "/regimen", label: "¿Qué régimen me conviene?" },
  { href: "/formalizacion", label: "Formaliza tu empresa" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/aprende", label: "Aprende" },
  { href: "/glosario", label: "Glosario" },
  { href: "/calendario", label: "Calendario SUNAT" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/acerca", label: "Acerca de Formalia" },
  { href: "/privacidad", label: "Privacidad" },
];

const enlacesOficiales = [
  { href: "https://www.sunat.gob.pe",   label: "SUNAT",    desc: "Portal tributario oficial" },
  { href: "https://www.gob.pe/mef",     label: "MEF",      desc: "Normativa contable y UIT" },
  { href: "https://www.sunarp.gob.pe",  label: "SUNARP",   desc: "Registro de personas jurídicas" },
  { href: "https://www.gob.pe/mtpe",    label: "MTPE",     desc: "Ministerio de Trabajo" },
  { href: "https://www.essalud.gob.pe", label: "EsSalud",  desc: "Salud de trabajadores" },
  { href: "https://indecopi.gob.pe",    label: "INDECOPI", desc: "Registro de marcas" },
];

export function Footer() {
  const anoActual = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="contenedor py-10 lg:py-14">

        {/* Franja de suscripción */}
        <div className="mb-10 rounded-xl border border-neutral-700 bg-neutral-800/60 p-6 sm:p-8 lg:flex lg:items-start lg:gap-12">
          <div className="flex-1">
            <FormularioSuscripcion conSubtitulo={true} tema="oscuro" />
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Marca y descripción */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento-400"
              aria-label="Formalia — inicio"
            >
              <span className="text-white">FORM</span>
              <span className="text-acento-400">ALIA</span>
            </Link>

            {/* Tagline */}
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-acento-400">
              <span aria-hidden="true" className="h-px w-5 bg-acento-500" />
              Tu aliado para crecer.
              <span aria-hidden="true" className="h-px w-5 bg-acento-500" />
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              Herramienta educativa gratuita para emprendedores peruanos. Formalización
              simple, crecimiento del negocio y acompañamiento confiable.
            </p>

            {/* Brand pillars — neutral-400 = 6.9:1 sobre neutral-900 ✓ AA */}
            <ul role="list" className="mt-4 space-y-1.5">
              {[
                { icon: "✓", texto: "Formalización simple" },
                { icon: "↑", texto: "Crecimiento del negocio" },
                { icon: "◎", texto: "Acompañamiento confiable" },
              ].map((p) => (
                <li key={p.texto} className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="font-bold text-acento-500" aria-hidden="true">{p.icon}</span>
                  {p.texto}
                </li>
              ))}
            </ul>

            {/* neutral-400 sobre neutral-900 = 6.9:1 ✓ */}
            <p className="mt-4 text-xs text-neutral-400">
              Datos normativos actualizados a 2026 · Verificar en{" "}
              <a
                href="https://www.sunat.gob.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 underline hover:text-white"
              >
                sunat.gob.pe
              </a>
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            {/* neutral-400 = 6.9:1 ✓ */}
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Herramientas
            </h2>
            <ul className="space-y-2.5" role="list">
              {enlacesNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acento-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Fuentes oficiales */}
          <nav aria-label="Fuentes oficiales">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Fuentes oficiales
            </h2>
            <ul className="space-y-2.5" role="list">
              {enlacesOficiales.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-neutral-400 no-underline transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acento-400"
                  >
                    {item.label}
                    <IconoEnlaceExterno />
                    <span className="sr-only">(abre en nueva pestaña)</span>
                  </a>
                  {/* neutral-400 = 6.9:1 ✓ (era neutral-600 = 2.3:1 ✗) */}
                  <p className="text-xs text-neutral-400">{item.desc}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Disclaimer — neutral-400 = 6.9:1 sobre fondo combinado ✓ */}
        <div className="mt-10 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 text-xs leading-relaxed text-neutral-400">
          <p className="font-semibold text-neutral-200">Aviso legal</p>
          <p className="mt-1">
            La información publicada en este sitio tiene carácter{" "}
            <strong className="font-semibold text-white">
              estrictamente referencial y educativo
            </strong>
            . No constituye asesoría contable, legal ni tributaria, ni reemplaza
            la consulta con un profesional habilitado (contador público colegiado o abogado).
            Los montos, tasas y plazos pueden variar por cambios normativos. Verifica
            siempre en las fuentes oficiales: SUNAT, SUNARP, MTPE e INDECOPI.
          </p>
          {/* neutral-400 = 6.9:1 ✓ (era neutral-500 = 3.4:1 ✗) */}
          <p className="mt-2 text-neutral-400">
            Referencia normativa 2026: UIT S/ 5,500 (D.S. 301-2025-EF) · RMV S/ 1,130 · IGV 18%.
          </p>
        </div>

        {/* Copyright — neutral-400 = 6.9:1 ✓ (era neutral-600 = 2.3:1 ✗) */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-400">
            © {anoActual} Formalia. Información de libre acceso.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-neutral-400">
            Hecho en{" "}
            <BanderaPeruSVG />
            {" "}Perú · Tu aliado para crecer.
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Bandera peruana inline — rojo | blanco | rojo (franjas verticales). */
function BanderaPeruSVG() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      aria-label="Bandera del Perú"
      role="img"
      className="inline-block flex-shrink-0"
    >
      <rect x="0"  y="0" width="6"  height="12" fill="#D91023" />
      <rect x="6"  y="0" width="6"  height="12" fill="#FFFFFF" />
      <rect x="12" y="0" width="6"  height="12" fill="#D91023" />
    </svg>
  );
}

function IconoEnlaceExterno() {
  return (
    <svg
      className="h-3 w-3 opacity-50 group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}
