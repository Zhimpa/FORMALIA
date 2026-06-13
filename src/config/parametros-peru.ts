/**
 * Parámetros normativos de Perú — únicos source of truth.
 * Actualizar cada enero: UIT (MEF), RMV (MTPE), cronogramas (SUNAT).
 * Cada campo incluye valor, vigencia y fuente oficial.
 */

export interface Parametro<T = number> {
  valor: T;
  vigencia: string;
  fuente: string;
}

// ---------------------------------------------------------------------------
// Valores base
// ---------------------------------------------------------------------------

export const UIT: Parametro = {
  valor: 5500,
  vigencia: "2026",
  fuente: "D.S. 301-2025-EF",
};

export const RMV: Parametro = {
  valor: 1130,
  vigencia: "2026",
  fuente: "Decreto Supremo MTPE",
};

export const IGV: Parametro = {
  valor: 18,
  vigencia: "vigente",
  fuente: "Ley del IGV (16% IGV + 2% IPM)",
};

// ---------------------------------------------------------------------------
// Regímenes tributarios
// ---------------------------------------------------------------------------

export interface RegimenTributario {
  nombre: Parametro<string>;
  topeIngresosAnual: Parametro;
  topeIngresosMensual: Parametro | null;
  topeUIT: Parametro | null;
  emiteFacturas: Parametro<boolean>;
  djAnual: Parametro<boolean>;
  descripcionPago: Parametro<string>;
  maxTrabajadoresPorTurno: Parametro | null;
}

export const NRUS: RegimenTributario = {
  nombre: {
    valor: "Nuevo Régimen Único Simplificado (NRUS)",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 937",
  },
  topeIngresosAnual: {
    valor: 96000,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 937",
  },
  topeIngresosMensual: {
    valor: 8000,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 937",
  },
  topeUIT: null,
  emiteFacturas: {
    valor: false,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 937 (solo boletas y tickets)",
  },
  djAnual: {
    valor: false,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  descripcionPago: {
    valor: "Cuota fija mensual: S/ 20 (hasta S/ 5,000/mes) o S/ 50 (hasta S/ 8,000/mes)",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 937",
  },
  maxTrabajadoresPorTurno: null,
};

export const RER: RegimenTributario = {
  nombre: {
    valor: "Régimen Especial de Renta (RER)",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 968",
  },
  topeIngresosAnual: {
    valor: 525000,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 968",
  },
  topeIngresosMensual: null,
  topeUIT: null,
  emiteFacturas: {
    valor: true,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  djAnual: {
    valor: false,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  descripcionPago: {
    valor: "1.5% de ingresos netos mensuales + IGV",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 968",
  },
  maxTrabajadoresPorTurno: {
    valor: 10,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 968",
  },
};

export const RMT: RegimenTributario = {
  nombre: {
    valor: "Régimen MYPE Tributario (RMT)",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269",
  },
  topeIngresosAnual: {
    valor: 9350000, // 1,700 UIT × S/ 5,500
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269 (1,700 UIT)",
  },
  topeIngresosMensual: null,
  topeUIT: {
    valor: 1700,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269",
  },
  emiteFacturas: {
    valor: true,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  djAnual: {
    valor: true,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  descripcionPago: {
    valor: "Pago a cuenta: 1% hasta 300 UIT acumuladas en el año, luego coeficiente o 1.5%. IR anual: 10% hasta 15 UIT de utilidad neta, 29.5% por el exceso",
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269",
  },
  maxTrabajadoresPorTurno: null,
};

export const RG: RegimenTributario = {
  nombre: {
    valor: "Régimen General (RG)",
    vigencia: "2026",
    fuente: "SUNAT - LIR D.S. 179-2004-EF",
  },
  topeIngresosAnual: null as unknown as Parametro, // sin límite
  topeIngresosMensual: null,
  topeUIT: null,
  emiteFacturas: {
    valor: true,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  djAnual: {
    valor: true,
    vigencia: "2026",
    fuente: "SUNAT",
  },
  descripcionPago: {
    valor: "Pago a cuenta: coeficiente o 1.5% de ingresos netos. IR anual: 29.5% sobre la renta neta",
    vigencia: "2026",
    fuente: "SUNAT - LIR",
  },
  maxTrabajadoresPorTurno: null,
};

// ---------------------------------------------------------------------------
// Tasas del Impuesto a la Renta
// ---------------------------------------------------------------------------

export interface TasasIR {
  rmt: {
    tramoHasta15UIT: Parametro;
    tramoExceso15UIT: Parametro;
    limite15UITEnSoles: Parametro;
  };
  rg: {
    tasa: Parametro;
  };
  pagoACuentaMinimo: Parametro;
  pagoACuentaTopeUIT300: Parametro;
}

export const TASAS_IR: TasasIR = {
  rmt: {
    tramoHasta15UIT: {
      valor: 10,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 1269 art. 4",
    },
    tramoExceso15UIT: {
      valor: 29.5,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 1269 art. 4",
    },
    limite15UITEnSoles: {
      valor: 82500, // 15 × S/ 5,500
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 1269 (15 UIT)",
    },
  },
  rg: {
    tasa: {
      valor: 29.5,
      vigencia: "2026",
      fuente: "SUNAT - LIR art. 55",
    },
  },
  pagoACuentaMinimo: {
    valor: 1, // 1% hasta 300 UIT de ingresos acumulados (RMT)
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269",
  },
  pagoACuentaTopeUIT300: {
    valor: 300,
    vigencia: "2026",
    fuente: "SUNAT - D.Leg. 1269",
  },
};

// ---------------------------------------------------------------------------
// Cuotas NRUS
// ---------------------------------------------------------------------------

export interface CuotasNRUS {
  categoria1: {
    topeIngresosMensual: Parametro;
    cuotaMensual: Parametro;
  };
  categoria2: {
    topeIngresosMensual: Parametro;
    cuotaMensual: Parametro;
  };
}

export const CUOTAS_NRUS: CuotasNRUS = {
  categoria1: {
    topeIngresosMensual: {
      valor: 5000,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 937",
    },
    cuotaMensual: {
      valor: 20,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 937",
    },
  },
  categoria2: {
    topeIngresosMensual: {
      valor: 8000,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 937",
    },
    cuotaMensual: {
      valor: 50,
      vigencia: "2026",
      fuente: "SUNAT - D.Leg. 937",
    },
  },
};

// ---------------------------------------------------------------------------
// Libros contables según ingresos (RMT y RG)
// ---------------------------------------------------------------------------

export interface TramoLibros {
  descripcion: Parametro<string>;
  topeUIT: Parametro | null;
  topeSoles: Parametro | null;
}

export const LIBROS_CONTABLES = {
  tramo1: {
    descripcion: {
      valor: "Registro de Ventas, Registro de Compras y Libro Diario de Formato Simplificado",
      vigencia: "2026",
      fuente: "SUNAT - R.S. 234-2006/SUNAT",
    },
    topeUIT: {
      valor: 300,
      vigencia: "2026",
      fuente: "SUNAT",
    },
    topeSoles: {
      valor: 1650000, // 300 × S/ 5,500
      vigencia: "2026",
      fuente: "SUNAT (300 UIT)",
    },
  } satisfies TramoLibros,
  tramo2: {
    descripcion: {
      valor: "Tramo 1 + Libro Diario y Libro Mayor",
      vigencia: "2026",
      fuente: "SUNAT - R.S. 234-2006/SUNAT",
    },
    topeUIT: {
      valor: 500,
      vigencia: "2026",
      fuente: "SUNAT",
    },
    topeSoles: {
      valor: 2750000, // 500 × S/ 5,500
      vigencia: "2026",
      fuente: "SUNAT (500 UIT)",
    },
  } satisfies TramoLibros,
  tramo3: {
    descripcion: {
      valor: "Tramo 2 + Libro de Inventarios y Balances",
      vigencia: "2026",
      fuente: "SUNAT - R.S. 234-2006/SUNAT",
    },
    topeUIT: {
      valor: 1700,
      vigencia: "2026",
      fuente: "SUNAT",
    },
    topeSoles: {
      valor: 9350000, // 1,700 × S/ 5,500
      vigencia: "2026",
      fuente: "SUNAT (1,700 UIT)",
    },
  } satisfies TramoLibros,
  tramo4: {
    descripcion: {
      valor: "Contabilidad completa (incluye Caja y Bancos, Registro de Activos Fijos, Registro de Costos, Inventarios Permanentes según actividad) — solo Régimen General",
      vigencia: "2026",
      fuente: "SUNAT - R.S. 234-2006/SUNAT",
    },
    topeUIT: null,
    topeSoles: null,
  } satisfies TramoLibros,
};

// ---------------------------------------------------------------------------
// Clasificación MYPE (Ley 30056 — solo por ventas)
// ---------------------------------------------------------------------------

export interface ClasificacionMYPE {
  microempresa: {
    topeVentasUIT: Parametro;
    topeVentasSoles: Parametro;
  };
  pequeñaEmpresa: {
    desdeVentasUIT: Parametro;
    hastaVentasUIT: Parametro;
    desdeVentasSoles: Parametro;
    hastaVentasSoles: Parametro;
  };
}

export const CLASIFICACION_MYPE: ClasificacionMYPE = {
  microempresa: {
    topeVentasUIT: {
      valor: 150,
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE MTPE",
    },
    topeVentasSoles: {
      valor: 825000, // 150 × S/ 5,500
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE (150 UIT)",
    },
  },
  pequeñaEmpresa: {
    desdeVentasUIT: {
      valor: 150,
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE MTPE",
    },
    hastaVentasUIT: {
      valor: 1700,
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE MTPE",
    },
    desdeVentasSoles: {
      valor: 825000,
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE (150 UIT)",
    },
    hastaVentasSoles: {
      valor: 9350000, // 1,700 × S/ 5,500
      vigencia: "2026",
      fuente: "Ley 30056 - REMYPE (1,700 UIT)",
    },
  },
};

// ---------------------------------------------------------------------------
// Beneficios laborales por régimen (REMYPE - Ley 28015 / Ley 30056)
// ---------------------------------------------------------------------------

export interface BeneficiosLaborales {
  vacacionesDias: Parametro;
  gratificaciones: Parametro<string>;
  cts: Parametro<string>;
  salud: Parametro<string>;
  pensionObligatoria: Parametro<boolean>;
  indemnizacionDiasRemuneraPorAnio: Parametro;
  indemnizacionTopeDias: Parametro;
  asignacionFamiliar: Parametro<string>;
  utilidades: Parametro<string>;
}

export const BENEFICIOS_MICROEMPRESA: BeneficiosLaborales = {
  vacacionesDias: {
    valor: 15,
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  gratificaciones: {
    valor: "No aplica",
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  cts: {
    valor: "No aplica",
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  salud: {
    valor: "SIS (Estado subsidia 50%)",
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  pensionObligatoria: {
    valor: false,
    vigencia: "2026",
    fuente: "Ley 28015 (opcional para el trabajador)",
  },
  indemnizacionDiasRemuneraPorAnio: {
    valor: 10,
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  indemnizacionTopeDias: {
    valor: 90,
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  asignacionFamiliar: {
    valor: "No aplica",
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
  utilidades: {
    valor: "No aplica",
    vigencia: "2026",
    fuente: "Ley 28015 - Régimen Laboral MYPE",
  },
};

export const BENEFICIOS_PEQUEÑA_EMPRESA: BeneficiosLaborales = {
  vacacionesDias: {
    valor: 15,
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  gratificaciones: {
    valor: "½ sueldo en julio y ½ sueldo en diciembre",
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  cts: {
    valor: "½ sueldo por año",
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  salud: {
    valor: "ESSALUD 9% a cargo del empleador",
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  pensionObligatoria: {
    valor: true,
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  indemnizacionDiasRemuneraPorAnio: {
    valor: 20,
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  indemnizacionTopeDias: {
    valor: 120,
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  asignacionFamiliar: {
    valor: "No aplica",
    vigencia: "2026",
    fuente: "Ley 30056 - Pequeña Empresa",
  },
  utilidades: {
    valor: "Sí, si tiene más de 20 trabajadores",
    vigencia: "2026",
    fuente: "D.Leg. 892",
  },
};

export const BENEFICIOS_REGIMEN_GENERAL: BeneficiosLaborales = {
  vacacionesDias: {
    valor: 30,
    vigencia: "2026",
    fuente: "D.Leg. 713 - Régimen General",
  },
  gratificaciones: {
    valor: "1 sueldo en julio y 1 sueldo en diciembre",
    vigencia: "2026",
    fuente: "Ley 27735 - Régimen General",
  },
  cts: {
    valor: "1 sueldo por año (depósitos en mayo y noviembre)",
    vigencia: "2026",
    fuente: "D.S. 001-97-TR - Régimen General",
  },
  salud: {
    valor: "ESSALUD 9% a cargo del empleador",
    vigencia: "2026",
    fuente: "Ley 26790 - Régimen General",
  },
  pensionObligatoria: {
    valor: true,
    vigencia: "2026",
    fuente: "D.Leg. 728 - Régimen General",
  },
  indemnizacionDiasRemuneraPorAnio: {
    valor: 45,
    vigencia: "2026",
    fuente: "D.Leg. 728 - Régimen General",
  },
  indemnizacionTopeDias: {
    valor: 360,
    vigencia: "2026",
    fuente: "D.Leg. 728 - Régimen General",
  },
  asignacionFamiliar: {
    valor: "10% de la RMV (S/ 113 en 2026)",
    vigencia: "2026",
    fuente: "Ley 25129 - Régimen General",
  },
  utilidades: {
    valor: "Sí, si tiene más de 20 trabajadores (5–10% según sector)",
    vigencia: "2026",
    fuente: "D.Leg. 892",
  },
};

// ---------------------------------------------------------------------------
// Costos laborales sobre sueldo bruto (régimen general)
// ---------------------------------------------------------------------------

export const COSTOS_LABORALES_RG = {
  essaludEmpleador: {
    valor: 9,
    vigencia: "2026",
    fuente: "Ley 26790",
  } satisfies Parametro,
  afpONPTrabajador: {
    valor: "~10–13% (AFP variable; ONP 13%)",
    vigencia: "2026",
    fuente: "D.Leg. 19990 / SBS",
  } satisfies Parametro<string>,
  ctsAnualAproximada: {
    valor: 8.33,
    vigencia: "2026",
    fuente: "D.S. 001-97-TR (equivale a 1 sueldo/año)",
  } satisfies Parametro,
  gratificacionesAnuales: {
    valor: "2 sueldos/año + bonificación extraordinaria 9% (Ley 30334)",
    vigencia: "2026",
    fuente: "Ley 27735 + Ley 30334",
  } satisfies Parametro<string>,
  /** 9 % sobre cada gratificación pagado al trabajador en lugar de EsSalud — Ley 30334 (vigente desde 2015). */
  bonificacionExtraordinariaGratificacion: {
    valor: 9,
    vigencia: "2026",
    fuente: "Ley 30334 (permanente desde jul-2015)",
  } satisfies Parametro,
  vacacionesAnuales: {
    valor: "1 sueldo/año",
    vigencia: "2026",
    fuente: "D.Leg. 713",
  } satisfies Parametro<string>,
  multiplicadorAproximado: {
    valor: 1.44,
    vigencia: "2026",
    fuente: "Estimación incluye bonificación extraordinaria Ley 30334 — el trabajador cuesta ~1.44× su sueldo bruto",
  } satisfies Parametro,
};

// ---------------------------------------------------------------------------
// Costos de formalización
// ---------------------------------------------------------------------------

export const COSTOS_FORMALIZACION = {
  personaNatural: {
    ruc: {
      valor: 0,
      vigencia: "2026",
      fuente: "SUNAT (gratuito)",
    } satisfies Parametro,
    tiempoEstimadoDias: {
      valor: 1,
      vigencia: "2026",
      fuente: "SUNAT",
    } satisfies Parametro,
  },
  sacsDigital: {
    costoTotalAproximado: {
      valor: 100,
      vigencia: "2026",
      fuente: "SUNARP - SID Ciudadano (DL 1409, vía DNIe)",
    } satisfies Parametro,
    notarioRequerido: {
      valor: false,
      vigencia: "2026",
      fuente: "D.Leg. 1409",
    } satisfies Parametro<boolean>,
  },
  pjTradicional: {
    reservaNombreSUNARP: {
      valor: 25,
      vigencia: "2026",
      fuente: "SUNARP (vigencia 30 días)",
    } satisfies Parametro,
    minutaAbogado: {
      valor: "S/ 250–600",
      vigencia: "2026",
      fuente: "Estimación de mercado (notarías / CDE / MAC)",
    } satisfies Parametro<string>,
    escrituraPublicaNotarial: {
      valor: "S/ 250–500",
      vigencia: "2026",
      fuente: "Estimación de mercado (aranceles notariales)",
    } satisfies Parametro<string>,
    inscripcionSUNARPCalificacion: {
      valor: 46,
      vigencia: "2026",
      fuente: "SUNARP - arancel registral",
    } satisfies Parametro,
    inscripcionSUNARPGerente: {
      valor: 28,
      vigencia: "2026",
      fuente: "SUNARP - nombramiento de gerente",
    } satisfies Parametro,
    inscripcionSUNARPCapitalPorMiliar: {
      valor: 3,
      vigencia: "2026",
      fuente: "SUNARP - S/ 3 por millar de capital",
    } satisfies Parametro,
    totalEstimadoMinimo: {
      valor: 700,
      vigencia: "2026",
      fuente: "Estimación (Lima)",
    } satisfies Parametro,
    totalEstimadoMaximo: {
      valor: 1800,
      vigencia: "2026",
      fuente: "Estimación (Lima)",
    } satisfies Parametro,
  },
  licenciaFuncionamiento: {
    costoMinimo: {
      valor: 100,
      vigencia: "2026",
      fuente: "Municipalidades (varía según municipio)",
    } satisfies Parametro,
    costoMaximo: {
      valor: 500,
      vigencia: "2026",
      fuente: "Municipalidades (varía según municipio)",
    } satisfies Parametro,
    tiempoEstimadoDias: {
      valor: "7–15 días hábiles",
      vigencia: "2026",
      fuente: "Ley 28976 - Licencia de Funcionamiento",
    } satisfies Parametro<string>,
  },
  registroMarca: {
    descripcion: {
      valor: "Opcional. Protección por 10 años, renovable.",
      vigencia: "2026",
      fuente: "INDECOPI",
    } satisfies Parametro<string>,
  },
};

// ---------------------------------------------------------------------------
// Facturación electrónica (2026)
// ---------------------------------------------------------------------------

export const FACTURACION_ELECTRONICA = {
  obligatoriedadNuevosRUC: {
    valor: "Nuevos inscritos en RER, RMT o RG son emisores electrónicos desde el día de inscripción al RUC",
    vigencia: "desde 01/06/2026",
    fuente: "R.S. 000075-2026/SUNAT",
  } satisfies Parametro<string>,
  multaNoEmitirMinimo: {
    valor: 0.5, // 50% de 1 UIT
    vigencia: "2026",
    fuente: "SUNAT - Tabla de infracciones y sanciones (50% UIT)",
  } satisfies Parametro,
  multaNoEmitirMaximo: {
    valor: 2, // 2 UIT
    vigencia: "2026",
    fuente: "SUNAT - Tabla de infracciones y sanciones (2 UIT)",
  } satisfies Parametro,
};

// ---------------------------------------------------------------------------
// Otras tasas y umbrales
// ---------------------------------------------------------------------------

export const OTRAS_TASAS = {
  itan: {
    tasa: {
      valor: 0.4,
      vigencia: "2026",
      fuente: "Ley 28424 - ITAN",
    } satisfies Parametro,
    umbraActivosNetosSoles: {
      valor: 1000000,
      vigencia: "2026",
      fuente: "Ley 28424 (aplica sobre el exceso de S/ 1 millón)",
    } satisfies Parametro,
  },
  retencionIGV: {
    valor: 3,
    vigencia: "2026",
    fuente: "R.S. 037-2002/SUNAT - Sistema de Retenciones del IGV",
  } satisfies Parametro,
  bancarizacionUmbralSoles: {
    valor: 2000,
    vigencia: "2026",
    fuente: "D.S. 150-2007-EF - Medios de Pago",
  } satisfies Parametro,
  bancarizacionUmbralUSD: {
    valor: 500,
    vigencia: "2026",
    fuente: "D.S. 150-2007-EF - Medios de Pago",
  } satisfies Parametro,
  rentaPrimeraCategoriaEfectiva: {
    valor: 5,
    vigencia: "2026",
    fuente: "LIR art. 84 (tasa efectiva alquileres)",
  } satisfies Parametro,
  rentaSegundaCategoria: {
    valor: 5,
    vigencia: "2026",
    fuente: "LIR art. 54 (ganancias de capital, dividendos)",
  } satisfies Parametro,
  retencionCuartaCategoria: {
    valor: 8,
    vigencia: "2026",
    fuente: "LIR art. 74 (recibos por honorarios)",
  } satisfies Parametro,
  exoneracionRenta5taUITAnuales: {
    valor: 7,
    vigencia: "2026",
    fuente: "LIR art. 46 (7 UIT = S/ 38,500 en 2026)",
  } satisfies Parametro,
};

// ---------------------------------------------------------------------------
// Participación en utilidades (trabajadores)
// ---------------------------------------------------------------------------

export const PARTICIPACION_UTILIDADES = {
  minimoTrabajadores: {
    valor: 20,
    vigencia: "2026",
    fuente: "D.Leg. 892",
  } satisfies Parametro,
  pescaTelecomIndustria: {
    valor: 10,
    vigencia: "2026",
    fuente: "D.Leg. 892",
  } satisfies Parametro,
  mineriaComercio: {
    valor: 8,
    vigencia: "2026",
    fuente: "D.Leg. 892",
  } satisfies Parametro,
  otrasActividades: {
    valor: 5,
    vigencia: "2026",
    fuente: "D.Leg. 892",
  } satisfies Parametro,
};

// ---------------------------------------------------------------------------
// Export agrupado para consumo fácil
// ---------------------------------------------------------------------------

export const PARAMETROS_PERU = {
  UIT,
  RMV,
  IGV,
  regimenes: { NRUS, RER, RMT, RG },
  tasasIR: TASAS_IR,
  cuotasNRUS: CUOTAS_NRUS,
  librosContables: LIBROS_CONTABLES,
  clasificacionMYPE: CLASIFICACION_MYPE,
  beneficiosLaborales: {
    microempresa: BENEFICIOS_MICROEMPRESA,
    pequeñaEmpresa: BENEFICIOS_PEQUEÑA_EMPRESA,
    regimenGeneral: BENEFICIOS_REGIMEN_GENERAL,
  },
  costosLaboralesRG: COSTOS_LABORALES_RG,
  costosFormalizacion: COSTOS_FORMALIZACION,
  facturacionElectronica: FACTURACION_ELECTRONICA,
  otrasTasas: OTRAS_TASAS,
  participacionUtilidades: PARTICIPACION_UTILIDADES,
} as const;
