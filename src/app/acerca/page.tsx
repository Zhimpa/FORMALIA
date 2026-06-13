import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de Formalia",
  description:
    "Qué es Formalia, qué NO es, cómo verificamos la información que publicamos y cómo contactarnos. Herramienta educativa gratuita para emprendedores peruanos.",
};

export default function PageAcerca() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-contenido px-4 py-10 sm:py-14">
          <p className="text-sm font-medium text-marca-600">Sobre nosotros</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Acerca de Formalia
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
            Una herramienta educativa gratuita que explica, en lenguaje simple, todo
            lo que un emprendedor peruano necesita saber para formalizarse y entender
            sus obligaciones tributarias.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Columna izquierda */}
          <div className="space-y-12">

            {/* Qué es */}
            <section>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-acento-100">
                  <IconoCheck className="h-5 w-5 text-acento-600" />
                </span>
                <h2 className="text-xl font-bold text-neutral-900">Qué es Formalia</h2>
              </div>
              <div className="mt-4 space-y-3 pl-12 text-sm leading-relaxed text-neutral-700">
                <p>
                  Formalia es una herramienta web <strong>gratuita y de acceso libre</strong> que
                  reúne la información más importante sobre formalización, régimen tributario y
                  contabilidad básica para emprendedores peruanos.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Explicamos qué régimen tributario le conviene a tu negocio con un wizard de 4 preguntas.",
                    "Te guiamos paso a paso por el proceso de formalización (RUC, SUNARP, licencia de funcionamiento).",
                    "Ponemos a tu disposición calculadoras de IGV, Impuesto a la Renta, costo laboral y punto de equilibrio.",
                    "Mantenemos un glosario y artículos en lenguaje simple sobre términos y procesos tributarios.",
                    "Publicamos el calendario de vencimientos SUNAT 2026 filtrado por el último dígito de tu RUC.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <IconoCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-acento-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Qué NO es */}
            <section>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-peligro-100">
                  <IconoX className="h-5 w-5 text-peligro-600" />
                </span>
                <h2 className="text-xl font-bold text-neutral-900">Qué NO es Formalia</h2>
              </div>
              <div className="mt-4 space-y-3 pl-12 text-sm leading-relaxed text-neutral-700">
                <p>
                  Para usar Formalia con confianza, es importante entender sus límites:
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      titulo: "No somos SUNAT ni ninguna entidad del Estado.",
                      detalle:
                        "No tenemos afiliación con SUNAT, MEF, SUNARP, MTPE ni ningún organismo gubernamental. Los trámites oficiales se realizan directamente en sus portales.",
                    },
                    {
                      titulo: "No somos un estudio contable ni jurídico.",
                      detalle:
                        "No brindamos asesoría tributaria, contable ni legal personalizada. Nuestra información es orientativa. Para situaciones específicas de tu negocio, consulta con un contador público colegiado o un abogado.",
                    },
                    {
                      titulo: "No cobramos por nada.",
                      detalle:
                        "Formalia es 100% gratuita. Nunca te pediremos pago por usar las herramientas, ver el contenido ni suscribirte al boletín.",
                    },
                    {
                      titulo: "No pedimos datos para hacer trámites.",
                      detalle:
                        "Nunca te pediremos tu RUC completo, DNI, contraseña SOL ni ningún dato sensible. Solo pedimos tu correo (opcional) para el boletín, y el último dígito de tu RUC para el calendario.",
                    },
                    {
                      titulo: "No somos responsables de decisiones tributarias.",
                      detalle:
                        "La información publicada tiene fines estrictamente educativos. Las normas cambian y Formalia no garantiza que toda la información esté actualizada al momento exacto de tu consulta.",
                    },
                  ].map((item) => (
                    <li key={item.titulo} className="flex items-start gap-2.5">
                      <IconoX className="mt-0.5 h-4 w-4 flex-shrink-0 text-peligro-500" />
                      <div>
                        <span className="font-semibold text-neutral-800">{item.titulo}</span>
                        <span className="block mt-0.5 text-neutral-600">{item.detalle}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Columna derecha */}
          <div className="space-y-12">

            {/* Cómo verificamos */}
            <section>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-info-100">
                  <IconoInfo className="h-5 w-5 text-info-600" />
                </span>
                <h2 className="text-xl font-bold text-neutral-900">Cómo verificamos la información</h2>
              </div>
              <div className="mt-4 space-y-4 pl-12 text-sm leading-relaxed text-neutral-700">
                <p>
                  Toda la información normativa de Formalia proviene de fuentes
                  oficiales y se documenta con referencia explícita:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      fuente: "SUNAT",
                      url: "https://www.sunat.gob.pe",
                      desc: "Portal oficial para tasas, regímenes, cronogramas y resoluciones de superintendencia.",
                    },
                    {
                      fuente: "MEF",
                      url: "https://www.mef.gob.pe",
                      desc: "Decretos supremos que fijan la UIT y otras tasas fiscales.",
                    },
                    {
                      fuente: "SUNARP",
                      url: "https://www.sunarp.gob.pe",
                      desc: "Aranceles y procedimientos de registro de personas jurídicas.",
                    },
                    {
                      fuente: "MTPE",
                      url: "https://www.gob.pe/mtpe",
                      desc: "Remuneración Mínima Vital y régimen laboral MYPE.",
                    },
                    {
                      fuente: "MIDIS / SISFOH",
                      url: "https://www.gob.pe/sisfoh",
                      desc: "Criterios de programas sociales y clasificación socioeconómica.",
                    },
                  ].map((f) => (
                    <div key={f.fuente} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-info-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-info-500" />
                      </span>
                      <div>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-neutral-800 underline hover:text-marca-700"
                        >
                          {f.fuente}
                        </a>
                        <span className="ml-1.5 text-neutral-600">— {f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="rounded-lg border border-advertencia-200 bg-advertencia-50 px-4 py-3 text-advertencia-800">
                  <strong>Fecha de verificación:</strong> Cada página y calculadora
                  muestra la fecha en que los datos fueron verificados con las fuentes
                  oficiales. Si detectas un dato desactualizado, avísanos.
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section id="contacto">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                  <IconoCorreo className="h-5 w-5 text-neutral-600" />
                </span>
                <h2 className="text-xl font-bold text-neutral-900">Cómo contactarnos</h2>
              </div>
              <div className="mt-4 space-y-4 pl-12 text-sm leading-relaxed text-neutral-700">
                <p>
                  Puedes escribirnos para:
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Reportar un dato desactualizado o incorrecto",
                    "Solicitar el ejercicio de tus derechos ARCO (ver Política de privacidad)",
                    "Sugerir un tema para el glosario o los artículos",
                    "Cualquier otra consulta sobre el sitio",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <p className="font-semibold text-neutral-800">Correo de contacto</p>
                  <a
                    href="mailto:contacto@formalia.vercel.app"
                    className="mt-1 block text-marca-600 underline hover:text-marca-800"
                  >
                    contacto@formalia.vercel.app
                  </a>
                  <p className="mt-2 text-xs text-neutral-500">
                    Respondemos en un plazo máximo de 5 días hábiles.
                  </p>
                </div>
                <p className="text-xs text-neutral-500">
                  Para temas de privacidad y protección de datos:{" "}
                  <a
                    href="mailto:privacidad@formalia.vercel.app"
                    className="underline hover:opacity-75"
                  >
                    privacidad@formalia.vercel.app
                  </a>
                  . Consulta también nuestra{" "}
                  <Link href="/privacidad" className="underline hover:opacity-75">
                    Política de privacidad
                  </Link>
                  .
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Iconos inline
// ---------------------------------------------------------------------------

function IconoCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconoX({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconoInfo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function IconoCorreo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
