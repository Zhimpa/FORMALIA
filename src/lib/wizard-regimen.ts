/**
 * Lógica pura del wizard "¿Qué régimen tributario me conviene?".
 * Sin dependencias de React. Importable en tests y en el componente UI.
 *
 * Fuente normativa: datos/investigacion-contable-peru.md §Regímenes Tributarios SUNAT 2026
 */

import {
  NRUS as NRUS_PARAMS,
  RER as RER_PARAMS,
  RMT as RMT_PARAMS,
  TASAS_IR,
  CUOTAS_NRUS,
  UIT,
} from "@/config/parametros-peru";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number) =>
  new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(n);

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export type RegimeId = "NRUS" | "RER" | "RMT" | "RG";

/**
 * Rangos de ingresos anuales.
 * Los topes son inclusivos: 'hasta_96k' incluye exactamente S/ 96,000;
 * 'hasta_525k' incluye exactamente S/ 525,000 (tope RER);
 * 'hasta_1700uit' incluye exactamente S/ 9,350,000 (1,700 × UIT 2026).
 */
export type RangoIngresos =
  | "hasta_96k"      // ≤ S/ 96,000  → límite NRUS
  | "hasta_525k"     // 96,001 – 525,000  → límite RER
  | "hasta_1700uit"  // 525,001 – 9,350,000  → límite RMT
  | "sobre_1700uit"; // > 9,350,000  → solo RG

export type NecesitaFacturas = "no" | "si" | "ambos";
export type MargenUtilidad = "incierto_o_negativo" | "bajo" | "alto";
export type TipoActividad = "comercio" | "servicios" | "produccion" | "mixto";

export interface Respuestas {
  necesitaFacturas?: NecesitaFacturas;
  rangoIngresos?: RangoIngresos;
  margenUtilidad?: MargenUtilidad;
  tipoActividad?: TipoActividad;
}

export interface OpcionPregunta {
  valor: string;
  texto: string;
  detalle: string;
}

export interface Pregunta {
  id: keyof Respuestas;
  texto: string;
  ayuda: string;
  opciones: OpcionPregunta[];
}

export interface FilaComparativa {
  aspecto: string;
  recomendado: string;
  alternativo: string | null;
}

export interface ResultadoWizard {
  regimenRecomendado: RegimeId;
  regimenAlternativo: RegimeId | null;
  /** Explicación en lenguaje simple para alguien sin conocimientos contables */
  explicacion: string;
  /** Lista de razones concretas de la recomendación */
  razones: string[];
  /** Alertas importantes que el usuario debe conocer */
  advertencias: string[];
  /** Tabla comparativa régimen recomendado vs alternativo */
  tabla: FilaComparativa[];
}

// ---------------------------------------------------------------------------
// Preguntas del wizard (en orden de presentación)
// ---------------------------------------------------------------------------

export const PREGUNTAS: Pregunta[] = [
  {
    id: "necesitaFacturas",
    texto: "¿Tus clientes te van a pedir facturas?",
    ayuda:
      "La factura es el comprobante que las empresas usan para descontar sus impuestos. " +
      "Las personas comunes (vecinos, familias) normalmente solo piden boleta. " +
      "Las empresas, municipios o el Estado casi siempre exigen factura.",
    opciones: [
      {
        valor: "no",
        texto: "No — vendo solo a personas en general",
        detalle: "Vecinos, familias o consumidores. Nadie te pedirá factura.",
      },
      {
        valor: "si",
        texto: "Sí — mis clientes son empresas, tiendas u organismos del Estado",
        detalle: "Contratos con empresas, municipios, colegios u otras organizaciones.",
      },
      {
        valor: "ambos",
        texto: "Los dos — tengo clientes mixtos",
        detalle: "Algunos te piden factura (empresas) y otros no (personas).",
      },
    ],
  },
  {
    id: "rangoIngresos",
    texto: "¿Cuánto estimas vender en total en un año?",
    ayuda:
      "Suma todo lo que recibirías de tus clientes en 12 meses (antes de descontar impuestos ni costos). " +
      "Si recién empiezas, elige el rango donde crees que estarás al principio.",
    opciones: [
      {
        valor: "hasta_96k",
        texto: `Hasta S/ ${fmt(NRUS_PARAMS.topeIngresosAnual.valor)} al año`,
        detalle: `Menos de S/ ${fmt(NRUS_PARAMS.topeIngresosMensual!.valor)} por mes. Negocio pequeño o en inicio.`,
      },
      {
        valor: "hasta_525k",
        texto: `Entre S/ ${fmt(NRUS_PARAMS.topeIngresosAnual.valor + 1)} y S/ ${fmt(RER_PARAMS.topeIngresosAnual.valor)} al año`,
        detalle: "Negocio en crecimiento. Este es el tope del Régimen Especial (RER).",
      },
      {
        valor: "hasta_1700uit",
        texto: `Entre S/ ${fmt(RER_PARAMS.topeIngresosAnual.valor + 1)} y S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)} al año`,
        detalle: `Hasta ${RMT_PARAMS.topeUIT!.valor.toLocaleString()} UIT. Empresa mediana en expansión.`,
      },
      {
        valor: "sobre_1700uit",
        texto: `Más de S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)} al año`,
        detalle: `Más de ${RMT_PARAMS.topeUIT!.valor.toLocaleString()} UIT. Empresas grandes o sucursales de empresas extranjeras.`,
      },
    ],
  },
  {
    id: "margenUtilidad",
    texto: "¿Cómo esperas que sea la ganancia de tu negocio?",
    ayuda:
      'La "ganancia" (o utilidad) es lo que te queda después de pagar todos tus costos: ' +
      "mercadería, alquiler, sueldos, servicios, luz. Es muy diferente a tus ventas totales. " +
      "Ejemplo: si vendes S/ 10,000 pero gastas S/ 9,000, tu ganancia es S/ 1,000.",
    opciones: [
      {
        valor: "incierto_o_negativo",
        texto: "Incierto — estoy empezando y podría haber pérdidas al inicio",
        detalle: "Hay regímenes que cobran impuesto aunque pierdas plata. Importante saberlo.",
      },
      {
        valor: "bajo",
        texto: `Ganancia baja o moderada — menos de S/ ${fmt(TASAS_IR.rmt.limite15UITEnSoles.valor)} al año`,
        detalle: `Equivale a las primeras ${TASAS_IR.pagoACuentaTopeUIT300.valor === 300 ? "15" : "15"} UIT (S/ ${fmt(UIT.valor)} × 15) de ganancia neta.`,
      },
      {
        valor: "alto",
        texto: `Buena ganancia — más de S/ ${fmt(TASAS_IR.rmt.limite15UITEnSoles.valor)} al año`,
        detalle: "Una parte importante de tu utilidad supera el primer tramo de impuesto.",
      },
    ],
  },
  {
    id: "tipoActividad",
    texto: "¿A qué se dedicará principalmente tu negocio?",
    ayuda:
      "Algunos regímenes tienen restricciones por tipo de actividad o por el tipo de activos que tienes. " +
      "Esto nos ayuda a darte la recomendación más precisa.",
    opciones: [
      {
        valor: "comercio",
        texto: "Comercio — compro productos y los revendo",
        detalle: "Bodegas, ferreterías, farmacias, tiendas de ropa, minimarkets, etc.",
      },
      {
        valor: "servicios",
        texto: "Servicios — vendo trabajo, conocimiento o habilidades",
        detalle: "Contabilidad, diseño, transporte, salud, educación, consultoría, etc.",
      },
      {
        valor: "produccion",
        texto: "Producción — fabrico o transformo productos",
        detalle: "Panadería, confecciones, muebles, artesanía, procesamiento de alimentos, etc.",
      },
      {
        valor: "mixto",
        texto: "Mixto — vendo productos y también servicios",
        detalle: "Ejemplo: taller mecánico que vende repuestos y cobra mano de obra.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Datos normativos por régimen (para la tabla comparativa)
// ---------------------------------------------------------------------------

interface DatosRegimen {
  nombreCorto: string;
  limiteAnual: string;
  emiteFacturas: string;
  pagoMensual: string;
  impuestoAnual: string;
  djAnual: string;
  libros: string;
  ventaja: string;
  riesgo: string;
}

const DATOS: Record<RegimeId, DatosRegimen> = {
  NRUS: {
    nombreCorto: "Nuevo RUS",
    limiteAnual: `S/ ${fmt(NRUS_PARAMS.topeIngresosAnual.valor)}/año`,
    emiteFacturas: "No — solo boletas y tickets",
    pagoMensual: `S/ ${fmt(CUOTAS_NRUS.categoria1.cuotaMensual.valor)} o S/ ${fmt(CUOTAS_NRUS.categoria2.cuotaMensual.valor)} (cuota fija)`,
    impuestoAnual: "La cuota mensual lo cubre todo",
    djAnual: "No",
    libros: "Ninguno",
    ventaja: "Cero trámites contables, cuota fija mínima",
    riesgo: "No puedes vender a empresas ni al Estado",
  },
  RER: {
    nombreCorto: "Régimen Especial (RER)",
    limiteAnual: `S/ ${fmt(RER_PARAMS.topeIngresosAnual.valor)}/año · máx. ${RER_PARAMS.maxTrabajadoresPorTurno!.valor} trabajadores/turno`,
    emiteFacturas: "Sí — facturas y boletas",
    pagoMensual: `${RER_PARAMS.descripcionPago.valor.split(":")[1]?.trim() ?? "1.5% de ventas"} + IGV`,
    impuestoAnual: "Incluido en el 1.5% mensual (no hay ajuste anual)",
    djAnual: "No",
    libros: "Registro de Compras y Registro de Ventas",
    ventaja: "Sin DJ anual, cálculo simple y predecible",
    riesgo: "Pagas 1.5% de tus VENTAS aunque no ganes nada",
  },
  RMT: {
    nombreCorto: "Régimen MYPE Tributario (RMT)",
    limiteAnual: `S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)}/año (${RMT_PARAMS.topeUIT!.valor.toLocaleString()} UIT)`,
    emiteFacturas: "Sí — facturas y boletas",
    pagoMensual: `${TASAS_IR.pagoACuentaMinimo.valor}% de ventas (hasta ${TASAS_IR.pagoACuentaTopeUIT300.valor} UIT acumuladas) o coeficiente`,
    impuestoAnual: `${TASAS_IR.rmt.tramoHasta15UIT.valor}% sobre las primeras 15 UIT de ganancia · ${TASAS_IR.rmt.tramoExceso15UIT.valor}% sobre el exceso`,
    djAnual: "Sí (marzo–abril del año siguiente)",
    libros: "Mínimo: Registro de Ventas y Compras (aumenta según ingresos)",
    ventaja: "Pagas solo sobre tu GANANCIA REAL — la tasa más baja disponible",
    riesgo: "Requiere DJ anual y llevar registros contables",
  },
  RG: {
    nombreCorto: "Régimen General (RG)",
    limiteAnual: "Sin límite",
    emiteFacturas: "Sí — facturas y boletas",
    pagoMensual: "Coeficiente del año anterior o 1.5% de ventas",
    impuestoAnual: `${TASAS_IR.rg.tasa.valor}% sobre la ganancia neta anual`,
    djAnual: "Sí (marzo–abril del año siguiente)",
    libros: "Contabilidad completa si supera 1,700 UIT",
    ventaja: "Sin límite de ingresos, acceso a todos los beneficios tributarios",
    riesgo: "Mayor carga administrativa y la tasa de renta más alta",
  },
};

const ASPECTOS_TABLA: Array<{ etiqueta: string; clave: keyof DatosRegimen }> = [
  { etiqueta: "Nombre del régimen", clave: "nombreCorto" },
  { etiqueta: "Límite de ingresos anuales", clave: "limiteAnual" },
  { etiqueta: "¿Emite facturas?", clave: "emiteFacturas" },
  { etiqueta: "Pago mensual a SUNAT", clave: "pagoMensual" },
  { etiqueta: "Impuesto a la Renta anual", clave: "impuestoAnual" },
  { etiqueta: "Declaración Jurada Anual", clave: "djAnual" },
  { etiqueta: "Libros contables", clave: "libros" },
  { etiqueta: "Principal ventaja", clave: "ventaja" },
  { etiqueta: "Principal riesgo", clave: "riesgo" },
];

function construirTabla(rec: RegimeId, alt: RegimeId | null): FilaComparativa[] {
  return ASPECTOS_TABLA.map(({ etiqueta, clave }) => ({
    aspecto: etiqueta,
    recomendado: DATOS[rec][clave],
    alternativo: alt ? DATOS[alt][clave] : null,
  }));
}

// ---------------------------------------------------------------------------
// Lógica de recomendación
// ---------------------------------------------------------------------------

/**
 * Calcula el régimen recomendado a partir de las respuestas del wizard.
 * Pura: no tiene efectos secundarios ni depende del entorno.
 */
export function calcularResultado(r: Respuestas): ResultadoWizard {
  const necesitaFacturas: NecesitaFacturas = r.necesitaFacturas ?? "no";
  const rangoIngresos: RangoIngresos = r.rangoIngresos ?? "hasta_96k";
  const margenUtilidad: MargenUtilidad = r.margenUtilidad ?? "incierto_o_negativo";
  const tipoActividad: TipoActividad = r.tipoActividad ?? "comercio";

  // ── Elegibilidad ──────────────────────────────────────────────────────────

  const puedeNRUS =
    necesitaFacturas === "no" &&
    rangoIngresos === "hasta_96k";

  // RER admite facturas, pero hay límite de ingresos y de trabajadores.
  // Las actividades de producción pueden tener restricciones adicionales.
  const puedeRER =
    rangoIngresos === "hasta_96k" || rangoIngresos === "hasta_525k";

  const puedeRMT = rangoIngresos !== "sobre_1700uit";

  // ── Caso 1: Supera 1,700 UIT → RG obligatorio ────────────────────────────

  if (rangoIngresos === "sobre_1700uit") {
    return {
      regimenRecomendado: "RG",
      regimenAlternativo: null,
      explicacion:
        `Con ingresos que superan S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)} al año (1,700 UIT), ` +
        "la ley te obliga a estar en el Régimen General. No existe otra opción.",
      razones: [
        `Tus ingresos superan el límite máximo del Régimen MYPE Tributario (${RMT_PARAMS.topeUIT!.valor.toLocaleString()} UIT = S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)}).`,
        "El Régimen General aplica sin límite de ingresos a todas las empresas grandes.",
        `Pagarás ${TASAS_IR.rg.tasa.valor}% sobre tu ganancia neta anual declarada.`,
        "Debes llevar contabilidad completa y presentar DJ Anual.",
      ],
      advertencias: [
        "SUNAT cruza automáticamente tus facturas electrónicas. Si superas los límites de un régimen sin cambiarte, te incluirá en el RG de oficio con efecto retroactivo — y eso puede generar multas.",
        "Contrata a un contador público colegiado desde el inicio. La contabilidad del RG requiere conocimiento especializado.",
      ],
      tabla: construirTabla("RG", null),
    };
  }

  // ── Caso 2: NRUS recomendado ──────────────────────────────────────────────

  if (puedeNRUS) {
    const cuotaOrientativa =
      `S/ ${fmt(CUOTAS_NRUS.categoria1.cuotaMensual.valor)}/mes si vendes hasta S/ ${fmt(CUOTAS_NRUS.categoria1.topeIngresosMensual.valor)}/mes, ` +
      `o S/ ${fmt(CUOTAS_NRUS.categoria2.cuotaMensual.valor)}/mes si vendes entre S/ ${fmt(CUOTAS_NRUS.categoria1.topeIngresosMensual.valor + 1)} y S/ ${fmt(CUOTAS_NRUS.categoria2.topeIngresosMensual.valor)}/mes`;

    return {
      regimenRecomendado: "NRUS",
      regimenAlternativo: "RMT",
      explicacion:
        `El Nuevo RUS (Nuevo Régimen Único Simplificado) es ideal para ti: pagas una cuota fija muy pequeña ` +
        `(${cuotaOrientativa}) y no tienes que llevar libros ni presentar declaración anual. ` +
        "Perfecto si vendes solo a personas o familias y todavía eres un negocio pequeño.",
      razones: [
        `Tus ventas están dentro del límite del NRUS (hasta S/ ${fmt(NRUS_PARAMS.topeIngresosAnual.valor)} al año = S/ ${fmt(NRUS_PARAMS.topeIngresosMensual!.valor)} por mes).`,
        "No necesitas emitir facturas — solo boletas, que es todo lo que necesitan tus clientes.",
        `Cuota fija: S/ ${fmt(CUOTAS_NRUS.categoria1.cuotaMensual.valor)}/mes o S/ ${fmt(CUOTAS_NRUS.categoria2.cuotaMensual.valor)}/mes. Sin sorpresas.`,
        "Cero libros contables. Sin Declaración Jurada Anual.",
        "Es el régimen con menor carga administrativa de todo el sistema tributario peruano.",
      ],
      advertencias: [
        `En el NRUS no puedes emitir facturas. Si en el futuro quieres vender a empresas, municipios o al Estado, deberás cambiar de régimen — considera el RMT como alternativa de crecimiento.`,
        `Si en algún mes tus ventas superan S/ ${fmt(NRUS_PARAMS.topeIngresosMensual!.valor)}, debes pagar la cuota mayor o cambiar de régimen. SUNAT cruza tus comprobantes electrónicos.`,
        "El cambio a un régimen mayor lo puedes hacer en cualquier mes del año. Volver al NRUS solo en enero (junto con la declaración de diciembre).",
      ],
      tabla: construirTabla("NRUS", "RMT"),
    };
  }

  // ── Caso 3: RG si por algún motivo RMT no aplica (seguridad) ─────────────

  if (!puedeRMT) {
    return {
      regimenRecomendado: "RG",
      regimenAlternativo: null,
      explicacion:
        "Con las características de tu negocio, el Régimen General es el indicado para ti.",
      razones: ["Tus ingresos o el tipo de actividad no permiten acceder a los regímenes especiales."],
      advertencias: [],
      tabla: construirTabla("RG", null),
    };
  }

  // ── Caso 4 (principal): RMT vs RER ───────────────────────────────────────
  // El RMT es mejor que el RER en casi todos los escenarios:
  // RER cobra 1.5% sobre ventas brutas aunque no haya ganancia.
  // RMT cobra solo sobre la ganancia real y con tasa menor (10%).

  const advertencias: string[] = [];

  if (puedeRER && margenUtilidad === "incierto_o_negativo") {
    advertencias.push(
      `El Régimen Especial (RER) cobraría 1.5% sobre tus INGRESOS aunque tengas pérdidas. ` +
      `Si vendes S/ 10,000 en un mes, pagarías S/ 150 — sin importar si ganaste o perdiste dinero. ` +
      `El RMT que te recomendamos cobra solo sobre tu GANANCIA REAL.`,
    );
  }

  if (puedeRER && margenUtilidad === "bajo") {
    advertencias.push(
      `Con márgenes de ganancia bajos, el RER (1.5% sobre ventas) puede resultar más caro que el RMT (${TASAS_IR.rmt.tramoHasta15UIT.valor}% sobre ganancia). ` +
      `Ejemplo: si vendes S/ 100,000 con 5% de ganancia (S/ 5,000 de utilidad), ` +
      `RER te cobraría S/ 1,500 y RMT solo S/ 500.`,
    );
  }

  if (tipoActividad === "produccion") {
    advertencias.push(
      "Las actividades de producción o manufactura pueden tener restricciones en el RER. " +
      "Confirma con un contador o directamente en SUNAT si tu actividad específica está permitida antes de inscribirte en ese régimen.",
    );
  }

  if (rangoIngresos === "hasta_1700uit") {
    advertencias.push(
      `Si en algún año tus ingresos superan S/ ${fmt(RMT_PARAMS.topeIngresosAnual.valor)} (${RMT_PARAMS.topeUIT!.valor.toLocaleString()} UIT), ` +
      "debes cambiarte al Régimen General. SUNAT lo detecta cruzando tus facturas electrónicas y puede incluirte de oficio con multas.",
    );
  }

  advertencias.push(
    "Inscríbete en REMYPE (Ministerio de Trabajo, en línea con tu RUC, gratis) antes de contratar tu primer trabajador. Esto te da acceso a costos laborales reducidos que pueden representar hasta S/ 5,000 menos al año por trabajador.",
  );

  const alternativo: RegimeId = puedeRER ? "RER" : "RG";

  const limite15UIT = TASAS_IR.rmt.limite15UITEnSoles.valor;
  const tasa1 = TASAS_IR.rmt.tramoHasta15UIT.valor;
  const tasa2 = TASAS_IR.rmt.tramoExceso15UIT.valor;

  let explicacion: string;
  if (margenUtilidad === "incierto_o_negativo") {
    explicacion =
      `El Régimen MYPE Tributario (RMT) es la opción más segura cuando estás empezando. ` +
      `Si tienes pérdidas, no pagas Impuesto a la Renta — solo pagas a cuenta ${TASAS_IR.pagoACuentaMinimo.valor}% de tus ventas mensualmente, ` +
      `que luego se ajusta al declarar el año. Así nunca pagas más de lo que ganas.`;
  } else {
    explicacion =
      `El Régimen MYPE Tributario (RMT) te da la tasa de impuesto más baja del sistema: ` +
      `${tasa1}% sobre las primeras S/ ${fmt(limite15UIT)} de ganancia anual ` +
      `y ${tasa2}% sobre el exceso. Solo pagas sobre lo que realmente ganas — nunca sobre tus ventas brutas.`;
  }

  return {
    regimenRecomendado: "RMT",
    regimenAlternativo: alternativo,
    explicacion,
    razones: [
      "Pagas impuesto solo sobre tu GANANCIA REAL — no sobre tus ventas totales.",
      `Tasa ${tasa1}% para las primeras 15 UIT de ganancia (S/ ${fmt(limite15UIT)}) — la tasa de Renta más baja disponible.`,
      "Puedes emitir facturas, boletas y todos los comprobantes — vendes a empresas y al Estado.",
      "Puedes descontar todos tus costos del negocio (mercadería, alquiler, sueldos, servicios).",
      margenUtilidad === "incierto_o_negativo"
        ? "Si tienes pérdidas en el año, no pagas Impuesto a la Renta. El RER te hubiera cobrado igual."
        : `Los pagos mensuales del ${TASAS_IR.pagoACuentaMinimo.valor}% son adelantos. Si pagaste de más, SUNAT te reconoce un saldo a favor.`,
    ],
    advertencias,
    tabla: construirTabla("RMT", alternativo),
  };
}

// ---------------------------------------------------------------------------
// Helpers para el componente UI
// ---------------------------------------------------------------------------

/** Devuelve el nombre completo de un régimen para mostrar en la UI */
export function nombreRegimen(id: RegimeId): string {
  return DATOS[id].nombreCorto;
}

/** Verdadero si todas las preguntas han sido respondidas */
export function wizardCompleto(r: Respuestas): boolean {
  return PREGUNTAS.every((p) => r[p.id] !== undefined);
}
