/**
 * Combina clases de Tailwind descartando valores falsy.
 * Reemplaza clsx/classnames sin dependencias externas.
 */
export function cn(...clases: (string | undefined | null | false | 0)[]): string {
  return clases.filter(Boolean).join(" ");
}
