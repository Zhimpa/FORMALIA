export type GlosarioCategoria =
  | "contabilidad"
  | "tributario"
  | "regimen"
  | "sistema"
  | "comprobante"
  | "laboral"
  | "empresa";

export interface GlosarioTermino {
  termino: string;
  sigla?: string;
  categoria: GlosarioCategoria;
  definicion: string;
  ejemplo: string;
}

export const CATEGORIA_LABEL: Record<GlosarioCategoria, string> = {
  contabilidad: "Contabilidad",
  tributario: "Tributario",
  regimen: "Régimen",
  sistema: "Sistema SUNAT",
  comprobante: "Comprobante",
  laboral: "Laboral",
  empresa: "Empresa",
};

export const CATEGORIA_COLOR: Record<GlosarioCategoria, string> = {
  contabilidad: "bg-marca-100 text-marca-700 border-marca-200",
  tributario: "bg-advertencia-100 text-advertencia-800 border-advertencia-200",
  regimen: "bg-info-100 text-info-800 border-info-200",
  sistema: "bg-exito-100 text-exito-800 border-exito-200",
  comprobante: "bg-neutral-100 text-neutral-700 border-neutral-200",
  laboral: "bg-peligro-100 text-peligro-800 border-peligro-200",
  empresa: "bg-marca-50 text-marca-700 border-marca-200",
};

/** Normaliza un texto para búsqueda: minúsculas sin tildes */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

const _TERMINOS_RAW: GlosarioTermino[] = [
  // ---------------------------------------------------------------------------
  // Contabilidad
  // ---------------------------------------------------------------------------
  {
    termino: "Activo",
    categoria: "contabilidad",
    definicion:
      "Todo recurso económico que posee el negocio y del que se espera obtener un beneficio futuro. Se ordena de más a menos líquido.",
    ejemplo:
      "Caja S/ 2,000, mercadería S/ 15,000, camioneta S/ 35,000 y local propio S/ 120,000 son activos.",
  },
  {
    termino: "Pasivo",
    categoria: "contabilidad",
    definicion:
      "Obligaciones y deudas del negocio con terceros: bancos, proveedores, Estado. El pasivo reduce el patrimonio del dueño.",
    ejemplo:
      "Préstamo bancario S/ 20,000, proveedores por pagar S/ 3,500 e IGV del mes S/ 1,800 son pasivos.",
  },
  {
    termino: "Patrimonio",
    categoria: "contabilidad",
    definicion:
      "La diferencia entre lo que el negocio tiene (activo) y lo que debe (pasivo). Es lo que realmente le pertenece a los dueños.",
    ejemplo:
      "Si tu negocio tiene activos por S/ 80,000 y deudas por S/ 30,000, tu patrimonio es S/ 50,000.",
  },
  {
    termino: "Ecuación contable",
    categoria: "contabilidad",
    definicion:
      "La identidad fundamental: Activo = Pasivo + Patrimonio. Siempre se cumple, sin excepción.",
    ejemplo: "Activo S/ 80,000 = Pasivo S/ 30,000 + Patrimonio S/ 50,000.",
  },
  {
    termino: "Partida doble",
    categoria: "contabilidad",
    definicion:
      "Principio contable que dice que toda operación afecta al menos dos cuentas en sentidos opuestos, manteniendo la ecuación en equilibrio.",
    ejemplo:
      "Cuando cobras S/ 500 en efectivo por una venta, la caja sube S/ 500 (activo) y los ingresos suben S/ 500. El Debe y el Haber siempre cuadran.",
  },
  {
    termino: "Debe",
    categoria: "contabilidad",
    definicion:
      "Columna izquierda del asiento contable. Los activos y gastos aumentan cuando se anotan en el Debe.",
    ejemplo:
      "Al comprar mercadería por S/ 1,000 en efectivo, la cuenta de Mercaderías se anota en el Debe por S/ 1,000.",
  },
  {
    termino: "Haber",
    categoria: "contabilidad",
    definicion:
      "Columna derecha del asiento contable. Los pasivos, patrimonio e ingresos aumentan cuando se anotan en el Haber.",
    ejemplo:
      "Al vender por S/ 1,000, la cuenta de Ventas se anota en el Haber por S/ 1,000.",
  },
  {
    termino: "Asiento contable",
    categoria: "contabilidad",
    definicion:
      "El registro de una operación en el Libro Diario. Indica la fecha, las cuentas involucradas y los montos en el Debe y el Haber.",
    ejemplo:
      "Un asiento de venta al contado de S/ 1,180 (incluye IGV) registra: Debe Caja 1,180 / Haber IGV 180, Haber Ventas 1,000.",
  },
  {
    termino: "Libro Diario",
    categoria: "contabilidad",
    definicion:
      "Libro contable obligatorio donde se registran todas las operaciones en orden cronológico como asientos de partida doble.",
    ejemplo:
      "Para negocios con ingresos hasta 300 UIT existe el Libro Diario de Formato Simplificado (versión abreviada).",
  },
  {
    termino: "Libro Mayor",
    categoria: "contabilidad",
    definicion:
      "Libro donde se trasladan los asientos del Diario agrupados por cuenta, para conocer el saldo de cada una.",
    ejemplo:
      "El Mayor de la cuenta 70 (Ventas) muestra todas las ventas del mes y su total acumulado: S/ 45,000.",
  },
  {
    termino: "Balance de comprobación",
    categoria: "contabilidad",
    definicion:
      "Lista de todas las cuentas con sus saldos al cierre del periodo. Verifica que la suma del Debe sea igual a la suma del Haber.",
    ejemplo:
      "Si el Debe suma S/ 280,000 y el Haber también suma S/ 280,000, el balance de comprobación cuadra correctamente.",
  },
  {
    termino: "Devengado",
    categoria: "contabilidad",
    definicion:
      "Principio que indica que los ingresos y gastos se registran cuando ocurre la operación económica, no cuando se cobra o paga el dinero.",
    ejemplo:
      "Si vendes en noviembre pero el cliente paga en enero, el ingreso se registra en noviembre (cuando devengó), no en enero.",
  },
  {
    termino: "Depreciación",
    categoria: "contabilidad",
    definicion:
      "Distribución del costo de un activo fijo a lo largo de su vida útil. Refleja el desgaste o agotamiento del bien.",
    ejemplo:
      "Una computadora de S/ 4,000 con vida útil de 4 años genera una depreciación de S/ 1,000 al año (S/ 83.33/mes).",
  },
  {
    termino: "Provisión",
    categoria: "contabilidad",
    definicion:
      "Reserva contable para cubrir una pérdida probable o un gasto futuro aún no definitivo. Se registra cuando es probable y estimable.",
    ejemplo:
      "Si un cliente con deuda de S/ 5,000 lleva 18 meses sin pagar, se provisiona como cobranza dudosa.",
  },
  {
    termino: "Cobranza dudosa",
    categoria: "contabilidad",
    definicion:
      "Crédito por cobrar cuya recuperación es incierta. Se provisiona contablemente para reflejar la pérdida probable.",
    ejemplo:
      "Para deducirla tributariamente, la deuda debe estar vencida más de 12 meses y deben existir gestiones de cobro documentadas.",
  },
  {
    termino: "Kárdex",
    categoria: "contabilidad",
    definicion:
      "Registro detallado de las entradas, salidas y saldo de cada producto en el inventario. Puede ser físico o en sistema.",
    ejemplo:
      "El kárdex de 'Arroz Costeño 5kg' muestra: saldo inicial 100 bolsas, entradas 200, ventas 150, saldo final 150 bolsas.",
  },
  {
    termino: "Conciliación bancaria",
    categoria: "contabilidad",
    definicion:
      "Proceso de comparar el saldo del libro de bancos con el estado de cuenta bancario para identificar y explicar diferencias.",
    ejemplo:
      "El banco muestra S/ 8,200 pero el libro de bancos S/ 7,900. La diferencia de S/ 300 es un cheque emitido pero aún no cobrado.",
  },
  {
    termino: "Capital de trabajo",
    categoria: "contabilidad",
    definicion:
      "Diferencia entre el activo corriente y el pasivo corriente. Representa la liquidez operativa del negocio para el día a día.",
    ejemplo:
      "Activo corriente S/ 50,000 − Pasivo corriente S/ 32,000 = Capital de trabajo S/ 18,000.",
  },
  {
    termino: "Margen de contribución",
    categoria: "contabilidad",
    definicion:
      "Precio de venta menos el costo variable unitario. Es lo que cada unidad vendida aporta para cubrir costos fijos y generar ganancia.",
    ejemplo:
      "Vendes una polera a S/ 50, el costo variable es S/ 28. Margen de contribución = S/ 22 por unidad.",
  },
  {
    termino: "Punto de equilibrio",
    categoria: "contabilidad",
    definicion:
      "Nivel de ventas donde los ingresos son exactamente iguales a los costos totales: no hay ganancia ni pérdida.",
    ejemplo:
      "Con costos fijos de S/ 5,000 y margen de contribución de S/ 25, el PE es 200 unidades (S/ 10,000 en ventas).",
  },
  {
    termino: "ROE",
    sigla: "ROE",
    categoria: "contabilidad",
    definicion:
      "Return On Equity. Rentabilidad sobre el patrimonio. Mide cuánto rinde el dinero invertido por los dueños.",
    ejemplo:
      "Si el patrimonio es S/ 40,000 y la utilidad neta S/ 12,000, el ROE es 30% anual.",
  },
  {
    termino: "ROA",
    sigla: "ROA",
    categoria: "contabilidad",
    definicion:
      "Return On Assets. Rentabilidad sobre el total de activos, sin importar cómo se financiaron.",
    ejemplo:
      "Si los activos son S/ 100,000 y la utilidad neta S/ 12,000, el ROA es 12%.",
  },
  {
    termino: "CIF",
    sigla: "CIF",
    categoria: "contabilidad",
    definicion:
      "Costos Indirectos de Fabricación. Costos de producción que no se pueden asignar directamente a un producto: alquiler del taller, luz, depreciación.",
    ejemplo:
      "Alquiler de taller S/ 1,500 + luz S/ 200 + depreciación máquinas S/ 400 = CIF mensual S/ 2,100.",
  },
  {
    termino: "PEPS",
    sigla: "PEPS",
    categoria: "contabilidad",
    definicion:
      "Primeras Entradas, Primeras Salidas (FIFO). Método de valuación de inventarios donde se asume que lo primero que entra es lo primero que sale.",
    ejemplo:
      "Compraste 100 unidades a S/ 10 en enero y 100 a S/ 12 en febrero. Si vendiste 100 unidades, el costo es S/ 1,000 (las de enero, que entraron primero).",
  },
  {
    termino: "Promedio ponderado",
    categoria: "contabilidad",
    definicion:
      "Método de valuación de inventarios donde el costo se calcula dividiendo el costo total entre el total de unidades disponibles.",
    ejemplo:
      "100 unidades a S/ 10 + 100 a S/ 12 = costo total S/ 2,200 entre 200 unidades = S/ 11 por unidad (costo promedio).",
  },
  // ---------------------------------------------------------------------------
  // Tributario
  // ---------------------------------------------------------------------------
  {
    termino: "UIT",
    sigla: "UIT",
    categoria: "tributario",
    definicion:
      "Unidad Impositiva Tributaria. Valor de referencia fijado cada año por el MEF para calcular impuestos, multas, límites de regímenes y beneficios.",
    ejemplo:
      "UIT 2026 = S/ 5,500 (D.S. 301-2025-EF). Una multa de 2 UIT equivale a S/ 11,000.",
  },
  {
    termino: "IGV",
    sigla: "IGV",
    categoria: "tributario",
    definicion:
      "Impuesto General a las Ventas. Tasa del 18% que se aplica al precio de venta. Lo paga el consumidor final; la empresa solo lo recauda para SUNAT.",
    ejemplo:
      "Vendes un producto a S/ 100 + IGV: el cliente paga S/ 118. Tú le entregas S/ 18 a SUNAT (menos el crédito fiscal de tus compras).",
  },
  {
    termino: "Crédito fiscal",
    categoria: "tributario",
    definicion:
      "El IGV que pagaste en tus compras para el negocio. Puedes descontarlo del IGV que cobras a tus clientes antes de pagar a SUNAT.",
    ejemplo:
      "Compraste insumos por S/ 5,000 + IGV S/ 900. Ese S/ 900 es crédito fiscal y lo descuentas de lo que debes a SUNAT este mes.",
  },
  {
    termino: "Débito fiscal",
    categoria: "tributario",
    definicion:
      "El IGV que cobras a tus clientes en tus ventas del mes. Es la parte que le debes a SUNAT antes de descontar el crédito fiscal.",
    ejemplo:
      "Ventas del mes S/ 40,000 sin IGV → débito fiscal = S/ 7,200 (40,000 × 18%).",
  },
  {
    termino: "Impuesto a la Renta",
    categoria: "tributario",
    definicion:
      "Tributo que grava la utilidad (ganancia) del negocio. A diferencia del IGV, este sí sale del bolsillo del empresario.",
    ejemplo:
      "En RMT con utilidad de S/ 60,000: IR = S/ 6,000 (10%). En Régimen General con la misma utilidad: IR = S/ 17,700 (29.5%).",
  },
  {
    termino: "Pago a cuenta",
    categoria: "tributario",
    definicion:
      "Adelanto mensual del Impuesto a la Renta calculado sobre los ingresos del mes. Se descuenta del IR anual al presentar la DJ Anual.",
    ejemplo:
      "RMT con ingresos de S/ 20,000 en mayo: pago a cuenta = S/ 200 (1%). Si al año el IR real es S/ 8,000 y pagaste S/ 3,600 en cuentas, solo debes S/ 4,400 más.",
  },
  {
    termino: "Renta neta imponible",
    categoria: "tributario",
    definicion:
      "La base sobre la que se calcula el Impuesto a la Renta anual. Es la utilidad contable más los gastos no deducibles, menos las deducciones permitidas.",
    ejemplo:
      "Utilidad contable S/ 80,000 + gastos no deducibles S/ 5,000 − deducciones especiales S/ 2,000 = Renta neta imponible S/ 83,000.",
  },
  {
    termino: "Causalidad",
    categoria: "tributario",
    definicion:
      "Principio tributario que exige que un gasto esté relacionado con la generación de ingresos del negocio para ser deducible del Impuesto a la Renta.",
    ejemplo:
      "El alquiler de tu oficina es deducible (necesario para operar). El mantenimiento de tu auto personal no lo es, a menos que lo uses exclusivamente para el negocio.",
  },
  {
    termino: "Bancarización",
    categoria: "tributario",
    definicion:
      "Obligación de pagar mediante medios bancarios (transferencia, cheque, tarjeta) cuando la operación supera S/ 2,000 o US$ 500. Sin bancarización, se pierde el crédito fiscal y la deducción del gasto.",
    ejemplo:
      "Pagas S/ 3,000 en efectivo a un proveedor. Ese gasto no es deducible en el IR y pierdes el crédito fiscal del IGV.",
  },
  {
    termino: "Detracción",
    sigla: "SPOT",
    categoria: "tributario",
    definicion:
      "Sistema de Pago de Obligaciones Tributarias. El comprador deposita un porcentaje del precio en la cuenta del Banco de la Nación del proveedor, antes de pagar el saldo.",
    ejemplo:
      "Contratas transporte por S/ 2,000. Le depositas el 4% (S/ 80) en su cuenta BN y le pagas S/ 1,920 al proveedor. Él usa el S/ 80 solo para pagar impuestos.",
  },
  {
    termino: "ITAN",
    sigla: "ITAN",
    categoria: "tributario",
    definicion:
      "Impuesto Temporal a los Activos Netos. Tasa del 0.4% sobre activos netos que excedan S/ 1 millón. Se aplica a grandes empresas y es crédito contra el IR.",
    ejemplo:
      "Empresa con activos netos S/ 3 millones: ITAN = (3,000,000 − 1,000,000) × 0.4% = S/ 8,000. Ese monto se descuenta del IR anual.",
  },
  {
    termino: "DJ Anual",
    categoria: "tributario",
    definicion:
      "Declaración Jurada Anual de Impuesto a la Renta. Formulario virtual donde se determina el impuesto real del año y se compara con los pagos a cuenta.",
    ejemplo:
      "Vence entre marzo y abril del año siguiente según el último dígito de RUC. Si pagaste más en cuentas de lo que debes, SUNAT te devuelve el exceso.",
  },
  {
    termino: "PDT 621",
    sigla: "PDT",
    categoria: "tributario",
    definicion:
      "Formulario mensual de declaración de IGV y pagos a cuenta del Impuesto a la Renta. Actualmente se presenta por 'Mis Declaraciones y Pagos' en SUNAT.",
    ejemplo:
      "Vence según el cronograma SUNAT por último dígito de RUC (días 7 al 22 del mes siguiente al periodo declarado).",
  },
  // ---------------------------------------------------------------------------
  // Regímenes
  // ---------------------------------------------------------------------------
  {
    termino: "NRUS",
    sigla: "NRUS",
    categoria: "regimen",
    definicion:
      "Nuevo Régimen Único Simplificado. El más simple: cuota fija mensual según nivel de ventas. Solo boletas, sin DJ anual, sin contabilidad.",
    ejemplo:
      "Bodeguero con ventas de S/ 4,000/mes: paga S/ 20/mes fijo. No declara IGV ni hace DJ anual.",
  },
  {
    termino: "RER",
    sigla: "RER",
    categoria: "regimen",
    definicion:
      "Régimen Especial de Renta. Paga 1.5% de ingresos netos mensuales + IGV. Solo dos libros contables. Hasta S/ 525,000 de ingresos anuales.",
    ejemplo:
      "Ferretería con ventas de S/ 30,000/mes: paga IR = S/ 450 (1.5%) + IGV según cálculo débito-crédito.",
  },
  {
    termino: "RMT",
    sigla: "RMT",
    categoria: "regimen",
    definicion:
      "Régimen MYPE Tributario. Paga IR anual al 10% sobre las primeras 15 UIT de utilidad y 29.5% por el exceso. Para negocios hasta S/ 9.35 millones de ingresos.",
    ejemplo:
      "Empresa con utilidad de S/ 70,000: IR = S/ 7,000 (10%). Si estuviera en RG pagaría S/ 20,650 (29.5%). Ahorro: S/ 13,650.",
  },
  {
    termino: "Régimen General",
    sigla: "RG",
    categoria: "regimen",
    definicion:
      "Régimen tributario sin límite de ingresos. IR anual del 29.5% sobre la utilidad. Obligatorio para empresas grandes o sucursales de extranjeras.",
    ejemplo:
      "Empresa con utilidad de S/ 200,000: IR = S/ 59,000 (29.5%).",
  },
  {
    termino: "REMYPE",
    sigla: "REMYPE",
    categoria: "regimen",
    definicion:
      "Registro Nacional de la Micro y Pequeña Empresa. Inscripción en el MTPE que habilita el régimen laboral especial MYPE con menores beneficios sociales.",
    ejemplo:
      "Microempresa inscrita en REMYPE no paga gratificaciones ni CTS a sus trabajadores (solo SIS y 15 días de vacaciones). Un trabajador a S/ 1,130 cuesta ~S/ 1,177/mes vs S/ 1,625 en régimen general.",
  },
  // ---------------------------------------------------------------------------
  // Sistemas SUNAT
  // ---------------------------------------------------------------------------
  {
    termino: "RUC",
    sigla: "RUC",
    categoria: "sistema",
    definicion:
      "Registro Único de Contribuyentes. Número de 11 dígitos que identifica a personas naturales y jurídicas ante SUNAT. Obligatorio para operar formalmente.",
    ejemplo:
      "RUC empieza en 10 (persona natural) o 20 (persona jurídica). Ejemplo: 20512345678 (empresa) o 10456789012 (persona natural).",
  },
  {
    termino: "Clave SOL",
    categoria: "sistema",
    definicion:
      "Contraseña de acceso a los servicios electrónicos de SUNAT (SUNAT Operaciones en Línea). Permite declarar, emitir comprobantes y consultar deudas.",
    ejemplo:
      "Con tu clave SOL accedes a emitir facturas en el portal, revisar tu historial de declaraciones y descargar constancias.",
  },
  {
    termino: "SIRE",
    sigla: "SIRE",
    categoria: "sistema",
    definicion:
      "Sistema Integrado de Registros Electrónicos. Plataforma de SUNAT que genera automáticamente el Registro de Ventas y Compras a partir de los comprobantes electrónicos.",
    ejemplo:
      "SUNAT precarga el borrador de tu Registro de Ventas con todas tus facturas del mes. Tu contador lo revisa y confirma antes del vencimiento.",
  },
  {
    termino: "PLE",
    sigla: "PLE",
    categoria: "sistema",
    definicion:
      "Programa de Libros Electrónicos. Software de SUNAT para llevar los libros contables distintos al Registro de Ventas y Compras (Diario, Mayor, Inventarios, etc.).",
    ejemplo:
      "Empresa con ingresos de S/ 2 millones usa PLE para el Libro Diario y Mayor, y SIRE para los registros de ventas y compras.",
  },
  {
    termino: "RVIE",
    sigla: "RVIE",
    categoria: "sistema",
    definicion:
      "Registro de Ventas e Ingresos Electrónico. Libro obligatorio generado vía SIRE que detalla todas las ventas del mes con los comprobantes emitidos.",
    ejemplo:
      "El RVIE de mayo de una ferretería lista las 340 boletas y 12 facturas emitidas en el mes, con montos e IGV de cada una.",
  },
  {
    termino: "RCE",
    sigla: "RCE",
    categoria: "sistema",
    definicion:
      "Registro de Compras Electrónico. Libro generado vía SIRE con todas las compras del mes que dan derecho a crédito fiscal.",
    ejemplo:
      "El RCE debe incluir solo facturas válidas de proveedores. Las boletas no dan crédito fiscal y no van en el RCE.",
  },
  {
    termino: "SEE",
    sigla: "SEE",
    categoria: "sistema",
    definicion:
      "Sistema de Emisión Electrónica. Plataforma para emitir comprobantes electrónicos. Incluye el portal SOL, la App Emprender y el Facturador SUNAT.",
    ejemplo:
      "Un emprendedor emite boletas y facturas gratis desde la App Emprender SUNAT sin necesitar software adicional.",
  },
  {
    termino: "OSE",
    sigla: "OSE",
    categoria: "sistema",
    definicion:
      "Operador de Servicios Electrónicos. Empresa autorizada por SUNAT que valida los comprobantes electrónicos en lugar de SUNAT directamente.",
    ejemplo:
      "Nubefact, Bizlinks y otros son OSE. Cuando emites por ellos, tu comprobante se valida y reporta a SUNAT en segundos.",
  },
  {
    termino: "PLAME",
    sigla: "PLAME",
    categoria: "sistema",
    definicion:
      "Planilla Mensual de Pagos. Declaración mensual en SUNAT que informa los sueldos pagados, retenciones (AFP, renta 5ª) y aportes del empleador (ESSALUD).",
    ejemplo:
      "Empresa con 3 trabajadores presenta PLAME cada mes indicando los sueldos de S/ 1,500, S/ 2,000 y S/ 3,000 y los aportes correspondientes.",
  },
  {
    termino: "T-Registro",
    categoria: "sistema",
    definicion:
      "Sistema de Registro de Empleadores y Trabajadores. Base de datos de SUNAT donde se registra el alta y baja de cada trabajador con clave SOL.",
    ejemplo:
      "Debes registrar al trabajador en T-Registro antes de su primer día. Si SUNAFIL lo encuentra trabajando sin registro, la multa puede superar S/ 5,000.",
  },
  // ---------------------------------------------------------------------------
  // Comprobantes
  // ---------------------------------------------------------------------------
  {
    termino: "Factura electrónica",
    categoria: "comprobante",
    definicion:
      "Comprobante de pago emitido a clientes con RUC. Da derecho a crédito fiscal de IGV y a deducir el gasto del IR.",
    ejemplo:
      "Vendes materiales de construcción a una empresa contratista. Le emites factura electrónica por S/ 5,900 (incluye S/ 900 de IGV). Ella puede usar ese IGV como crédito fiscal.",
  },
  {
    termino: "Boleta de venta",
    categoria: "comprobante",
    definicion:
      "Comprobante de pago para consumidores finales sin RUC. No da derecho a crédito fiscal ni es gasto deducible para quien la recibe.",
    ejemplo:
      "Bodega vende arroz por S/ 25 a una ama de casa. Emite boleta. La cliente no puede usar ese comprobante para descuentos de impuestos.",
  },
  {
    termino: "Nota de crédito",
    categoria: "comprobante",
    definicion:
      "Comprobante que anula total o parcialmente una factura o boleta anterior. Se usa para devoluciones, descuentos o correcciones de precio.",
    ejemplo:
      "Emitiste una factura por S/ 2,360 pero el cliente devolvió la mitad. Emites nota de crédito por S/ 1,180 para anular esa parte.",
  },
  {
    termino: "Guía de remisión",
    categoria: "comprobante",
    definicion:
      "Documento que acredita el traslado de mercadería de un punto a otro. Obligatorio cuando se transporta bienes.",
    ejemplo:
      "Llevas 50 cajas de producto de tu almacén en San Juan de Lurigancho a tu local en Miraflores. Debes llevar la guía de remisión en el vehículo.",
  },
  {
    termino: "Recibo por honorarios",
    categoria: "comprobante",
    definicion:
      "Comprobante emitido por personas naturales que realizan trabajo independiente (4.ª categoría). Aplica retención del 8% si el emisor no ha solicitado suspensión.",
    ejemplo:
      "Abogado cobra S/ 2,000 por asesoría. Emite recibo por honorarios por S/ 2,000. La empresa le retiene S/ 160 (8%) y le paga S/ 1,840.",
  },
  // ---------------------------------------------------------------------------
  // Laboral
  // ---------------------------------------------------------------------------
  {
    termino: "RMV",
    sigla: "RMV",
    categoria: "laboral",
    definicion:
      "Remuneración Mínima Vital. El sueldo mínimo legal que debe recibir un trabajador en planilla a jornada completa.",
    ejemplo:
      "RMV 2026 = S/ 1,130 mensual. Un trabajador a tiempo completo no puede ganar menos que eso.",
  },
  {
    termino: "CTS",
    sigla: "CTS",
    categoria: "laboral",
    definicion:
      "Compensación por Tiempo de Servicios. Beneficio que el empleador deposita en mayo y noviembre en una cuenta bancaria del trabajador. Funciona como fondo de seguro.",
    ejemplo:
      "Trabajador con sueldo S/ 2,000 en régimen general: CTS anual = 1 sueldo = S/ 2,000 (se deposita S/ 1,000 en mayo y S/ 1,000 en noviembre).",
  },
  {
    termino: "Gratificación",
    categoria: "laboral",
    definicion:
      "Pago equivalente a un sueldo completo que el empleador entrega en julio (Fiestas Patrias) y en diciembre (Navidad) en régimen general.",
    ejemplo:
      "Trabajador con sueldo S/ 3,000: recibe S/ 3,000 adicionales en julio y S/ 3,000 en diciembre. Total gratificaciones: S/ 6,000/año.",
  },
  {
    termino: "ESSALUD",
    sigla: "ESSALUD",
    categoria: "laboral",
    definicion:
      "Seguro Social de Salud del Perú. El empleador aporta el 9% del sueldo bruto para cubrir la atención médica del trabajador y sus dependientes.",
    ejemplo:
      "Trabajador con sueldo S/ 2,000: el empleador paga S/ 180/mes adicionales a ESSALUD (aparte del sueldo).",
  },
  {
    termino: "AFP",
    sigla: "AFP",
    categoria: "laboral",
    definicion:
      "Administradora de Fondos de Pensiones. Sistema privado de pensiones. El trabajador aporta ~10-13% de su sueldo (retención del empleador) a su cuenta individual.",
    ejemplo:
      "Trabajador con sueldo S/ 2,000 afiliado a AFP: se le descuenta ~S/ 230/mes (10% aportes + comisión + seguro). El empleador retiene y paga a la AFP.",
  },
  {
    termino: "ONP",
    sigla: "ONP",
    categoria: "laboral",
    definicion:
      "Oficina de Normalización Previsional. Sistema público de pensiones. El trabajador aporta 13% de su sueldo bruto.",
    ejemplo:
      "Trabajador con sueldo S/ 2,000 en ONP: descuento mensual = S/ 260 (13%). El empleador lo retiene y paga a la ONP.",
  },
  {
    termino: "SUNAFIL",
    sigla: "SUNAFIL",
    categoria: "laboral",
    definicion:
      "Superintendencia Nacional de Fiscalización Laboral. Entidad que inspecciona el cumplimiento de las normas laborales y puede multar a los empleadores.",
    ejemplo:
      "SUNAFIL puede multar entre S/ 2,750 y S/ 55,000 (1 a 20 UIT) si encuentra trabajadores sin registrar en T-Registro.",
  },
  {
    termino: "Microempresa",
    categoria: "laboral",
    definicion:
      "Empresa con ventas anuales hasta 150 UIT (S/ 825,000 en 2026) inscrita en REMYPE. Tiene régimen laboral reducido.",
    ejemplo:
      "Microempresa REMYPE: trabajadores tienen 15 días de vacaciones, sin gratificaciones, sin CTS, con SIS de salud.",
  },
  {
    termino: "Pequeña empresa",
    categoria: "laboral",
    definicion:
      "Empresa con ventas entre 150 y 1,700 UIT (hasta S/ 9.35 millones) inscrita en REMYPE. Tiene beneficios laborales reducidos respecto al régimen general.",
    ejemplo:
      "Pequeña empresa REMYPE: trabajadores tienen 15 días de vacaciones, ½ gratificación, ½ CTS y ESSALUD del 9%.",
  },
  // ---------------------------------------------------------------------------
  // Empresa y formalización
  // ---------------------------------------------------------------------------
  {
    termino: "PCGE",
    sigla: "PCGE",
    categoria: "empresa",
    definicion:
      "Plan Contable General Empresarial. Catálogo numerado oficial de cuentas contables que toda empresa peruana debe usar. Vigente desde enero 2020.",
    ejemplo:
      "En el PCGE, la cuenta 10 siempre es efectivo, la 42 son proveedores, la 70 son ventas — en cualquier empresa del país.",
  },
  {
    termino: "NIIF",
    sigla: "NIIF",
    categoria: "empresa",
    definicion:
      "Normas Internacionales de Información Financiera. Reglas mundiales para preparar estados financieros. Perú las adopta vía el Consejo Normativo de Contabilidad.",
    ejemplo:
      "La NIIF 16 obliga a registrar los contratos de arrendamiento como activos en el balance, aunque el local sea alquilado.",
  },
  {
    termino: "SUNARP",
    sigla: "SUNARP",
    categoria: "empresa",
    definicion:
      "Superintendencia Nacional de los Registros Públicos. Entidad donde se inscriben las empresas (personas jurídicas) y se registran los activos.",
    ejemplo:
      "Para constituir una SAC, la minuta elevada a escritura pública se inscribe en SUNARP. La empresa existe legalmente desde esa inscripción.",
  },
  {
    termino: "SACS",
    sigla: "SACS",
    categoria: "empresa",
    definicion:
      "Sociedad Anónima Cerrada Simplificada. Tipo de empresa 100% digital, sin notario, constituida vía SID-SUNARP con DNIe. La opción más barata para formalizarse como persona jurídica.",
    ejemplo:
      "Dos socios pueden constituir una SACS online por aproximadamente S/ 100, sin notaría ni abogado.",
  },
  {
    termino: "Partida registral",
    categoria: "empresa",
    definicion:
      "Registro electrónico en SUNARP que acredita la existencia legal de una empresa o la propiedad de un bien inmueble.",
    ejemplo:
      "Una vez inscrita la SAC, SUNARP asigna una partida registral (número de expediente). Con ella la empresa puede abrir cuentas bancarias y obtener el RUC.",
  },
];

export const TERMINOS: GlosarioTermino[] = _TERMINOS_RAW.sort((a, b) =>
  a.termino.localeCompare(b.termino, "es"),
);
