import {
  COSTOS_FORMALIZACION as CF,
  FACTURACION_ELECTRONICA as FE,
  UIT,
} from "@/config/parametros-peru";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(n);

const s = (n: number) => `S/ ${fmt(n)}`;

export type TipoEmpresaId = "pn" | "eirl" | "sac" | "srl" | "sacs";

export interface PasoFormalizacion {
  id: string;
  titulo: string;
  descripcion: string;
  costoTexto: string;
  tiempoTexto: string;
  enlacesOficiales: Array<{ texto: string; url: string }>;
  advertenciaTexto: string | null;
  opcional: boolean;
  notaAdicional?: string;
}

export interface TipoEmpresa {
  id: TipoEmpresaId;
  nombre: string;
  nombreCorto: string;
  emoji: string;
  paraQuien: string;
  socios: string;
  responsabilidad: string;
  costoResumen: string;
  tiempoResumen: string;
  ventajas: string[];
  desventajas: string[];
  pasos: PasoFormalizacion[];
}

export const TEXTO_ADVERTENCIA_FE =
  `IMPORTANTE (${FE.obligatoriedadNuevosRUC.fuente}): ` +
  `Si te inscribes en RER, RMT o RG, eres emisor electrónico desde el mismo día que obtienes tu RUC. ` +
  `Debes tener lista tu solución de facturación electrónica ANTES de tu primera venta. ` +
  `La multa por no emitir comprobante va de ` +
  `${s(FE.multaNoEmitirMinimo.valor * UIT.valor)} ` +
  `a ${s(FE.multaNoEmitirMaximo.valor * UIT.valor)} (SUNAT 2026).`;

// ---------------------------------------------------------------------------
// Shared step builders
// ---------------------------------------------------------------------------

function pasoRucPJ(tipoId: string): PasoFormalizacion {
  return {
    id: `${tipoId}-ruc`,
    titulo: "Obtén el RUC de la empresa en SUNAT",
    descripcion:
      "Con la partida registral de SUNARP, el representante legal inscribe la empresa en SUNAT y obtiene el RUC de 11 dígitos. Necesitarás tu DNI y clave SOL.",
    costoTexto: "Gratis",
    tiempoTexto: "1–5 días",
    enlacesOficiales: [{ texto: "SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
    advertenciaTexto: null,
    opcional: false,
  };
}

function pasoRegimenPJ(tipoId: string): PasoFormalizacion {
  return {
    id: `${tipoId}-regimen`,
    titulo: "Elige el régimen tributario",
    descripcion:
      "Al inscribir la empresa en SUNAT elegirás su régimen. Las personas jurídicas (EIRL, SAC, SRL, SACS) no pueden estar en NRUS — solo RER, RMT o RG.",
    costoTexto: "Gratis (mismo trámite del RUC)",
    tiempoTexto: "Mismo día",
    enlacesOficiales: [{ texto: "SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
    advertenciaTexto: TEXTO_ADVERTENCIA_FE,
    opcional: false,
  };
}

function pasoFacturacionPJ(tipoId: string): PasoFormalizacion {
  return {
    id: `${tipoId}-facturacion`,
    titulo: "Configura tu facturación electrónica",
    descripcion:
      "Las personas jurídicas inscritas en RER, RMT o RG son emisores electrónicos desde el día 1. SUNAT ofrece el portal SEE-SOL gratuito. También hay proveedores de software desde S/ 30/mes si necesitas más funciones.",
    costoTexto: "Gratis (portal SUNAT) o desde S/ 30/mes con proveedor",
    tiempoTexto: "1–3 días",
    enlacesOficiales: [{ texto: "SEE-SOL en SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
    advertenciaTexto: null,
    opcional: false,
  };
}

function pasoLicenciaPJ(tipoId: string): PasoFormalizacion {
  return {
    id: `${tipoId}-licencia`,
    titulo: "Licencia de funcionamiento municipal",
    descripcion:
      "Si operarás desde un local comercial o taller, tramítala en la municipalidad del distrito donde estará tu negocio. Si trabajas de forma digital o desde casa, consulta con tu municipio si aplica.",
    costoTexto: `S/ ${fmt(CF.licenciaFuncionamiento.costoMinimo.valor)}–${fmt(CF.licenciaFuncionamiento.costoMaximo.valor)}`,
    tiempoTexto: CF.licenciaFuncionamiento.tiempoEstimadoDias.valor,
    enlacesOficiales: [{ texto: "gob.pe / trámites municipales", url: "https://www.gob.pe" }],
    advertenciaTexto: null,
    opcional: true,
  };
}

function pasoRemypePJ(tipoId: string): PasoFormalizacion {
  return {
    id: `${tipoId}-remype`,
    titulo: "Inscríbete en REMYPE (antes de contratar personal)",
    descripcion:
      "El Registro Nacional de la Micro y Pequeña Empresa (REMYPE) te da acceso al régimen laboral especial con menores costos laborales. Hazlo online con el RUC y clave SOL antes de tu primera contratación.",
    costoTexto: "Gratis",
    tiempoTexto: "Mismo día (online)",
    enlacesOficiales: [{ texto: "gob.pe / MTPE", url: "https://www.gob.pe" }],
    advertenciaTexto: null,
    opcional: true,
  };
}

// ---------------------------------------------------------------------------
// Steps per type
// ---------------------------------------------------------------------------

function crearPasosPN(): PasoFormalizacion[] {
  return [
    {
      id: "pn-ruc",
      titulo: "Obtén tu RUC en SUNAT",
      descripcion:
        "Puedes sacarlo en línea en SUNAT.gob.pe con tu DNI y clave SOL en menos de 15 minutos. También puedes ir a cualquier oficina SUNAT. El RUC es tu número de identificación fiscal de 11 dígitos.",
      costoTexto: "Gratis",
      tiempoTexto: `${CF.personaNatural.tiempoEstimadoDias.valor} día`,
      enlacesOficiales: [{ texto: "SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    {
      id: "pn-regimen",
      titulo: "Elige tu régimen tributario",
      descripcion:
        "Al registrar tu RUC, SUNAT te preguntará en qué régimen quieres estar. Si no sabes cuál elegir, usa el wizard de ContaPerú antes de hacer este trámite.",
      costoTexto: "Gratis (en el mismo trámite del RUC)",
      tiempoTexto: "Mismo día",
      enlacesOficiales: [{ texto: "SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
      advertenciaTexto: TEXTO_ADVERTENCIA_FE,
      opcional: false,
    },
    {
      id: "pn-facturacion",
      titulo: "Configura tu facturación electrónica",
      descripcion:
        "Solo si elegiste RER, RMT o RG: debes tener lista tu solución de facturación electrónica antes de la primera venta. SUNAT ofrece el portal gratuito SEE-SOL. Si elegiste NRUS, puedes saltarte este paso.",
      costoTexto: "Gratis con portal SUNAT o desde S/ 30/mes con proveedor",
      tiempoTexto: "1–3 días",
      enlacesOficiales: [{ texto: "SEE-SOL en SUNAT.gob.pe", url: "https://www.sunat.gob.pe" }],
      advertenciaTexto: null,
      opcional: true,
      notaAdicional: "Solo aplica si elegiste RER, RMT o RG. No necesario en NRUS.",
    },
    {
      id: "pn-licencia",
      titulo: "Licencia de funcionamiento municipal",
      descripcion:
        "Si operarás desde un local comercial o taller, tramítala en la municipalidad del distrito de tu negocio. Si trabajas desde casa o de forma 100% digital, consulta con tu municipio si aplica.",
      costoTexto: `S/ ${fmt(CF.licenciaFuncionamiento.costoMinimo.valor)}–${fmt(CF.licenciaFuncionamiento.costoMaximo.valor)}`,
      tiempoTexto: CF.licenciaFuncionamiento.tiempoEstimadoDias.valor,
      enlacesOficiales: [{ texto: "gob.pe / trámites municipales", url: "https://www.gob.pe" }],
      advertenciaTexto: null,
      opcional: true,
    },
  ];
}

function crearPasosPJTradicional(tipoId: "eirl" | "sac" | "srl"): PasoFormalizacion[] {
  const termino = tipoId === "eirl" ? "el titular" : "los socios";
  return [
    {
      id: `${tipoId}-nombre`,
      titulo: "Verifica y reserva el nombre en SUNARP",
      descripcion: `Busca en el buscador de SUNARP que el nombre que quieres no esté tomado. Si está disponible, resérvalo por 30 días pagando ${s(CF.pjTradicional.reservaNombreSUNARP.valor)}. La reserva vence si no completas la constitución a tiempo.`,
      costoTexto: s(CF.pjTradicional.reservaNombreSUNARP.valor),
      tiempoTexto: "1–2 días",
      enlacesOficiales: [{ texto: "SUNARP.gob.pe", url: "https://www.sunarp.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    {
      id: `${tipoId}-minuta`,
      titulo: "Elabora la minuta de constitución",
      descripcion:
        "Es el documento que define el nombre, capital, objeto social (qué actividades hará) y la estructura de tu empresa. Puedes hacerlo con un abogado, en una notaría o en un Centro de Desarrollo Empresarial (CDE) o MAC.",
      costoTexto: CF.pjTradicional.minutaAbogado.valor,
      tiempoTexto: "2–5 días",
      enlacesOficiales: [{ texto: "gob.pe (CDE / MAC)", url: "https://www.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    {
      id: `${tipoId}-escritura`,
      titulo: "Escritura pública en notaría",
      descripcion: `El notario convierte la minuta en escritura pública. ${termino.charAt(0).toUpperCase() + termino.slice(1)} debe${tipoId === "eirl" ? "" : "n"} firmar presencialmente (o autorizar por poder notarial). Lleva la minuta y el pago de aranceles.`,
      costoTexto: CF.pjTradicional.escrituraPublicaNotarial.valor,
      tiempoTexto: "1–3 días",
      enlacesOficiales: [],
      advertenciaTexto: null,
      opcional: false,
    },
    {
      id: `${tipoId}-sunarp`,
      titulo: "Inscripción en SUNARP",
      descripcion:
        "La notaría envía la escritura a SUNARP por ti (vía SID-SUNARP). Cuando SUNARP la califica y aprueba, tu empresa queda oficialmente constituida y existe legalmente.",
      costoTexto: `${s(CF.pjTradicional.inscripcionSUNARPCalificacion.valor)} calificación + ${s(CF.pjTradicional.inscripcionSUNARPGerente.valor)} nombramiento + ${s(CF.pjTradicional.inscripcionSUNARPCapitalPorMiliar.valor)}/millar del capital`,
      tiempoTexto: "24–72 horas hábiles",
      enlacesOficiales: [{ texto: "SUNARP.gob.pe", url: "https://www.sunarp.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    pasoRucPJ(tipoId),
    pasoRegimenPJ(tipoId),
    pasoFacturacionPJ(tipoId),
    pasoLicenciaPJ(tipoId),
    pasoRemypePJ(tipoId),
  ];
}

function crearPasosSACS(): PasoFormalizacion[] {
  return [
    {
      id: "sacs-dnie",
      titulo: "Verifica que todos los socios tienen DNI electrónico (DNIe)",
      descripcion:
        "El proceso SACS requiere DNIe para todos los socios. Revisa el reverso de tu DNI: si tiene un chip dorado o zona NFC (contactless), tienes DNIe. Si no, debes renovarlo en RENIEC antes de continuar.",
      costoTexto: "Gratis (si ya tienes DNIe)",
      tiempoTexto: "Verificación inmediata",
      enlacesOficiales: [{ texto: "RENIEC.gob.pe", url: "https://www.reniec.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
      notaAdicional: "Si no tienes DNIe, puedes constituir como SAC o SRL por el proceso tradicional.",
    },
    {
      id: "sacs-portal",
      titulo: "Ingresa al SID Ciudadano de SUNARP",
      descripcion:
        "El SID Ciudadano es el portal de SUNARP para la constitución 100% digital. Accede con tu DNIe usando un lector de tarjeta inteligente o celular compatible con NFC.",
      costoTexto: "Incluido en el costo total",
      tiempoTexto: "Online",
      enlacesOficiales: [{ texto: "SID Ciudadano (SUNARP)", url: "https://sid.sunarp.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    {
      id: "sacs-constitucion",
      titulo: "Completa la constitución digital en SUNARP",
      descripcion: `Desde el portal SID Ciudadano, ingresa los datos: nombre, socios, capital, objeto social. Firma digitalmente con tu DNIe y paga los aranceles online. Sin notario. Costo total estimado: ~${s(CF.sacsDigital.costoTotalAproximado.valor)}.`,
      costoTexto: `~${s(CF.sacsDigital.costoTotalAproximado.valor)} total (sin notario)`,
      tiempoTexto: "3–7 días hábiles",
      enlacesOficiales: [{ texto: "SID Ciudadano (SUNARP)", url: "https://sid.sunarp.gob.pe" }],
      advertenciaTexto: null,
      opcional: false,
    },
    pasoRucPJ("sacs"),
    pasoRegimenPJ("sacs"),
    pasoFacturacionPJ("sacs"),
    pasoLicenciaPJ("sacs"),
    pasoRemypePJ("sacs"),
  ];
}

// ---------------------------------------------------------------------------
// Main data export
// ---------------------------------------------------------------------------

export const TIPOS_EMPRESA: TipoEmpresa[] = [
  {
    id: "pn",
    nombre: "Persona Natural con Negocio",
    nombreCorto: "Pers. Natural",
    emoji: "👤",
    paraQuien: "Emprendedor(a) solo(a), negocio pequeño sin socios",
    socios: "Solo tú (1 persona)",
    responsabilidad: "⚠️ Ilimitada — responde tu patrimonio personal",
    costoResumen: "Gratis",
    tiempoResumen: "1 día",
    ventajas: [
      "Costo cero de constitución",
      "Trámite en 1 día, 100% online",
      "Sin capital mínimo ni notario",
      "La forma más rápida de empezar a facturar",
    ],
    desventajas: [
      "Tu casa, carro y ahorros responden ante deudas del negocio",
      "No puedes tener socios formales",
      "Algunos bancos o clientes corporativos prefieren personas jurídicas",
    ],
    pasos: crearPasosPN(),
  },
  {
    id: "eirl",
    nombre: "Empresa Individual de Responsabilidad Limitada (EIRL)",
    nombreCorto: "EIRL",
    emoji: "🏢",
    paraQuien: "Emprendedor(a) solo(a) que quiere proteger su patrimonio personal",
    socios: "Solo tú (1 titular)",
    responsabilidad: "Limitada — solo responde el capital de la empresa",
    costoResumen: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
    tiempoResumen: "2–4 semanas",
    ventajas: [
      "Patrimonio personal protegido",
      "Mayor credibilidad ante bancos y clientes corporativos",
      "Puedes contratar personal y crecer",
    ],
    desventajas: [
      "Solo 1 titular — no puedes tener socios",
      "Requiere notario, abogado y SUNARP",
      "Si quieres socios en el futuro, debes transformar la empresa",
    ],
    pasos: crearPasosPJTradicional("eirl"),
  },
  {
    id: "sac",
    nombre: "Sociedad Anónima Cerrada (SAC)",
    nombreCorto: "SAC",
    emoji: "🤝",
    paraQuien: "2 o más personas que quieren montar un negocio juntas",
    socios: "2 a 20 accionistas",
    responsabilidad: "Limitada — solo responde el capital de la empresa",
    costoResumen: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
    tiempoResumen: "2–4 semanas",
    ventajas: [
      "Patrimonio personal protegido",
      "El tipo de empresa más usado en Perú para negocios medianos",
      "Fácil ingreso y salida de socios (por transferencia de acciones)",
      "Mejor acceso a financiamiento bancario",
    ],
    desventajas: [
      "Requiere mínimo 2 socios",
      "Notario + SUNARP obligatorios",
      "Más caro y lento que EIRL o SACS",
    ],
    pasos: crearPasosPJTradicional("sac"),
  },
  {
    id: "srl",
    nombre: "Sociedad de Responsabilidad Limitada (SRL)",
    nombreCorto: "SRL",
    emoji: "🏗️",
    paraQuien: "Negocios familiares o grupos de profesionales (2–20 socios)",
    socios: "2 a 20 socios (participaciones, no acciones)",
    responsabilidad: "Limitada — solo responde el capital de la empresa",
    costoResumen: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
    tiempoResumen: "2–4 semanas",
    ventajas: [
      "Patrimonio personal protegido",
      "Mayor privacidad: las participaciones no se transfieren libremente",
      "Buena opción para negocios familiares o grupos cerrados de profesionales",
    ],
    desventajas: [
      "Requiere mínimo 2 socios",
      "Las participaciones son menos líquidas que las acciones de una SAC",
      "Mismo costo y tiempo que una SAC",
    ],
    pasos: crearPasosPJTradicional("srl"),
  },
  {
    id: "sacs",
    nombre: "Sociedad Anónima Cerrada Simplificada (SACS) — Digital",
    nombreCorto: "SACS Digital",
    emoji: "💻",
    paraQuien: "Emprendedores con DNI electrónico que quieren constituir rápido y barato",
    socios: "Hasta 20 socios (solo personas naturales con DNIe)",
    responsabilidad: "Limitada — solo responde el capital de la empresa",
    costoResumen: `~${s(CF.sacsDigital.costoTotalAproximado.valor)}`,
    tiempoResumen: "3–7 días",
    ventajas: [
      "Sin notario — 100% digital y desde casa",
      `El más barato entre los tipos con socios (~${s(CF.sacsDigital.costoTotalAproximado.valor)})`,
      "Proceso en 3–7 días hábiles",
      "Patrimonio personal protegido",
    ],
    desventajas: [
      "Todos los socios deben tener DNI electrónico (chip en el DNI)",
      "Solo personas naturales como socios — no puede haber empresas socias",
      "Proceso más reciente, algunos bancos aún no lo conocen bien",
    ],
    pasos: crearPasosSACS(),
  },
];

export const FILAS_COMPARATIVA: Array<{
  aspecto: string;
  valores: Record<TipoEmpresaId, string>;
}> = [
  {
    aspecto: "Socios requeridos",
    valores: { pn: "Solo tú", eirl: "Solo tú", sac: "2 a 20", srl: "2 a 20", sacs: "Hasta 20" },
  },
  {
    aspecto: "Responsabilidad personal",
    valores: {
      pn: "⚠️ Ilimitada",
      eirl: "✅ Limitada",
      sac: "✅ Limitada",
      srl: "✅ Limitada",
      sacs: "✅ Limitada",
    },
  },
  {
    aspecto: "Costo estimado",
    valores: {
      pn: "Gratis",
      eirl: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
      sac: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
      srl: `S/ ${fmt(CF.pjTradicional.totalEstimadoMinimo.valor)}–${fmt(CF.pjTradicional.totalEstimadoMaximo.valor)}`,
      sacs: `~${s(CF.sacsDigital.costoTotalAproximado.valor)}`,
    },
  },
  {
    aspecto: "Tiempo estimado",
    valores: {
      pn: "1 día",
      eirl: "2–4 semanas",
      sac: "2–4 semanas",
      srl: "2–4 semanas",
      sacs: "3–7 días",
    },
  },
  {
    aspecto: "100% digital",
    valores: {
      pn: "✅ Sí",
      eirl: "❌ Requiere notario",
      sac: "❌ Requiere notario",
      srl: "❌ Requiere notario",
      sacs: "✅ Sin notario",
    },
  },
  {
    aspecto: "Capital mínimo",
    valores: {
      pn: "No aplica",
      eirl: "Ninguno",
      sac: "Ninguno",
      srl: "Ninguno",
      sacs: "Ninguno",
    },
  },
  {
    aspecto: "¿Emite facturas?",
    valores: {
      pn: "✅ Sí (no en NRUS)",
      eirl: "✅ Sí",
      sac: "✅ Sí",
      srl: "✅ Sí",
      sacs: "✅ Sí",
    },
  },
];

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

export function contarCompletados(
  pasos: PasoFormalizacion[],
  estado: Record<string, boolean>
): { completados: number; total: number } {
  return {
    completados: pasos.filter((p) => estado[p.id] === true).length,
    total: pasos.length,
  };
}

export function exportarTexto(
  tipo: TipoEmpresa,
  estado: Record<string, boolean>
): string {
  const { completados, total } = contarCompletados(tipo.pasos, estado);
  const lineas: string[] = [
    `CHECKLIST DE FORMALIZACIÓN — ${tipo.nombre}`,
    `ContaPerú · Datos verificados: junio 2026`,
    ``,
    `Progreso: ${completados} de ${total} pasos completados`,
    ``,
  ];
  tipo.pasos.forEach((paso, i) => {
    const hecho = estado[paso.id] === true;
    lineas.push(`${hecho ? "✓" : "○"} Paso ${i + 1}: ${paso.titulo}${paso.opcional ? " (Opcional)" : ""}`);
    lineas.push(`   ${paso.descripcion}`);
    lineas.push(`   Costo: ${paso.costoTexto}`);
    lineas.push(`   Tiempo: ${paso.tiempoTexto}`);
    if (paso.enlacesOficiales.length > 0) {
      lineas.push(`   Links: ${paso.enlacesOficiales.map((l) => l.url).join(", ")}`);
    }
    lineas.push(``);
  });
  lineas.push(`---`);
  lineas.push(`Aviso legal: información referencial. Consulta con un contador público colegiado antes de tomar decisiones.`);
  return lineas.join("\n");
}
