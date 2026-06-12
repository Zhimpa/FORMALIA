import Link from "next/link";

const enlacesNav = [
  { href: "/", label: "Inicio" },
  { href: "/regimen", label: "¿Qué régimen me conviene?" },
  { href: "/formalizacion", label: "Formaliza tu empresa" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/aprende", label: "Aprende" },
  { href: "/glosario", label: "Glosario" },
  { href: "/calendario", label: "Calendario SUNAT" },
];

const enlacesOficiales = [
  { href: "https://www.sunat.gob.pe", label: "SUNAT", desc: "Portal tributario oficial" },
  { href: "https://www.sunarp.gob.pe", label: "SUNARP", desc: "Registro de personas jurídicas" },
  { href: "https://www.gob.pe/mtpe", label: "MTPE", desc: "Ministerio de Trabajo" },
  { href: "https://www.indecopi.gob.pe", label: "INDECOPI", desc: "Registro de marcas" },
];

export function Footer() {
  const anoActual = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="contenedor py-10 lg:py-14">
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

            {/* Brand pillars */}
            <ul role="list" className="mt-4 space-y-1.5">
              {[
                { icon: "✓", texto: "Formalización simple" },
                { icon: "↑", texto: "Crecimiento del negocio" },
                { icon: "◎", texto: "Acompañamiento confiable" },
              ].map((p) => (
                <li key={p.texto} className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="font-bold text-acento-500" aria-hidden="true">{p.icon}</span>
                  {p.texto}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-neutral-600">
              Datos normativos actualizados a 2026 · Verificar en{" "}
              <a
                href="https://www.sunat.gob.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 underline hover:text-neutral-300"
              >
                sunat.gob.pe
              </a>
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
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
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
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
                  <p className="text-xs text-neutral-600">{item.desc}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 text-xs leading-relaxed text-neutral-400">
          <p className="font-semibold text-neutral-300">Aviso legal</p>
          <p className="mt-1">
            La información publicada en este sitio tiene carácter{" "}
            <strong className="font-semibold text-neutral-200">
              estrictamente referencial y educativo
            </strong>
            . No constituye asesoría contable, legal ni tributaria, ni reemplaza
            la consulta con un profesional habilitado (contador público colegiado o abogado).
            Los montos, tasas y plazos pueden variar por cambios normativos. Verifica
            siempre en las fuentes oficiales: SUNAT, SUNARP, MTPE e INDECOPI.
          </p>
          <p className="mt-2 text-neutral-500">
            Referencia normativa 2026: UIT S/ 5,500 (D.S. 301-2025-EF) · RMV S/ 1,130 · IGV 18%.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-600">
            © {anoActual} Formalia. Información de libre acceso.
          </p>
          <p className="text-xs text-neutral-600">
            Hecho en Perú 🇵🇪 · Tu aliado para crecer.
          </p>
        </div>
      </div>
    </footer>
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
