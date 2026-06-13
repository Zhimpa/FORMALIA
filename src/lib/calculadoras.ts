import {
  IGV,
  TASAS_IR,
  CUOTAS_NRUS,
  COSTOS_LABORALES_RG,
} from "@/config/parametros-peru";

// Factor de bonificación extraordinaria sobre gratificaciones (Ley 30334).
// Aplica a todo trabajador que recibe gratificación: RG (2 sueldos/año) y
// Pequeña Empresa (½ sueldo × 2 = 1 sueldo/año). No aplica a Microempresa.
const FACTOR_GRAT = 1 + COSTOS_LABORALES_RG.bonificacionExtraordinariaGratificacion.valor / 100;

const r2 = (n: number): number => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// 1. IGV
// ---------------------------------------------------------------------------

export interface ResultadoIGV {
  montoBase: number;
  igv: number;
  montoTotal: number;
  tasaIGV: number;
}

export function calcularIGV(monto: number, incluyeIGV: boolean): ResultadoIGV {
  const tasa = IGV.valor / 100;
  if (incluyeIGV) {
    const base = monto / (1 + tasa);
    return { montoBase: r2(base), igv: r2(monto - base), montoTotal: monto, tasaIGV: IGV.valor };
  }
  return { montoBase: monto, igv: r2(monto * tasa), montoTotal: r2(monto * (1 + tasa)), tasaIGV: IGV.valor };
}

export interface ResultadoDebitoCredito {
  debitoFiscal: number;
  creditoFiscal: number;
  saldo: number;
  debesPagar: boolean;
}

export function calcularDebitoCredito(
  ventasSinIGV: number,
  comprasSinIGV: number
): ResultadoDebitoCredito {
  const tasa = IGV.valor / 100;
  const debitoFiscal = r2(ventasSinIGV * tasa);
  const creditoFiscal = r2(comprasSinIGV * tasa);
  const saldo = r2(debitoFiscal - creditoFiscal);
  return { debitoFiscal, creditoFiscal, saldo, debesPagar: saldo > 0 };
}

// ---------------------------------------------------------------------------
// 2. Costo laboral
// ---------------------------------------------------------------------------

export type RegimenLaboral = "general" | "pequeña" | "micro";

export interface DesgloseCostoLaboral {
  sueldoBruto: number;
  essaludMensual: number;
  ctsMensual: number;
  gratificacionesMensual: number;
  vacacionesMensual: number;
  costoMensualPromedio: number;
  costoAnual: number;
  multiplicador: number;
  regimen: RegimenLaboral;
}

export function calcularCostoLaboral(
  sueldo: number,
  regimen: RegimenLaboral
): DesgloseCostoLaboral {
  const tasaEssalud = COSTOS_LABORALES_RG.essaludEmpleador.valor / 100;

  let essaludMensual: number;
  let ctsAnual: number;
  let gratificacionesAnual: number;
  let vacacionesAnual: number;

  switch (regimen) {
    case "general":
      essaludMensual = sueldo * tasaEssalud;
      ctsAnual = sueldo;
      // 2 gratificaciones × (1 sueldo + 9% bonificación extraordinaria Ley 30334)
      gratificacionesAnual = sueldo * 2 * FACTOR_GRAT;
      vacacionesAnual = sueldo;
      break;
    case "pequeña":
      essaludMensual = sueldo * tasaEssalud;
      ctsAnual = sueldo * 0.5;
      // 2 × ½ sueldo × (1 + 9% bonificación extraordinaria Ley 30334) = sueldo × 1.09
      gratificacionesAnual = sueldo * FACTOR_GRAT;
      vacacionesAnual = sueldo * 0.5;
      break;
    case "micro":
    default:
      essaludMensual = 0;
      ctsAnual = 0;
      gratificacionesAnual = 0;
      vacacionesAnual = sueldo * 0.5;
      break;
  }

  const ctsMensual = r2(ctsAnual / 12);
  const gratificacionesMensual = r2(gratificacionesAnual / 12);
  const vacacionesMensual = r2(vacacionesAnual / 12);
  const costoMensualPromedio = r2(
    sueldo + r2(essaludMensual) + ctsMensual + gratificacionesMensual + vacacionesMensual
  );
  const costoAnual = r2(costoMensualPromedio * 12);
  const multiplicador = r2(costoMensualPromedio / sueldo);

  return {
    sueldoBruto: sueldo,
    essaludMensual: r2(essaludMensual),
    ctsMensual,
    gratificacionesMensual,
    vacacionesMensual,
    costoMensualPromedio,
    costoAnual,
    multiplicador,
    regimen,
  };
}

// ---------------------------------------------------------------------------
// 3. Punto de equilibrio
// ---------------------------------------------------------------------------

export interface ResultadoPE {
  margenContribucion: number;
  margenContribucionPct: number;
  peUnidades: number | null;
  peSoles: number | null;
  esViable: boolean;
}

export function calcularPuntoEquilibrio(
  costosFijos: number,
  costoVariableUnit: number,
  precio: number
): ResultadoPE {
  const mc = precio - costoVariableUnit;
  if (mc <= 0) {
    return { margenContribucion: r2(mc), margenContribucionPct: 0, peUnidades: null, peSoles: null, esViable: false };
  }
  const peUnidades = Math.ceil(costosFijos / mc);
  const peSoles = r2(peUnidades * precio);
  return {
    margenContribucion: r2(mc),
    margenContribucionPct: r2((mc / precio) * 100),
    peUnidades,
    peSoles,
    esViable: true,
  };
}

// ---------------------------------------------------------------------------
// 4. Impuesto a la Renta anual (RMT vs RG)
// ---------------------------------------------------------------------------

export interface ResultadoIR {
  utilidad: number;
  impuestoRMT: number;
  impuestoRG: number;
  ahorroRMT: number;
  tasaEfectivaRMT: number;
  tasaEfectivaRG: number;
  detalleRMT: {
    limite15UIT: number;
    tramoBase: number;
    impuestoBase: number;
    tramoExceso: number;
    impuestoExceso: number;
  };
}

export function calcularImpuestoRenta(utilidadAnual: number): ResultadoIR {
  const limite = TASAS_IR.rmt.limite15UITEnSoles.valor;
  const t10 = TASAS_IR.rmt.tramoHasta15UIT.valor / 100;
  const t295 = TASAS_IR.rmt.tramoExceso15UIT.valor / 100;
  const tRG = TASAS_IR.rg.tasa.valor / 100;
  const u = Math.max(0, utilidadAnual);

  let impuestoRMT: number;
  let detalleRMT: ResultadoIR["detalleRMT"];

  if (u <= limite) {
    const imp = r2(u * t10);
    impuestoRMT = imp;
    detalleRMT = { limite15UIT: limite, tramoBase: u, impuestoBase: imp, tramoExceso: 0, impuestoExceso: 0 };
  } else {
    const impBase = r2(limite * t10);
    const exceso = r2(u - limite);
    const impExceso = r2(exceso * t295);
    impuestoRMT = r2(impBase + impExceso);
    detalleRMT = { limite15UIT: limite, tramoBase: limite, impuestoBase: impBase, tramoExceso: exceso, impuestoExceso: impExceso };
  }

  const impuestoRG = r2(u * tRG);
  const ahorroRMT = r2(impuestoRG - impuestoRMT);
  const tasaEfectivaRMT = u > 0 ? r2((impuestoRMT / u) * 100) : 0;
  const tasaEfectivaRG = u > 0 ? r2((impuestoRG / u) * 100) : 0;

  return { utilidad: u, impuestoRMT, impuestoRG, ahorroRMT, tasaEfectivaRMT, tasaEfectivaRG, detalleRMT };
}

// ---------------------------------------------------------------------------
// 5. Cuota NRUS
// ---------------------------------------------------------------------------

export interface ResultadoNRUS {
  categoria: 1 | 2 | null;
  cuotaMensual: number | null;
  superaTope: boolean;
  topeCat1: number;
  topeCat2: number;
}

export function calcularCuotaNRUS(ingresosMensuales: number): ResultadoNRUS {
  const topeCat1 = CUOTAS_NRUS.categoria1.topeIngresosMensual.valor;
  const cuota1 = CUOTAS_NRUS.categoria1.cuotaMensual.valor;
  const topeCat2 = CUOTAS_NRUS.categoria2.topeIngresosMensual.valor;
  const cuota2 = CUOTAS_NRUS.categoria2.cuotaMensual.valor;

  if (ingresosMensuales <= topeCat1) {
    return { categoria: 1, cuotaMensual: cuota1, superaTope: false, topeCat1, topeCat2 };
  }
  if (ingresosMensuales <= topeCat2) {
    return { categoria: 2, cuotaMensual: cuota2, superaTope: false, topeCat1, topeCat2 };
  }
  return { categoria: null, cuotaMensual: null, superaTope: true, topeCat1, topeCat2 };
}
