import { describe, it, expect } from "vitest";
import {
  UIT,
  RMV,
  IGV,
  NRUS,
  RER,
  RMT,
  RG,
  TASAS_IR,
  CUOTAS_NRUS,
  LIBROS_CONTABLES,
  CLASIFICACION_MYPE,
  BENEFICIOS_MICROEMPRESA,
  BENEFICIOS_PEQUEÑA_EMPRESA,
  BENEFICIOS_REGIMEN_GENERAL,
  COSTOS_LABORALES_RG,
  COSTOS_FORMALIZACION,
  FACTURACION_ELECTRONICA,
  OTRAS_TASAS,
  PARTICIPACION_UTILIDADES,
  PARAMETROS_PERU,
  type Parametro,
} from "./parametros-peru";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tieneEstructuraParametro(p: Parametro<unknown>): boolean {
  return (
    "valor" in p &&
    typeof p.vigencia === "string" &&
    p.vigencia.length > 0 &&
    typeof p.fuente === "string" &&
    p.fuente.length > 0
  );
}

function todosParametros(obj: Record<string, unknown>): Parametro<unknown>[] {
  const result: Parametro<unknown>[] = [];
  for (const val of Object.values(obj)) {
    if (
      val !== null &&
      typeof val === "object" &&
      "valor" in val &&
      "vigencia" in val &&
      "fuente" in val
    ) {
      result.push(val as Parametro<unknown>);
    } else if (val !== null && typeof val === "object") {
      result.push(...todosParametros(val as Record<string, unknown>));
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Valores base
// ---------------------------------------------------------------------------

describe("UIT", () => {
  it("tiene estructura Parametro", () => {
    expect(tieneEstructuraParametro(UIT)).toBe(true);
  });

  it("valor es 5500 (UIT 2026)", () => {
    expect(UIT.valor).toBe(5500);
  });

  it("vigencia indica 2026", () => {
    expect(UIT.vigencia).toContain("2026");
  });

  it("fuente cita el decreto supremo", () => {
    expect(UIT.fuente).toContain("301-2025-EF");
  });
});

describe("RMV", () => {
  it("tiene estructura Parametro", () => {
    expect(tieneEstructuraParametro(RMV)).toBe(true);
  });

  it("valor es 1130 (RMV 2026)", () => {
    expect(RMV.valor).toBe(1130);
  });
});

describe("IGV", () => {
  it("tiene estructura Parametro", () => {
    expect(tieneEstructuraParametro(IGV)).toBe(true);
  });

  it("valor es 18 (%)", () => {
    expect(IGV.valor).toBe(18);
  });
});

// ---------------------------------------------------------------------------
// Consistencia UIT — los montos derivados deben ser UIT × factor
// ---------------------------------------------------------------------------

describe("Consistencia de montos derivados de la UIT", () => {
  it("tope RMT (1,700 UIT) = UIT × 1700", () => {
    expect(RMT.topeIngresosAnual.valor).toBe(UIT.valor * 1700);
  });

  it("tope MYPE pequeña empresa = UIT × 1700", () => {
    expect(CLASIFICACION_MYPE.pequeñaEmpresa.hastaVentasSoles.valor).toBe(UIT.valor * 1700);
  });

  it("tope microempresa MYPE = UIT × 150", () => {
    expect(CLASIFICACION_MYPE.microempresa.topeVentasSoles.valor).toBe(UIT.valor * 150);
  });

  it("tramo1 libros contables tope = UIT × 300", () => {
    expect(LIBROS_CONTABLES.tramo1.topeSoles.valor).toBe(UIT.valor * 300);
  });

  it("tramo2 libros contables tope = UIT × 500", () => {
    expect(LIBROS_CONTABLES.tramo2.topeSoles.valor).toBe(UIT.valor * 500);
  });

  it("tramo3 libros contables tope = UIT × 1700", () => {
    expect(LIBROS_CONTABLES.tramo3.topeSoles.valor).toBe(UIT.valor * 1700);
  });

  it("límite 15 UIT del RMT = UIT × 15", () => {
    expect(TASAS_IR.rmt.limite15UITEnSoles.valor).toBe(UIT.valor * 15);
  });
});

// ---------------------------------------------------------------------------
// NRUS
// ---------------------------------------------------------------------------

describe("NRUS", () => {
  it("tope anual es 96,000", () => {
    expect(NRUS.topeIngresosAnual.valor).toBe(96000);
  });

  it("tope mensual es 8,000", () => {
    expect(NRUS.topeIngresosMensual?.valor).toBe(8000);
  });

  it("NO emite facturas", () => {
    expect(NRUS.emiteFacturas.valor).toBe(false);
  });

  it("NO presenta DJ Anual", () => {
    expect(NRUS.djAnual.valor).toBe(false);
  });

  it("cuota categoría 1: hasta S/ 5,000 paga S/ 20", () => {
    expect(CUOTAS_NRUS.categoria1.topeIngresosMensual.valor).toBe(5000);
    expect(CUOTAS_NRUS.categoria1.cuotaMensual.valor).toBe(20);
  });

  it("cuota categoría 2: hasta S/ 8,000 paga S/ 50", () => {
    expect(CUOTAS_NRUS.categoria2.topeIngresosMensual.valor).toBe(8000);
    expect(CUOTAS_NRUS.categoria2.cuotaMensual.valor).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// RER
// ---------------------------------------------------------------------------

describe("RER", () => {
  it("tope anual es 525,000", () => {
    expect(RER.topeIngresosAnual.valor).toBe(525000);
  });

  it("máx 10 trabajadores por turno", () => {
    expect(RER.maxTrabajadoresPorTurno?.valor).toBe(10);
  });

  it("emite facturas", () => {
    expect(RER.emiteFacturas.valor).toBe(true);
  });

  it("NO presenta DJ Anual", () => {
    expect(RER.djAnual.valor).toBe(false);
  });

  it("pago menciona 1.5%", () => {
    expect(RER.descripcionPago.valor).toContain("1.5%");
  });
});

// ---------------------------------------------------------------------------
// RMT
// ---------------------------------------------------------------------------

describe("RMT", () => {
  it("tope UIT es 1,700", () => {
    expect(RMT.topeUIT?.valor).toBe(1700);
  });

  it("tope anual supera 9 millones (1,700 × 5,500)", () => {
    expect(RMT.topeIngresosAnual.valor).toBeGreaterThan(9000000);
  });

  it("emite facturas", () => {
    expect(RMT.emiteFacturas.valor).toBe(true);
  });

  it("presenta DJ Anual", () => {
    expect(RMT.djAnual.valor).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tasas IR
// ---------------------------------------------------------------------------

describe("Tasas IR", () => {
  it("RMT primer tramo es 10%", () => {
    expect(TASAS_IR.rmt.tramoHasta15UIT.valor).toBe(10);
  });

  it("RMT exceso es 29.5%", () => {
    expect(TASAS_IR.rmt.tramoExceso15UIT.valor).toBe(29.5);
  });

  it("RG tasa es 29.5%", () => {
    expect(TASAS_IR.rg.tasa.valor).toBe(29.5);
  });

  it("pago a cuenta mínimo 1%", () => {
    expect(TASAS_IR.pagoACuentaMinimo.valor).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Beneficios laborales
// ---------------------------------------------------------------------------

describe("Beneficios laborales — microempresa", () => {
  it("15 días de vacaciones", () => {
    expect(BENEFICIOS_MICROEMPRESA.vacacionesDias.valor).toBe(15);
  });

  it("sin gratificaciones", () => {
    expect(BENEFICIOS_MICROEMPRESA.gratificaciones.valor).toContain("No aplica");
  });

  it("sin CTS", () => {
    expect(BENEFICIOS_MICROEMPRESA.cts.valor).toContain("No aplica");
  });

  it("pensión NO es obligatoria", () => {
    expect(BENEFICIOS_MICROEMPRESA.pensionObligatoria.valor).toBe(false);
  });

  it("indemnización: 10 días por año, tope 90", () => {
    expect(BENEFICIOS_MICROEMPRESA.indemnizacionDiasRemuneraPorAnio.valor).toBe(10);
    expect(BENEFICIOS_MICROEMPRESA.indemnizacionTopeDias.valor).toBe(90);
  });
});

describe("Beneficios laborales — pequeña empresa", () => {
  it("15 días de vacaciones", () => {
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.vacacionesDias.valor).toBe(15);
  });

  it("tiene gratificaciones (½ sueldo)", () => {
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.gratificaciones.valor).toContain("½");
  });

  it("tiene CTS (½ sueldo)", () => {
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.cts.valor).toContain("½");
  });

  it("pensión ES obligatoria", () => {
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.pensionObligatoria.valor).toBe(true);
  });

  it("indemnización: 20 días por año, tope 120", () => {
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.indemnizacionDiasRemuneraPorAnio.valor).toBe(20);
    expect(BENEFICIOS_PEQUEÑA_EMPRESA.indemnizacionTopeDias.valor).toBe(120);
  });
});

describe("Beneficios laborales — régimen general", () => {
  it("30 días de vacaciones", () => {
    expect(BENEFICIOS_REGIMEN_GENERAL.vacacionesDias.valor).toBe(30);
  });

  it("1 sueldo de gratificación en julio y diciembre", () => {
    expect(BENEFICIOS_REGIMEN_GENERAL.gratificaciones.valor).toContain("1 sueldo");
  });

  it("CTS: 1 sueldo por año", () => {
    expect(BENEFICIOS_REGIMEN_GENERAL.cts.valor).toContain("1 sueldo");
  });

  it("indemnización: 45 días por año, tope 360", () => {
    expect(BENEFICIOS_REGIMEN_GENERAL.indemnizacionDiasRemuneraPorAnio.valor).toBe(45);
    expect(BENEFICIOS_REGIMEN_GENERAL.indemnizacionTopeDias.valor).toBe(360);
  });

  it("asignación familiar es 10% RMV", () => {
    expect(BENEFICIOS_REGIMEN_GENERAL.asignacionFamiliar.valor).toContain("10%");
  });
});

// ---------------------------------------------------------------------------
// Costos de formalización
// ---------------------------------------------------------------------------

describe("Costos de formalización", () => {
  it("RUC persona natural es gratuito", () => {
    expect(COSTOS_FORMALIZACION.personaNatural.ruc.valor).toBe(0);
  });

  it("SACS digital cuesta ~S/ 100", () => {
    expect(COSTOS_FORMALIZACION.sacsDigital.costoTotalAproximado.valor).toBe(100);
  });

  it("SACS no requiere notario", () => {
    expect(COSTOS_FORMALIZACION.sacsDigital.notarioRequerido.valor).toBe(false);
  });

  it("reserva de nombre SUNARP ~S/ 25", () => {
    expect(COSTOS_FORMALIZACION.pjTradicional.reservaNombreSUNARP.valor).toBe(25);
  });

  it("total PJ mínimo >= S/ 700", () => {
    expect(COSTOS_FORMALIZACION.pjTradicional.totalEstimadoMinimo.valor).toBeGreaterThanOrEqual(700);
  });

  it("total PJ máximo <= S/ 1,800", () => {
    expect(COSTOS_FORMALIZACION.pjTradicional.totalEstimadoMaximo.valor).toBeLessThanOrEqual(1800);
  });
});

// ---------------------------------------------------------------------------
// Otras tasas
// ---------------------------------------------------------------------------

describe("Otras tasas y umbrales", () => {
  it("ITAN: 0.4% sobre activos > S/ 1 millón", () => {
    expect(OTRAS_TASAS.itan.tasa.valor).toBe(0.4);
    expect(OTRAS_TASAS.itan.umbraActivosNetosSoles.valor).toBe(1000000);
  });

  it("retención IGV: 3%", () => {
    expect(OTRAS_TASAS.retencionIGV.valor).toBe(3);
  });

  it("bancarización obligatoria desde S/ 2,000", () => {
    expect(OTRAS_TASAS.bancarizacionUmbralSoles.valor).toBe(2000);
  });

  it("renta 4ta categoría: retención 8%", () => {
    expect(OTRAS_TASAS.retencionCuartaCategoria.valor).toBe(8);
  });

  it("exoneración renta 5ta: 7 UIT anuales", () => {
    expect(OTRAS_TASAS.exoneracionRenta5taUITAnuales.valor).toBe(7);
  });
});

// ---------------------------------------------------------------------------
// Participación en utilidades
// ---------------------------------------------------------------------------

describe("Participación en utilidades", () => {
  it("mínimo 20 trabajadores para obligación", () => {
    expect(PARTICIPACION_UTILIDADES.minimoTrabajadores.valor).toBe(20);
  });

  it("pesca/telecom/industria: 10%", () => {
    expect(PARTICIPACION_UTILIDADES.pescaTelecomIndustria.valor).toBe(10);
  });

  it("minería/comercio: 8%", () => {
    expect(PARTICIPACION_UTILIDADES.mineriaComercio.valor).toBe(8);
  });

  it("otras actividades: 5%", () => {
    expect(PARTICIPACION_UTILIDADES.otrasActividades.valor).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Estructura del export agrupado
// ---------------------------------------------------------------------------

describe("PARAMETROS_PERU — export agrupado", () => {
  it("contiene UIT, RMV, IGV", () => {
    expect(PARAMETROS_PERU.UIT).toBeDefined();
    expect(PARAMETROS_PERU.RMV).toBeDefined();
    expect(PARAMETROS_PERU.IGV).toBeDefined();
  });

  it("contiene los 4 regímenes", () => {
    expect(PARAMETROS_PERU.regimenes.NRUS).toBeDefined();
    expect(PARAMETROS_PERU.regimenes.RER).toBeDefined();
    expect(PARAMETROS_PERU.regimenes.RMT).toBeDefined();
    expect(PARAMETROS_PERU.regimenes.RG).toBeDefined();
  });

  it("contiene beneficios laborales por régimen", () => {
    expect(PARAMETROS_PERU.beneficiosLaborales.microempresa).toBeDefined();
    expect(PARAMETROS_PERU.beneficiosLaborales.pequeñaEmpresa).toBeDefined();
    expect(PARAMETROS_PERU.beneficiosLaborales.regimenGeneral).toBeDefined();
  });

  it("contiene costos de formalización", () => {
    expect(PARAMETROS_PERU.costosFormalizacion).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Integridad estructural — todos los Parametro tienen valor, vigencia, fuente
// ---------------------------------------------------------------------------

describe("Integridad — todos los Parametro tienen valor, vigencia y fuente", () => {
  const parametrosBase = [UIT, RMV, IGV];
  const parametrosIR = [
    TASAS_IR.rmt.tramoHasta15UIT,
    TASAS_IR.rmt.tramoExceso15UIT,
    TASAS_IR.rmt.limite15UITEnSoles,
    TASAS_IR.rg.tasa,
    TASAS_IR.pagoACuentaMinimo,
    TASAS_IR.pagoACuentaTopeUIT300,
  ];
  const cuotas = [
    CUOTAS_NRUS.categoria1.cuotaMensual,
    CUOTAS_NRUS.categoria1.topeIngresosMensual,
    CUOTAS_NRUS.categoria2.cuotaMensual,
    CUOTAS_NRUS.categoria2.topeIngresosMensual,
  ];

  const todos = [...parametrosBase, ...parametrosIR, ...cuotas];

  it.each(todos.map((p, i) => [i, p] as [number, Parametro<unknown>]))(
    "parametro índice %i tiene estructura válida",
    (_, p) => {
      expect(tieneEstructuraParametro(p)).toBe(true);
    }
  );

  it("todos los Parametro dentro de PARAMETROS_PERU tienen estructura válida", () => {
    const lista = todosParametros(PARAMETROS_PERU as unknown as Record<string, unknown>);
    expect(lista.length).toBeGreaterThan(0);
    for (const p of lista) {
      expect(tieneEstructuraParametro(p)).toBe(true);
    }
  });
});
