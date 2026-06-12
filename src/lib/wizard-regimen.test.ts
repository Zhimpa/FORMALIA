import { describe, it, expect } from "vitest";
import {
  calcularResultado,
  wizardCompleto,
  nombreRegimen,
  PREGUNTAS,
  type Respuestas,
  type RegimeId,
} from "./wizard-regimen";
import {
  NRUS as NRUS_PARAMS,
  RER as RER_PARAMS,
  RMT as RMT_PARAMS,
  TASAS_IR,
} from "@/config/parametros-peru";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const respuestaBase: Required<Respuestas> = {
  necesitaFacturas: "si",
  rangoIngresos: "hasta_525k",
  margenUtilidad: "bajo",
  tipoActividad: "comercio",
};

function resultado(overrides: Partial<Respuestas>) {
  return calcularResultado({ ...respuestaBase, ...overrides });
}

// ---------------------------------------------------------------------------
// Estructura del resultado
// ---------------------------------------------------------------------------

describe("Estructura del resultado", () => {
  it("siempre devuelve las propiedades requeridas", () => {
    const r = calcularResultado(respuestaBase);
    expect(r).toHaveProperty("regimenRecomendado");
    expect(r).toHaveProperty("regimenAlternativo");
    expect(r).toHaveProperty("explicacion");
    expect(r).toHaveProperty("razones");
    expect(r).toHaveProperty("advertencias");
    expect(r).toHaveProperty("tabla");
  });

  it("explicacion no está vacía", () => {
    const r = calcularResultado(respuestaBase);
    expect(r.explicacion.length).toBeGreaterThan(20);
  });

  it("razones es un array no vacío", () => {
    const r = calcularResultado(respuestaBase);
    expect(Array.isArray(r.razones)).toBe(true);
    expect(r.razones.length).toBeGreaterThan(0);
  });

  it("tabla tiene 9 filas (todos los aspectos comparativos)", () => {
    const r = calcularResultado(respuestaBase);
    expect(r.tabla.length).toBe(9);
  });

  it("cada fila de tabla tiene aspecto, recomendado y alternativo", () => {
    const r = calcularResultado(respuestaBase);
    for (const fila of r.tabla) {
      expect(typeof fila.aspecto).toBe("string");
      expect(typeof fila.recomendado).toBe("string");
      // alternativo puede ser null si no hay alternativa
    }
  });
});

// ---------------------------------------------------------------------------
// Preguntas del wizard
// ---------------------------------------------------------------------------

describe("PREGUNTAS", () => {
  it("hay exactamente 4 preguntas", () => {
    expect(PREGUNTAS.length).toBe(4);
  });

  it("cubren los 4 temas requeridos (facturas, ingresos, margen, actividad)", () => {
    const ids = PREGUNTAS.map((p) => p.id);
    expect(ids).toContain("necesitaFacturas");
    expect(ids).toContain("rangoIngresos");
    expect(ids).toContain("margenUtilidad");
    expect(ids).toContain("tipoActividad");
  });

  it("cada pregunta tiene al menos 2 opciones", () => {
    for (const p of PREGUNTAS) {
      expect(p.opciones.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("cada pregunta tiene texto y ayuda no vacíos", () => {
    for (const p of PREGUNTAS) {
      expect(p.texto.length).toBeGreaterThan(5);
      expect(p.ayuda.length).toBeGreaterThan(10);
    }
  });

  it("la pregunta de ingresos incluye el tope NRUS exacto (S/ 96,000)", () => {
    const pregIngresos = PREGUNTAS.find((p) => p.id === "rangoIngresos")!;
    const textosCombinados = pregIngresos.opciones.map((o) => o.texto + o.detalle).join(" ");
    expect(textosCombinados).toContain(NRUS_PARAMS.topeIngresosAnual.valor.toLocaleString());
  });

  it("la pregunta de ingresos incluye el tope RER exacto (S/ 525,000)", () => {
    const pregIngresos = PREGUNTAS.find((p) => p.id === "rangoIngresos")!;
    const textosCombinados = pregIngresos.opciones.map((o) => o.texto + o.detalle).join(" ");
    expect(textosCombinados).toContain(RER_PARAMS.topeIngresosAnual.valor.toLocaleString());
  });
});

// ---------------------------------------------------------------------------
// Casos límite: topes exactos de cada régimen
// ---------------------------------------------------------------------------

describe("Casos límite — topes exactos de cada régimen", () => {
  /**
   * S/ 96,000 es el tope MÁXIMO del NRUS.
   * Un negocio con ingresos EXACTAMENTE de S/ 96,000 todavía PUEDE estar en NRUS.
   */
  it("ingresos exactamente S/ 96,000 (tope NRUS) sin facturas → NRUS", () => {
    const r = resultado({
      necesitaFacturas: "no",
      rangoIngresos: "hasta_96k", // ≤ 96,000, incluye exactamente 96,000
    });
    expect(r.regimenRecomendado).toBe("NRUS");
  });

  /**
   * S/ 96,001 supera el tope del NRUS → cae en 'hasta_525k'.
   * Sin importar que no necesita facturas, NRUS ya no es posible.
   */
  it("ingresos S/ 96,001 (primer sol por encima del tope NRUS) → NO puede ser NRUS", () => {
    const r = resultado({
      necesitaFacturas: "no",
      rangoIngresos: "hasta_525k", // 96,001–525,000
    });
    expect(r.regimenRecomendado).not.toBe("NRUS");
  });

  /**
   * S/ 525,000 es el tope exacto del RER.
   * El RMT sigue siendo la mejor opción incluso en este monto.
   */
  it("ingresos exactamente S/ 525,000 (tope RER) con facturas → RMT (mejor que RER)", () => {
    const r = resultado({
      necesitaFacturas: "si",
      rangoIngresos: "hasta_525k", // ≤ 525,000, incluye exactamente 525,000
    });
    expect(r.regimenRecomendado).toBe("RMT");
  });

  /**
   * S/ 525,001 ya supera el RER → solo RMT o RG.
   */
  it("ingresos S/ 525,001 (supera tope RER) → RMT obligatoriamente (no RER)", () => {
    const r = resultado({
      necesitaFacturas: "si",
      rangoIngresos: "hasta_1700uit", // 525,001–9,350,000
    });
    expect(r.regimenRecomendado).toBe("RMT");
    // El alternativo en este rango no puede ser RER
    expect(r.regimenAlternativo).not.toBe("RER");
  });

  /**
   * 1,700 UIT × S/ 5,500 = S/ 9,350,000 es el tope exacto del RMT.
   * Todavía dentro del límite → RMT.
   */
  it(`ingresos exactamente 1,700 UIT (S/ ${(1700 * 5500).toLocaleString()}) → RMT`, () => {
    const r = resultado({
      rangoIngresos: "hasta_1700uit", // ≤ 1,700 UIT, incluye exactamente 9,350,000
    });
    expect(r.regimenRecomendado).toBe("RMT");
    // Confirmar que el tope de parametros-peru es correcto
    expect(RMT_PARAMS.topeIngresosAnual.valor).toBe(1700 * 5500);
  });

  /**
   * Un sol por encima de 1,700 UIT → RG obligatorio, sin alternativa.
   */
  it("ingresos que superan 1,700 UIT → RG obligatorio y sin alternativa", () => {
    const r = resultado({
      rangoIngresos: "sobre_1700uit",
    });
    expect(r.regimenRecomendado).toBe("RG");
    expect(r.regimenAlternativo).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Elegibilidad NRUS
// ---------------------------------------------------------------------------

describe("NRUS — condiciones de elegibilidad", () => {
  it("con ingresos ≤ 96k y sin necesidad de facturas → NRUS", () => {
    const r = resultado({ necesitaFacturas: "no", rangoIngresos: "hasta_96k" });
    expect(r.regimenRecomendado).toBe("NRUS");
  });

  it("con ingresos ≤ 96k pero necesita facturas → no puede ser NRUS", () => {
    const r = resultado({ necesitaFacturas: "si", rangoIngresos: "hasta_96k" });
    expect(r.regimenRecomendado).not.toBe("NRUS");
  });

  it("con ingresos ≤ 96k y clientes mixtos → no puede ser NRUS", () => {
    const r = resultado({ necesitaFacturas: "ambos", rangoIngresos: "hasta_96k" });
    expect(r.regimenRecomendado).not.toBe("NRUS");
  });

  it("el resultado NRUS tiene el RMT como alternativa", () => {
    const r = resultado({ necesitaFacturas: "no", rangoIngresos: "hasta_96k" });
    expect(r.regimenAlternativo).toBe("RMT");
  });

  it("el resultado NRUS advierte sobre la imposibilidad de emitir facturas", () => {
    const r = resultado({ necesitaFacturas: "no", rangoIngresos: "hasta_96k" });
    const advertenciaFacturas = r.advertencias.some((a) =>
      a.toLowerCase().includes("factura"),
    );
    expect(advertenciaFacturas).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// RMT vs RER — comparativa financiera
// ---------------------------------------------------------------------------

describe("RMT recomendado sobre RER en zona de solapamiento", () => {
  it("con margen incierto → RMT (el RER cobra aunque haya pérdidas)", () => {
    const r = resultado({
      rangoIngresos: "hasta_525k",
      margenUtilidad: "incierto_o_negativo",
    });
    expect(r.regimenRecomendado).toBe("RMT");
  });

  it("con margen bajo → RMT", () => {
    const r = resultado({
      rangoIngresos: "hasta_525k",
      margenUtilidad: "bajo",
    });
    expect(r.regimenRecomendado).toBe("RMT");
  });

  it("con margen alto → RMT (aun así paga menos que el RER en la mayoría de casos)", () => {
    const r = resultado({
      rangoIngresos: "hasta_525k",
      margenUtilidad: "alto",
    });
    expect(r.regimenRecomendado).toBe("RMT");
  });

  it("el RER aparece como alternativa cuando los ingresos lo permiten", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    expect(r.regimenAlternativo).toBe("RER");
  });

  it("con margen incierto → la advertencia menciona que el RER cobra 1.5% aunque se pierda dinero", () => {
    const r = resultado({
      rangoIngresos: "hasta_525k",
      margenUtilidad: "incierto_o_negativo",
    });
    const tieneAdvertenciaRER = r.advertencias.some(
      (a) => a.includes("1.5%") || a.toLowerCase().includes("pérdida") || a.toLowerCase().includes("pierd"),
    );
    expect(tieneAdvertenciaRER).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Tasas y montos del RMT en el resultado
// ---------------------------------------------------------------------------

describe("RMT — tasas en el resultado", () => {
  it(`la explicación menciona ${TASAS_IR.rmt.tramoHasta15UIT.valor}% (tasa primer tramo)`, () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    expect(r.explicacion).toContain(`${TASAS_IR.rmt.tramoHasta15UIT.valor}%`);
  });

  it("las razones mencionan la ganancia real (no las ventas)", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    const mencionaGanancia = r.razones.some(
      (rz) => rz.toLowerCase().includes("ganancia"),
    );
    expect(mencionaGanancia).toBe(true);
  });

  it("la tabla incluye la fila de impuesto anual con las tasas correctas", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    const filaImpuesto = r.tabla.find((f) => f.aspecto.toLowerCase().includes("impuesto"));
    expect(filaImpuesto).toBeDefined();
    expect(filaImpuesto!.recomendado).toContain(`${TASAS_IR.rmt.tramoHasta15UIT.valor}%`);
  });
});

// ---------------------------------------------------------------------------
// Tipo de actividad — advertencias
// ---------------------------------------------------------------------------

describe("tipoActividad — advertencias según sector", () => {
  it("actividad de producción → genera advertencia sobre restricciones en RER", () => {
    const r = resultado({
      tipoActividad: "produccion",
      rangoIngresos: "hasta_525k",
    });
    const tieneAdvertenciaProduccion = r.advertencias.some(
      (a) => a.toLowerCase().includes("producción") || a.toLowerCase().includes("manufactura"),
    );
    expect(tieneAdvertenciaProduccion).toBe(true);
  });

  it("comercio o servicios → no genera advertencia específica de actividad", () => {
    const rComercio = resultado({ tipoActividad: "comercio" });
    const rServicios = resultado({ tipoActividad: "servicios" });

    const tieneAdvertenciaProduccion = (r: typeof rComercio) =>
      r.advertencias.some((a) =>
        a.toLowerCase().includes("producción") || a.toLowerCase().includes("manufactura"),
      );

    expect(tieneAdvertenciaProduccion(rComercio)).toBe(false);
    expect(tieneAdvertenciaProduccion(rServicios)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// RG obligatorio — condiciones
// ---------------------------------------------------------------------------

describe("Régimen General — obligatoriedad", () => {
  it("siempre es el recomendado para 'sobre_1700uit'", () => {
    const variantes: Array<Partial<Respuestas>> = [
      { necesitaFacturas: "no" },
      { necesitaFacturas: "si" },
      { margenUtilidad: "alto" },
      { margenUtilidad: "incierto_o_negativo" },
      { tipoActividad: "produccion" },
    ];
    for (const override of variantes) {
      const r = resultado({ ...override, rangoIngresos: "sobre_1700uit" });
      expect(r.regimenRecomendado).toBe("RG");
    }
  });

  it("el resultado del RG incluye advertencia sobre SUNAT y cambio de oficio", () => {
    const r = resultado({ rangoIngresos: "sobre_1700uit" });
    const tieneAdvertenciaSUNAT = r.advertencias.some((a) =>
      a.toLowerCase().includes("sunat") || a.toLowerCase().includes("oficio"),
    );
    expect(tieneAdvertenciaSUNAT).toBe(true);
  });

  it("la tabla del RG no tiene alternativo (null)", () => {
    const r = resultado({ rangoIngresos: "sobre_1700uit" });
    const todasFilasAltNull = r.tabla.every((f) => f.alternativo === null);
    expect(todasFilasAltNull).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

describe("Helpers del wizard", () => {
  it("wizardCompleto: false cuando faltan respuestas", () => {
    expect(wizardCompleto({})).toBe(false);
    expect(wizardCompleto({ necesitaFacturas: "si" })).toBe(false);
  });

  it("wizardCompleto: true cuando todas las preguntas tienen respuesta", () => {
    expect(wizardCompleto(respuestaBase)).toBe(true);
  });

  it("nombreRegimen devuelve string no vacío para cada régimen", () => {
    const regimenes: RegimeId[] = ["NRUS", "RER", "RMT", "RG"];
    for (const id of regimenes) {
      expect(nombreRegimen(id).length).toBeGreaterThan(2);
    }
  });

  it("calcularResultado con respuestas vacías no lanza excepción (usa defaults)", () => {
    expect(() => calcularResultado({})).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Coherencia de la tabla comparativa
// ---------------------------------------------------------------------------

describe("Tabla comparativa — coherencia", () => {
  it("la fila de facturas del RMT dice 'Sí'", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    const filaFacturas = r.tabla.find((f) =>
      f.aspecto.toLowerCase().includes("factura"),
    );
    expect(filaFacturas!.recomendado.toLowerCase()).toContain("sí");
  });

  it("la fila de facturas del NRUS dice 'No' o 'solo boletas'", () => {
    const r = resultado({ necesitaFacturas: "no", rangoIngresos: "hasta_96k" });
    const filaFacturas = r.tabla.find((f) =>
      f.aspecto.toLowerCase().includes("factura"),
    );
    expect(
      filaFacturas!.recomendado.toLowerCase().includes("no") ||
      filaFacturas!.recomendado.toLowerCase().includes("boleta"),
    ).toBe(true);
  });

  it("la fila de DJ Anual del RMT dice 'Sí'", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    const filaDJ = r.tabla.find((f) => f.aspecto.toLowerCase().includes("declaraci"));
    expect(filaDJ!.recomendado.toLowerCase()).toContain("sí");
  });

  it("la fila de DJ Anual del NRUS dice 'No'", () => {
    const r = resultado({ necesitaFacturas: "no", rangoIngresos: "hasta_96k" });
    // El alternativo del NRUS es RMT (que SÍ tiene DJ)
    // La columna recomendado (NRUS) debe decir No
    const filaDJ = r.tabla.find((f) => f.aspecto.toLowerCase().includes("declaraci"));
    expect(filaDJ!.recomendado.toLowerCase()).toContain("no");
  });

  it("el límite de ingresos del RMT en la tabla refleja 1,700 UIT", () => {
    const r = resultado({ rangoIngresos: "hasta_525k" });
    const filaLimite = r.tabla.find((f) => f.aspecto.toLowerCase().includes("límite"));
    expect(filaLimite!.recomendado).toContain("1,700");
  });
});
