/** URL base del sitio. Leer de variable de entorno; fallback al dominio de producción en Vercel. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://formalia.vercel.app";
