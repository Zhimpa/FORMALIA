import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de Formalia. Qué datos recopilamos, para qué los usamos y cómo ejercer tus derechos conforme a la Ley 29733 (Ley de Protección de Datos Personales del Perú).",
  robots: { index: true, follow: true },
};

export default function PagePrivacidad() {
  const fechaActualizacion = "13 de junio de 2026";

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-contenido px-4 py-8">
          <p className="text-sm text-neutral-500">Legal</p>
          <h1 className="mt-1 text-3xl font-bold text-neutral-900">
            Política de privacidad
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Última actualización: {fechaActualizacion}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-contenido px-4 py-10">
        <div className="prose prose-neutral max-w-2xl">

          {/* Aviso de conformidad legal */}
          <div className="not-prose mb-8 rounded-xl border border-info-200 bg-info-50 px-5 py-4 text-sm leading-relaxed text-info-800">
            <p className="font-semibold">Conformidad legal</p>
            <p className="mt-1">
              Esta política se rige por la{" "}
              <strong>Ley N° 29733 — Ley de Protección de Datos Personales</strong>{" "}
              y su Reglamento aprobado por D.S. N° 003-2013-JUS. La Autoridad
              Nacional de Protección de Datos Personales en Perú es la{" "}
              <a
                href="https://www.minjus.gob.pe/privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                Autoridad Nacional de Transparencia y Acceso a la Información Pública
                (ANTAIP)
              </a>
              , perteneciente al Ministerio de Justicia y Derechos Humanos.
            </p>
          </div>

          <Section id="responsable" titulo="1. Responsable del tratamiento">
            <p>
              El responsable del banco de datos personales es{" "}
              <strong>FORMALIA</strong> (en adelante, «Formalia» o «nosotros»),
              operado como herramienta educativa gratuita dirigida a emprendedores
              peruanos. Puedes contactarnos en:{" "}
              <a href="mailto:privacidad@formalia.vercel.app">
                privacidad@formalia.vercel.app
              </a>
              .
            </p>
          </Section>

          <Section id="datos" titulo="2. Datos personales que recopilamos">
            <p>
              A través del formulario de suscripción recopilamos únicamente los
              siguientes datos:
            </p>
            <ul>
              <li>
                <strong>Dirección de correo electrónico</strong> — dato
                obligatorio para enviar los avisos.
              </li>
              <li>
                <strong>Último dígito del RUC</strong> — dato opcional, utilizado
                exclusivamente para personalizar las fechas de vencimiento según el
                cronograma SUNAT que corresponde a cada contribuyente.
              </li>
            </ul>
            <p>
              No recopilamos nombre, apellidos, número de RUC completo, número de
              teléfono ni ningún otro dato adicional a los señalados.
            </p>
          </Section>

          <Section id="finalidad" titulo="3. Finalidad del tratamiento">
            <p>Tus datos serán utilizados exclusivamente para:</p>
            <ol>
              <li>
                Enviar recordatorios de fechas de vencimiento de declaraciones
                SUNAT (PDT 621, PLAME) según el cronograma vigente.
              </li>
              <li>
                Comunicar novedades tributarias relevantes para emprendedores y
                MYPE peruanos (cambios en la UIT, RMV, IGV, regímenes tributarios,
                entre otros).
              </li>
            </ol>
            <p>
              No cederemos ni venderemos tus datos a terceros para fines
              comerciales, publicitarios ni de ninguna otra naturaleza.
            </p>
          </Section>

          <Section id="base-legal" titulo="4. Base legal del tratamiento">
            <p>
              El tratamiento se realiza sobre la base del{" "}
              <strong>consentimiento libre, previo, expreso e informado</strong>{" "}
              del titular, conforme al artículo 13° de la Ley N° 29733. Este
              consentimiento es otorgado mediante la marca del casillero de
              aceptación en el formulario de suscripción, que incluye un enlace a
              la presente política antes de enviar los datos.
            </p>
          </Section>

          <Section id="conservacion" titulo="5. Plazo de conservación">
            <p>
              Conservaremos tu dirección de correo electrónico (y el dígito de RUC,
              si lo proporcionaste) mientras mantengas la suscripción activa.
              Cuando te des de baja, tus datos serán eliminados del servicio de
              envío de correos dentro de los{" "}
              <strong>30 días calendario</strong> siguientes a la solicitud.
            </p>
          </Section>

          <Section id="destinatarios" titulo="6. Destinatarios de los datos">
            <p>
              Para el envío de correos electrónicos utilizamos el servicio de{" "}
              <strong>Formspree</strong> (formspree.io), proveedor externo ubicado
              en Estados Unidos. Al suscribirte, aceptas que tus datos sean
              procesados por dicho servicio en los términos de su{" "}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                política de privacidad
              </a>
              . Formspree actúa como encargado del tratamiento y no tiene
              autorización para utilizar tus datos para sus propios fines.
            </p>
            <p>
              Ningún otro tercero tiene acceso a tus datos personales.
            </p>
          </Section>

          <Section id="derechos" titulo="7. Tus derechos (ARCO)">
            <p>
              Conforme al artículo 19° de la Ley N° 29733, tienes los siguientes
              derechos sobre tus datos personales:
            </p>
            <dl className="not-prose mt-4 space-y-3 text-sm">
              <DerechoBadge
                letra="A"
                titulo="Acceso"
                descripcion="Conocer qué datos tuyos tratamos, con qué finalidad y de dónde provienen."
              />
              <DerechoBadge
                letra="R"
                titulo="Rectificación"
                descripcion="Solicitar la corrección de datos inexactos o incompletos."
              />
              <DerechoBadge
                letra="C"
                titulo="Cancelación"
                descripcion="Solicitar la eliminación de tus datos cuando ya no sean necesarios para la finalidad para la que fueron recabados."
              />
              <DerechoBadge
                letra="O"
                titulo="Oposición"
                descripcion="Oponerte al tratamiento de tus datos en situaciones específicas previstas por la ley."
              />
            </dl>
          </Section>

          <Section id="ejercer-derechos" titulo="8. Cómo ejercer tus derechos">
            <p>
              Para ejercer cualquiera de los derechos descritos, o para darte de
              baja de las comunicaciones, envía un correo a:{" "}
              <a href="mailto:privacidad@formalia.vercel.app">
                privacidad@formalia.vercel.app
              </a>{" "}
              indicando:
            </p>
            <ul>
              <li>Tu nombre y dirección de correo electrónico registrado.</li>
              <li>El derecho que deseas ejercer (Acceso, Rectificación, Cancelación u Oposición).</li>
              <li>Una breve descripción de tu solicitud.</li>
            </ul>
            <p>
              Atenderemos tu solicitud en un plazo máximo de{" "}
              <strong>20 días hábiles</strong> contados desde la recepción del
              correo, conforme al artículo 22° de la Ley N° 29733. También puedes
              darte de baja directamente desde cualquier correo que te enviemos,
              mediante el enlace «Darme de baja» incluido al pie de cada mensaje.
            </p>
          </Section>

          <Section id="seguridad" titulo="9. Medidas de seguridad">
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger
              tus datos frente a accesos no autorizados, pérdida o alteración,
              incluyendo transmisión por HTTPS y acceso restringido a los datos
              almacenados por Formspree.
            </p>
          </Section>

          <Section id="cookies" titulo="10. Cookies y datos de navegación">
            <p>
              Formalia no instala cookies de seguimiento propias ni utiliza
              herramientas de analítica web que recopilen datos personales
              identificables. Si en el futuro incorporamos analítica, actualizaremos
              esta política antes de hacerlo.
            </p>
          </Section>

          <Section id="cambios" titulo="11. Cambios a esta política">
            <p>
              Podemos actualizar esta política para reflejar cambios en nuestras
              prácticas o en la normativa aplicable. Te notificaremos por correo
              electrónico si los cambios son significativos. La fecha de última
              actualización siempre aparece al inicio de esta página.
            </p>
          </Section>

          <Section id="contacto" titulo="12. Contacto y autoridad de control">
            <p>
              Para cualquier consulta sobre esta política, escríbenos a{" "}
              <a href="mailto:privacidad@formalia.vercel.app">
                privacidad@formalia.vercel.app
              </a>
              .
            </p>
            <p>
              Si consideras que el tratamiento de tus datos vulnera la normativa
              peruana de protección de datos, puedes presentar una queja ante la{" "}
              <strong>
                Autoridad Nacional de Transparencia y Acceso a la Información
                Pública (ANTAIP)
              </strong>
              , dependiente del Ministerio de Justicia y Derechos Humanos (
              <a
                href="https://www.minjus.gob.pe"
                target="_blank"
                rel="noopener noreferrer"
              >
                minjus.gob.pe
              </a>
              ).
            </p>
          </Section>

          <div className="not-prose mt-10 border-t border-neutral-200 pt-6">
            <Link
              href="/"
              className="text-sm text-marca-600 underline hover:text-marca-800"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers de layout
// ---------------------------------------------------------------------------

function Section({
  id,
  titulo,
  children,
}: {
  id: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-8 first:mt-0">
      <h2 className="text-xl font-bold text-neutral-900">{titulo}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-700">
        {children}
      </div>
    </section>
  );
}

function DerechoBadge({
  letra,
  titulo,
  descripcion,
}: {
  letra: string;
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-marca-100 text-xs font-bold text-marca-800"
        aria-hidden="true"
      >
        {letra}
      </span>
      <div>
        <p className="font-semibold text-neutral-800">{titulo}</p>
        <p className="text-neutral-600">{descripcion}</p>
      </div>
    </div>
  );
}
