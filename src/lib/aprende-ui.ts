import type { Nivel } from "./aprende";

export const NIVEL_LABEL: Record<Nivel, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const NIVEL_COLOR: Record<Nivel, string> = {
  basico: "bg-exito-100 text-exito-800 border-exito-200",
  intermedio: "bg-advertencia-100 text-advertencia-800 border-advertencia-200",
  avanzado: "bg-peligro-100 text-peligro-800 border-peligro-200",
};
