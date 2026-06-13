import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de Formalia conforme a la Ley N° 29733 (Ley de Protección de Datos Personales del Perú). Qué datos recopilamos, para qué y cómo ejercer tus derechos.",
  robots: { index: true, follow: true },
};

export default function PagePrivacidad() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <p className="text-sm text-neutral-500">Legal</p>
          <h1 className="mt-1 text-3xl font-bold text-neutral-900">
            Política de privacidad
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Última actualización: 13 de junio de 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-10">
        <div className="max-w-2xl space-y-10">

          {/* Conformidad legal */}
          <div className="rounded-xl border border-info-200 bg-info-50 px-5 py-4 text-sm leading-relaxed text-info-800">
            <p className="font-semibold">Conformidad legal</p>
            <p className="mt-1">
              Esta política se rige por la{" "}
              <strong>Ley N° 29733 — Ley de Protección de Datos Personales</strong>{" "}
              y su Reglamento (D.S. N° 003-2013-JUS). La autoridad competente en Perú
              es la{" "}
              <a
                href="https://www.minjus.gob.pe/privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-info-900"
              >
                ANTAIP — Ministerio de Justicia y Derechos Humanos
              </a>
              .
            </p>
          </div>

          <SeccionPrivacidad id="responsable" titulo="1. Responsable del tratamiento">
            <p>
              El responsable es <strong>FORMALIA</strong>, herramienta educativa gratuita
              para emprendedores peruanos. Contacto:{" "}
              <a href="mailto:privacidad@formalia.vercel.app" className="underline hover:opacity-75">
                privacidad@formalia.vercel.app
              </a>
              .
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="datos" titulo="2. Datos personales que recopilamos">
            <p>
              Solo recopilamos, a través del formulario de suscripción:
            </p>
            <ul className="mt-3 space-y-2">
              <ItemLista>
                <strong>Correo electrónico</strong> — obligatorio para enviar los avisos.
              </ItemLista>
              <ItemLista>
                <strong>Último dígito del RUC</strong> — opcional; solo para personalizar
                las fechas de vencimiento SUNAT según tu RUC.
              </ItemLista>
            </ul>
            <p className="mt-3">
              No recopilamos nombre, RUC completo, teléfono ni ningún otro dato.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="finalidad" titulo="3. Finalidad del tratamiento">
            <p>Tus datos se usarán exclusivamente para:</p>
            <ol className="mt-3 space-y-2 list-none">
              <ItemLista numero="1">
                Enviar recordatorios de vencimientos SUNAT (PDT 621, PLAME).
              </ItemLista>
              <ItemLista numero="2">
                Comunicar novedades tributarias relevantes (cambios en UIT, RMV, IGV,
                regímenes).
              </ItemLista>
            </ol>
            <p className="mt-3">
              No cedemos ni vendemos tus datos a terceros para fines comerciales.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="base-legal" titulo="4. Base legal del tratamiento">
            <p>
              El tratamiento se basa en el{" "}
              <strong>consentimiento libre, previo, expreso e informado</strong> del
              titular (art. 13° Ley N° 29733), otorgado al marcar el casillero de
              aceptación en el formulario de suscripción.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="conservacion" titulo="5. Plazo de conservación">
            <p>
              Mantenemos tus datos mientras la suscripción esté activa. Al darte de baja,
              los eliminamos dentro de los <strong>30 días calendario</strong> siguientes.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="destinatarios" titulo="6. Destinatarios de los datos">
            <p>
              Para el envío de correos usamos{" "}
              <strong>Formspree</strong> (formspree.io), proveedor externo (EE.UU.) que
              actúa como encargado del tratamiento. Al suscribirte aceptas su{" "}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75"
              >
                política de privacidad
              </a>
              . Ningún otro tercero accede a tus datos.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="derechos" titulo="7. Tus derechos (ARCO)">
            <p>Conforme al art. 19° de la Ley N° 29733 tienes derecho a:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { letra: "A", titulo: "Acceso", desc: "Conocer qué datos tuyos tratamos y con qué finalidad." },
                { letra: "R", titulo: "Rectificación", desc: "Corregir datos inexactos o incompletos." },
                { letra: "C", titulo: "Cancelación", desc: "Solicitar la eliminación de tus datos." },
                { letra: "O", titulo: "Oposición", desc: "Oponerte al tratamiento en situaciones previstas por ley." },
              ].map(({ letra, titulo, desc }) => (
                <div key={letra} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-marca-100 text-sm font-bold text-marca-800">
                    {letra}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{titulo}</p>
                    <p className="mt-0.5 text-xs text-neutral-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="ejercer-derechos" titulo="8. Cómo ejercer tus derechos">
            <p>
              Escribe a{" "}
              <a href="mailto:privacidad@formalia.vercel.app" className="underline hover:opacity-75">
                privacidad@formalia.vercel.app
              </a>{" "}
              indicando tu correo registrado, el derecho que deseas ejercer y una breve
              descripción. Atenderemos tu solicitud en <strong>20 días hábiles</strong>{" "}
              (art. 22° Ley N° 29733). También puedes darte de baja directamente desde
              el enlace al pie de cualquier correo que te enviemos.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="seguridad" titulo="9. Seguridad">
            <p>
              Aplicamos medidas técnicas razonables: transmisión por HTTPS y acceso
              restringido a los datos almacenados por Formspree.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="cookies" titulo="10. Cookies y analítica">
            <p>
              Formalia no instala cookies de seguimiento propias ni usa herramientas
              de analítica que recopilen datos personales identificables.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="cambios" titulo="11. Cambios a esta política">
            <p>
              Si realizamos cambios significativos, te notificaremos por correo
              electrónico. La fecha de actualización aparece siempre al inicio de esta
              página.
            </p>
          </SeccionPrivacidad>

          <SeccionPrivacidad id="contacto" titulo="12. Contacto y autoridad de control">
            <p>
              Consultas:{" "}
              <a href="mailto:privacidad@formalia.vercel.app" className="underline hover:opacity-75">
                privacidad@formalia.vercel.app
              </a>
              .
            </p>
            <p className="mt-2">
              Si consideras vulnerados tus derechos, puedes presentar queja ante la{" "}
              <strong>ANTAIP</strong> — Ministerio de Justicia y Derechos Humanos (
              <a href="https://www.minjus.gob.pe" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">
                minjus.gob.pe
              </a>
              ).
            </p>
          </SeccionPrivacidad>

          <div className="border-t border-neutral-200 pt-6">
            <Link href="/" className="text-sm text-marca-600 underline hover:text-marca-800">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeccionPrivacidad({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="text-lg font-bold text-neutral-900">{titulo}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function ItemLista({ numero, children }: { numero?: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-700">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-500">
        {numero ?? "·"}
      </span>
      <span>{children}</span>
    </li>
  );
}
