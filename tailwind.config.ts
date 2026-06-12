import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul institucional — #1E40AF = blue-800 (contraste sobre blanco: 8.6:1 ✓)
        marca: colors.blue,

        // Verde acento de marca — #10B981 = emerald-500 (Formalia brand accent)
        acento: colors.emerald,

        // Semánticos
        exito: colors.green,
        advertencia: colors.amber,
        peligro: colors.red,
        info: colors.sky,
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        // Escala legible para pública general (secundaria completa)
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.08)",
      },
      maxWidth: {
        contenido: "72rem", // 1152px — ancho máximo del contenido
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
