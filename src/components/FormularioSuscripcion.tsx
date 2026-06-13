"use client";

/**
 * Formulario de suscripción a recordatorios tributarios.
 *
 * Requiere la variable de entorno NEXT_PUBLIC_FORMSPREE_ID con el ID del
 * formulario creado en https://formspree.io (plan gratuito: 50 envíos/mes).
 * Pasos:
 *   1. Crea una cuenta en formspree.io
 *   2. New form → copia el ID (ej. "xyzabcde")
 *   3. Agrega NEXT_PUBLIC_FORMSPREE_ID=xyzabcde en .env.local y en
 *      Vercel → Settings → Environment Variables
 */

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Estado = "idle" | "enviando" | "exito" | "error";

interface Props {
  /** true = muestra el subtítulo descriptivo; false = solo el heading */
  conSubtitulo?: boolean;
  /** "claro" = para fondos blancos/grises; "oscuro" = para el footer */
  tema?: "claro" | "oscuro";
  className?: string;
  /** Texto alternativo para el encabezado del formulario */
  textoPersonalizado?: string;
  /** Identifica el origen de la suscripción en Formspree (footer, calendario, wizard) */
  fuente?: string;
}

export function FormularioSuscripcion({
  conSubtitulo = true,
  tema = "claro",
  className,
  textoPersonalizado,
  fuente = "web",
}: Props) {
  const [email, setEmail] = useState("");
  const [digito, setDigito] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [estado, setEstado] = useState<Estado>("idle");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const oscuro = tema === "oscuro";

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!consentimiento) return;

    if (!formspreeId) {
      setEstado("error");
      return;
    }

    setEstado("enviando");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          digito_ruc: digito || "no indicado",
          fuente,
          consentimiento: "acepto",
          _subject: `Nueva suscripción FORMALIA (${fuente})`,
        }),
      });
      setEstado(res.ok ? "exito" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "exito") {
    return (
      <div
        className={cn(
          "rounded-xl p-4 text-center",
          oscuro ? "bg-acento-900/30" : "bg-exito-50",
          className,
        )}
      >
        <p className={cn("font-semibold", oscuro ? "text-acento-300" : "text-exito-800")}>
          ¡Listo! Revisa tu correo para confirmar la suscripción.
        </p>
        <p className={cn("mt-1 text-sm", oscuro ? "text-acento-400" : "text-exito-700")}>
          Recibirás recordatorios de vencimientos SUNAT y novedades tributarias.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className={cn("space-y-4", className)}>
      <div>
        <h3
          className={cn(
            "text-base font-semibold",
            oscuro ? "text-white" : "text-neutral-900",
          )}
        >
          {textoPersonalizado ?? "Recibe recordatorios de tus vencimientos SUNAT y novedades tributarias, gratis"}
        </h3>
        {conSubtitulo && (
          <p className={cn("mt-1 text-sm", oscuro ? "text-neutral-300" : "text-neutral-600")}>
            Sin spam. Solo lo que importa para tu negocio.
          </p>
        )}
      </div>

      {/* Campos */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="sr-only" htmlFor="suscripcion-email">
            Correo electrónico
          </label>
          <input
            id="suscripcion-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            className={cn(
              "w-full rounded-lg border px-3 py-2.5 text-sm placeholder:text-neutral-400",
              "focus:outline-none focus:ring-2",
              oscuro
                ? "border-neutral-600 bg-neutral-800 text-white focus:ring-acento-400"
                : "border-neutral-300 bg-white text-neutral-900 focus:ring-marca-500",
            )}
          />
        </div>
        <div className="w-full sm:w-44">
          <label className="sr-only" htmlFor="suscripcion-digito">
            Último dígito de RUC (opcional)
          </label>
          <select
            id="suscripcion-digito"
            value={digito}
            onChange={(e) => setDigito(e.target.value)}
            className={cn(
              "w-full rounded-lg border px-3 py-2.5 text-sm",
              "focus:outline-none focus:ring-2",
              oscuro
                ? "border-neutral-600 bg-neutral-800 text-white focus:ring-acento-400"
                : "border-neutral-300 bg-white text-neutral-900 focus:ring-marca-500",
            )}
          >
            <option value="">Dígito RUC (opcional)</option>
            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <option key={d} value={d}>
                Termina en {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Consentimiento */}
      <div className="flex items-start gap-2.5">
        <input
          id="suscripcion-consentimiento"
          type="checkbox"
          checked={consentimiento}
          onChange={(e) => setConsentimiento(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border-neutral-400 accent-marca-600"
        />
        <label
          htmlFor="suscripcion-consentimiento"
          className={cn("cursor-pointer text-xs leading-relaxed", oscuro ? "text-neutral-300" : "text-neutral-600")}
        >
          Acepto recibir correos con recordatorios de vencimientos SUNAT y novedades tributarias.
          Solo usaremos tu correo para esto; puedes darte de baja cuando quieras.{" "}
          <Link
            href="/privacidad"
            className={cn("underline hover:opacity-80", oscuro ? "text-neutral-300" : "text-neutral-700")}
          >
            Política de privacidad
          </Link>
          .
        </label>
      </div>

      {/* Error */}
      {estado === "error" && (
        <p className="text-xs text-peligro-600">
          {!formspreeId
            ? "El formulario aún no está configurado. Agrega NEXT_PUBLIC_FORMSPREE_ID en las variables de entorno."
            : "Ocurrió un error al enviar. Inténtalo de nuevo en unos minutos."}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={!consentimiento || estado === "enviando"}
        className={cn(
          "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          oscuro
            ? "bg-acento-500 text-white hover:bg-acento-400 focus-visible:ring-acento-400"
            : "bg-marca-600 text-white hover:bg-marca-700 focus-visible:ring-marca-600",
        )}
      >
        {estado === "enviando" ? "Enviando…" : "Suscribirme gratis"}
      </button>
    </form>
  );
}
