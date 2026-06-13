/**
 * Cronograma de vencimientos SUNAT 2026.
 *
 * ACTUALIZACIÓN ANUAL: cada diciembre, SUNAT publica una Resolución de
 * Superintendencia con el cronograma del año siguiente. Actualizar los campos
 * `porDigito` de cada mes, el campo `fuente` y `anio`.
 *
 * Aplica a:
 *  - PDT 621 (declaración mensual IGV + Renta mensual)
 *  - PLAME (planilla mensual) — mismas fechas
 *
 * Fuente 2026: verificar en https://www.sunat.gob.pe/cronograma
 */

export type DigitoRUC = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export interface VencimientoMes {
  /** Período que se declara (1 = enero) */
  periodoMes: number;
  periodoAnio: number;
  /** Mes en que vence la declaración (1 = enero) */
  vencimientoMes: number;
  vencimientoAnio: number;
  /** Fecha de vencimiento por último dígito de RUC. Formato: "DD/MM/YYYY" */
  porDigito: Record<DigitoRUC, string>;
}

export interface CronogramaAnual {
  anio: number;
  /** Resolución de Superintendencia que aprueba el cronograma plurianual. Única fuente de verdad para citas legales. */
  baseLegal: string;
  /** URL donde verificar el cronograma oficial */
  fuente: string;
  /** Fecha de última verificación manual del cronograma */
  ultimaVerificacion: string;
  /** Nota visible al usuario */
  nota: string;
  meses: VencimientoMes[];
}

export const CRONOGRAMA_2026: CronogramaAnual = {
  anio: 2026,
  baseLegal: "R.S. N° 281-2022/SUNAT",
  fuente: "https://www.sunat.gob.pe/cronograma",
  ultimaVerificacion: "2026-06-13",
  nota: "Fechas referenciales. Verificar el cronograma oficial publicado por SUNAT cada enero.",
  meses: [
    // -------------------------------------------------------------------------
    // Los días exactos cambian cada año según el calendario de días hábiles.
    // Actualizar estas fechas cuando SUNAT publique la resolución anual.
    // -------------------------------------------------------------------------
    {
      periodoMes: 1,
      periodoAnio: 2026,
      vencimientoMes: 2,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "09/02/2026",
        "1": "10/02/2026",
        "2": "11/02/2026",
        "3": "12/02/2026",
        "4": "13/02/2026",
        "5": "16/02/2026",
        "6": "17/02/2026",
        "7": "18/02/2026",
        "8": "19/02/2026",
        "9": "20/02/2026",
      },
    },
    {
      periodoMes: 2,
      periodoAnio: 2026,
      vencimientoMes: 3,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "09/03/2026",
        "1": "10/03/2026",
        "2": "11/03/2026",
        "3": "12/03/2026",
        "4": "13/03/2026",
        "5": "16/03/2026",
        "6": "17/03/2026",
        "7": "18/03/2026",
        "8": "19/03/2026",
        "9": "20/03/2026",
      },
    },
    {
      periodoMes: 3,
      periodoAnio: 2026,
      vencimientoMes: 4,
      vencimientoAnio: 2026,
      // Abril 2026: Semana Santa (~3 abril Viernes Santo); se corre la ventana
      porDigito: {
        "0": "07/04/2026",
        "1": "08/04/2026",
        "2": "09/04/2026",
        "3": "10/04/2026",
        "4": "13/04/2026",
        "5": "14/04/2026",
        "6": "15/04/2026",
        "7": "16/04/2026",
        "8": "17/04/2026",
        "9": "20/04/2026",
      },
    },
    {
      periodoMes: 4,
      periodoAnio: 2026,
      vencimientoMes: 5,
      vencimientoAnio: 2026,
      // Mayo 1 = Día del Trabajo (feriado); se corre al día hábil siguiente
      porDigito: {
        "0": "08/05/2026",
        "1": "11/05/2026",
        "2": "12/05/2026",
        "3": "13/05/2026",
        "4": "14/05/2026",
        "5": "15/05/2026",
        "6": "18/05/2026",
        "7": "19/05/2026",
        "8": "20/05/2026",
        "9": "21/05/2026",
      },
    },
    {
      periodoMes: 5,
      periodoAnio: 2026,
      vencimientoMes: 6,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "09/06/2026",
        "1": "10/06/2026",
        "2": "11/06/2026",
        "3": "12/06/2026",
        "4": "15/06/2026",
        "5": "16/06/2026",
        "6": "17/06/2026",
        "7": "18/06/2026",
        "8": "19/06/2026",
        "9": "22/06/2026",
      },
    },
    {
      periodoMes: 6,
      periodoAnio: 2026,
      vencimientoMes: 7,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "07/07/2026",
        "1": "08/07/2026",
        "2": "09/07/2026",
        "3": "10/07/2026",
        "4": "13/07/2026",
        "5": "14/07/2026",
        "6": "15/07/2026",
        "7": "16/07/2026",
        "8": "17/07/2026",
        "9": "20/07/2026",
      },
    },
    {
      periodoMes: 7,
      periodoAnio: 2026,
      vencimientoMes: 8,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "07/08/2026",
        "1": "10/08/2026",
        "2": "11/08/2026",
        "3": "12/08/2026",
        "4": "13/08/2026",
        "5": "14/08/2026",
        "6": "17/08/2026",
        "7": "18/08/2026",
        "8": "19/08/2026",
        "9": "20/08/2026",
      },
    },
    {
      periodoMes: 8,
      periodoAnio: 2026,
      vencimientoMes: 9,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "08/09/2026",
        "1": "09/09/2026",
        "2": "10/09/2026",
        "3": "11/09/2026",
        "4": "14/09/2026",
        "5": "15/09/2026",
        "6": "16/09/2026",
        "7": "17/09/2026",
        "8": "18/09/2026",
        "9": "21/09/2026",
      },
    },
    {
      periodoMes: 9,
      periodoAnio: 2026,
      vencimientoMes: 10,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "07/10/2026",
        "1": "08/10/2026",
        "2": "09/10/2026",
        "3": "12/10/2026",
        "4": "13/10/2026",
        "5": "14/10/2026",
        "6": "15/10/2026",
        "7": "16/10/2026",
        "8": "19/10/2026",
        "9": "20/10/2026",
      },
    },
    {
      periodoMes: 10,
      periodoAnio: 2026,
      vencimientoMes: 11,
      vencimientoAnio: 2026,
      // Nov 1 = Todos los Santos (feriado)
      porDigito: {
        "0": "09/11/2026",
        "1": "10/11/2026",
        "2": "11/11/2026",
        "3": "12/11/2026",
        "4": "13/11/2026",
        "5": "16/11/2026",
        "6": "17/11/2026",
        "7": "18/11/2026",
        "8": "19/11/2026",
        "9": "20/11/2026",
      },
    },
    {
      periodoMes: 11,
      periodoAnio: 2026,
      vencimientoMes: 12,
      vencimientoAnio: 2026,
      porDigito: {
        "0": "07/12/2026",
        "1": "08/12/2026",
        "2": "09/12/2026",
        "3": "10/12/2026",
        "4": "11/12/2026",
        "5": "14/12/2026",
        "6": "15/12/2026",
        "7": "16/12/2026",
        "8": "17/12/2026",
        "9": "18/12/2026",
      },
    },
    {
      periodoMes: 12,
      periodoAnio: 2026,
      vencimientoMes: 1,
      vencimientoAnio: 2027,
      // Vencimiento de diciembre cae en enero del año siguiente
      porDigito: {
        "0": "12/01/2027",
        "1": "13/01/2027",
        "2": "14/01/2027",
        "3": "15/01/2027",
        "4": "16/01/2027",
        "5": "19/01/2027",
        "6": "20/01/2027",
        "7": "21/01/2027",
        "8": "22/01/2027",
        "9": "23/01/2027",
      },
    },
  ],
};

/** Nombres de meses en español */
export const MESES_ES: Record<number, string> = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

/**
 * Parsea una fecha en formato "DD/MM/YYYY" a un objeto Date.
 * Retorna null si el formato es inválido.
 */
export function parsearFecha(fechaStr: string): Date | null {
  const [d, m, y] = fechaStr.split("/").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

/** Días que faltan desde hoy hasta una fecha (negativo = ya pasó) */
export function diasRestantes(fechaStr: string): number {
  const fecha = parsearFecha(fechaStr);
  if (!fecha) return 0;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);
  return Math.round((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}
