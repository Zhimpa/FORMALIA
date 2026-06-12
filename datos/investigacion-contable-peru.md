
tags: [moc, contabilidad, peru]
fecha: 2026-06-10


# 🗺️ Mapa de Contenido — Contabilidad Financiera Perú

> Investigación completa para el proyecto web de contabilidad y formalización de empresas en Perú.
> **Datos clave 2026:** UIT = S/ 5,500 (D.S. 301-2025-EF) · RMV = S/ 1,130 · IGV = 18%

## 📚 Categorías

### Nivel Básico
- [[01 - La Ecuación Contable y la Partida Doble]]
- [[02 - El Ciclo Contable]]
- [[01 - Los 5 Estados Financieros]]

### Normativa Perú
- [[01 - PCGE - Plan Contable General Empresarial]]
- [[02 - NIIF en Perú]]
- [[01 - Regímenes Tributarios SUNAT 2026]]
- [[02 - IGV e Impuesto a la Renta]]

### Formalización
- [[01 - Tipos de Empresa en Perú]]
- [[02 - Pasos para Formalizar una Empresa]]
- [[03 - REMYPE y Régimen Laboral MYPE]]

### Operación del Negocio
- [[01 - Facturación Electrónica]]
- [[02 - SIRE y Libros Electrónicos]]
- [[01 - Planillas - T-Registro y PLAME]]

### Nivel Avanzado
- [[01 - Análisis Financiero y Ratios]]
- [[02 - Contabilidad de Costos]]
- [[03 - Cierre Contable y DJ Anual]]

### Proyecto
- [[01 - Análisis del Proyecto Web]]

## ⚠️ Nota de actualización
Los montos en soles (UIT, límites, tasas) cambian cada año por decreto supremo. Revisar cada enero:
- UIT: decreto supremo del MEF (diciembre)
- Cronogramas SUNAT: Resolución de Superintendencia anual
- RMV: decreto supremo del MTPE

tags: [contabilidad, basico, fundamentos]
nivel: básico


# La Ecuación Contable y la Partida Doble

## 💡 Explicación simple (para no contadores)
La contabilidad responde a 3 preguntas: **¿qué tengo?, ¿qué debo?, ¿qué es realmente mío?**

```
ACTIVO = PASIVO + PATRIMONIO
(lo que tengo) = (lo que debo) + (lo que es mío)
```

**Ejemplo:** Abres una bodega con S/ 10,000 de tus ahorros y un préstamo de S/ 5,000.
- Activo: S/ 15,000 (caja + mercadería)
- Pasivo: S/ 5,000 (el préstamo)
- Patrimonio: S/ 10,000 (tu aporte)

## Conceptos clave

| Concepto | Definición simple | Ejemplo |
|---|---|---|
| **Activo** | Recursos que posee el negocio | Caja, mercadería, local, cuentas por cobrar |
| **Pasivo** | Deudas y obligaciones | Préstamos, proveedores por pagar, impuestos |
| **Patrimonio** | Aporte de dueños + ganancias acumuladas | Capital social, resultados acumulados |
| **Ingreso** | Lo que el negocio gana | Ventas, intereses ganados |
| **Gasto** | Lo que cuesta operar | Alquiler, sueldos, luz, agua |

## La partida doble
Toda operación afecta **al menos dos cuentas**: si entra algo por un lado, sale o se origina por otro. Por eso "los libros siempre cuadran".

**Regla del cargo y abono:**
- Activos y gastos: **aumentan al Debe**, disminuyen al Haber
- Pasivos, patrimonio e ingresos: **aumentan al Haber**, disminuyen al Debe

**Ejemplo de asiento** — vendes mercadería por S/ 1,180 (incluye IGV) al contado:

| Cuenta (PCGE) | Debe | Haber |
|---|---|---|
| 10 Efectivo | 1,180 | |
| 40 Tributos (IGV por pagar) | | 180 |
| 70 Ventas | | 1,000 |

## Relación con otras notas
- Las cuentas se codifican según el [[01 - PCGE - Plan Contable General Empresarial]]
- Los saldos se resumen en [[01 - Los 5 Estados Financieros]]

tags: [contabilidad, basico, proceso]
nivel: básico


# El Ciclo Contable

## 💡 Explicación simple
Es la "rutina" mensual y anual de la contabilidad: registrar → clasificar → resumir → reportar.

## Las 8 etapas

1. **Documentos fuente**: facturas, boletas, recibos, contratos, vouchers bancarios. Sin documento no hay registro válido para SUNAT.
2. **Registro en el Libro Diario**: cada operación se anota como asiento de partida doble, en orden cronológico.
3. **Mayorización (Libro Mayor)**: los asientos se agrupan por cuenta para conocer el saldo de cada una.
4. **Balance de comprobación**: lista de todas las cuentas con sus saldos; verifica que Debe = Haber.
5. **Ajustes**: depreciación, provisiones, devengos (ingresos/gastos del periodo aún no cobrados/pagados), estimación de cobranza dudosa.
6. **Estados financieros**: se preparan a partir del balance ajustado. Ver [[01 - Los 5 Estados Financieros]].
7. **Asientos de cierre**: las cuentas de ingresos y gastos (cuentas de resultado) se cierran contra el resultado del ejercicio.
8. **Declaración Jurada Anual**: en Perú, el ciclo termina con la DJ Anual de Renta ante SUNAT (marzo–abril del año siguiente, según cronograma).

## Periodicidad en Perú
- **Mensual**: declaración de IGV-Renta (PDT 621 / Mis Declaraciones), registros de ventas y compras vía [[02 - SIRE y Libros Electrónicos]], planilla PLAME.
- **Anual**: DJ Anual de Renta de tercera categoría (obligatoria en Régimen MYPE Tributario y Régimen General; el RER y NRUS no presentan DJ anual).

## Principios que sostienen el ciclo
- **Devengado**: se registra cuando ocurre la operación, no cuando se cobra/paga.
- **Empresa en marcha**: se asume que el negocio continuará operando.
- **Uniformidad**: mismos criterios contables entre periodos.
- **Prudencia**: no anticipar ganancias; reconocer pérdidas probables.

Relacionado: [[01 - La Ecuación Contable y la Partida Doble]] · [[03 - Cierre Contable y DJ Anual]]

tags: [contabilidad, estados-financieros, niif]
nivel: básico-intermedio


# Los 5 Estados Financieros

## 💡 Explicación simple
Son los "reportes de salud" del negocio. Cada uno responde una pregunta distinta:

| Estado | Pregunta que responde | Analogía |
|---|---|---|
| **Estado de Situación Financiera** (balance) | ¿Qué tengo y qué debo HOY? | Una foto |
| **Estado de Resultados** | ¿Gané o perdí en el periodo? | Una película |
| **Estado de Flujos de Efectivo** | ¿De dónde entró y a dónde salió el dinero? | La cuenta bancaria |
| **Estado de Cambios en el Patrimonio** | ¿Cómo varió lo que es de los dueños? | El historial del capital |
| **Notas a los EE.FF.** | ¿Qué detalles explican las cifras? | La letra pequeña |

## 1. Estado de Situación Financiera
- Estructura: Activo (corriente y no corriente) = Pasivo (corriente y no corriente) + Patrimonio.
- "Corriente" = se convierte en efectivo o se paga en menos de 12 meses.

## 2. Estado de Resultados
Estructura típica en Perú (por función):
```
Ventas netas
(–) Costo de ventas
= Utilidad bruta
(–) Gastos de administración
(–) Gastos de ventas
= Utilidad operativa
(+/–) Ingresos y gastos financieros
= Utilidad antes de impuestos
(–) Impuesto a la renta (29.5% régimen general)
= Utilidad neta
```

## 3. Estado de Flujos de Efectivo
Tres tipos de actividades:
- **Operación**: cobros a clientes, pagos a proveedores y trabajadores.
- **Inversión**: compra/venta de maquinaria, locales, inversiones.
- **Financiamiento**: préstamos recibidos/pagados, aportes, dividendos.

⚠️ Idea clave para emprendedores: **utilidad ≠ efectivo**. Puedes tener utilidad contable y quedarte sin caja (ventas al crédito no cobradas). La mayoría de MYPE quiebra por caja, no por falta de utilidad.

## 4. Estado de Cambios en el Patrimonio
Muestra movimientos de capital social, reservas, resultados acumulados y dividendos.

## 5. Notas
Políticas contables, detalle de cuentas, contingencias. Exigidas por las [[02 - NIIF en Perú]].

## Quién está obligado a qué (Perú)
- Empresas supervisadas por SMV: NIIF completas auditadas.
- Resto de empresas: preparan EE.FF. según PCGE/NIIF; el nivel de libros depende de ingresos — ver [[02 - SIRE y Libros Electrónicos]].
- Desde 2027 entra en vigencia la **NIIF 18** (oficializada en Perú en 2024), que cambia la presentación del estado de resultados (nuevos subtotales y categorías).

tags: [pcge, normativa, peru]
nivel: intermedio


# PCGE — Plan Contable General Empresarial

## 💡 Explicación simple
Es el **catálogo oficial de cuentas** que toda empresa peruana usa para registrar sus operaciones. Es como el "diccionario numerado" de la contabilidad: la cuenta 10 siempre es efectivo, la 70 siempre es ventas, en cualquier empresa del país.

## Datos clave
- Emitido por el **Consejo Normativo de Contabilidad (CNC)** del MEF.
- Versión vigente: **modificada 2019 (R. CNC N° 002-2019-EF/30), en vigencia desde el 01/01/2020**.
- Está **alineado con las NIIF**: cada cuenta referencia la norma internacional que la regula.
- Catálogo desarrollado a **5 dígitos**: Elemento (1 dígito) → Cuenta (2) → Subcuenta (3) → Divisionaria (4) → Subdivisionaria (5). La empresa puede agregar más dígitos según su necesidad.

## Los 9 elementos + cuentas de orden

| Elemento | Contenido | Cuentas principales |
|---|---|---|
| 1 | Activo disponible y exigible | 10 Efectivo, 12 Ctas. por cobrar comerciales, 16 Otras ctas. por cobrar |
| 2 | Activo realizable (existencias) | 20 Mercaderías, 21 Productos terminados, 24 Materias primas |
| 3 | Activo inmovilizado | 33 Propiedad, planta y equipo, 34 Intangibles, 39 Depreciación acumulada |
| 4 | Pasivo | 40 Tributos por pagar, 41 Remuneraciones, 42 Proveedores, 45 Obligaciones financieras |
| 5 | Patrimonio | 50 Capital, 58 Reservas, 59 Resultados acumulados |
| 6 | Gastos por naturaleza | 60 Compras, 62 Cargas de personal, 63 Servicios de terceros, 68 Depreciación |
| 7 | Ingresos | 70 Ventas, 75 Otros ingresos, 77 Ingresos financieros |
| 8 | Saldos intermediarios de gestión | 80 Margen comercial, 89 Resultado del ejercicio |
| 9 | Contabilidad analítica/costos | Libre, según necesidad de cada empresa |
| 0 | Cuentas de orden | Información fuera de los EE.FF. (garantías, contingencias) |

## Asiento típico de compra con IGV
Compra de mercadería por S/ 1,000 + IGV S/ 180, al crédito:

| Cuenta | Debe | Haber |
|---|---|---|
| 60 Compras | 1,000 | |
| 40 Tributos (IGV crédito fiscal) | 180 | |
| 42 Proveedores | | 1,180 |
| 20 Mercaderías | 1,000 | |
| 61 Variación de existencias | | 1,000 |

Relacionado: [[02 - NIIF en Perú]] · [[01 - La Ecuación Contable y la Partida Doble]]

tags: [niif, normativa, peru, avanzado]
nivel: intermedio-avanzado


# NIIF en Perú

## 💡 Explicación simple
Las NIIF (Normas Internacionales de Información Financiera) son las "reglas del juego" mundiales para preparar estados financieros. Perú las adopta oficialmente a través del **Consejo Normativo de Contabilidad (CNC)**.

## Quién aplica qué
- **NIIF completas**: empresas supervisadas por la SMV (que cotizan o emiten valores) y, en la práctica, las grandes empresas. Las prescripciones de las NIIF prevalecen sobre el PCGE en caso de conflicto.
- **NIIF para PYMES**: versión simplificada que pueden aplicar empresas no supervisadas por SMV.
- **MYPE pequeñas**: en la práctica llevan contabilidad simplificada según los libros que exige SUNAT (criterio tributario), aunque conceptualmente siguen el marco NIIF vía PCGE.

## NIIF más relevantes en la práctica

| Norma | Tema | Por qué importa |
|---|---|---|
| Marco Conceptual | Definiciones de activo, pasivo, ingreso, gasto | Base de todo |
| NIC 1 / NIIF 18 | Presentación de EE.FF. | NIIF 18 oficializada en Perú en 2024, **vigente desde 2027**: nuevos subtotales y categorías en el estado de resultados |
| NIC 2 | Inventarios | Costo o VNR, fórmulas PEPS/promedio |
| NIC 16 | Propiedad, planta y equipo | Depreciación, vida útil, revaluación |
| NIIF 15 | Ingresos de contratos con clientes | Modelo de 5 pasos para reconocer ventas |
| NIIF 16 | Arrendamientos | Los alquileres entran al balance (derecho de uso) |
| NIIF 9 | Instrumentos financieros | Deterioro de cuentas por cobrar (pérdida esperada) |
| NIC 12 | Impuesto a las ganancias | Diferencias temporales contable vs tributario |
| NIC 36 | Deterioro de activos | Test de deterioro |

## Contable vs Tributario (concepto clave avanzado)
La utilidad **contable** (NIIF) ≠ utilidad **tributaria** (Ley del Impuesto a la Renta). Se concilia en la DJ Anual con adiciones y deducciones (gastos no deducibles, depreciación tributaria vs contable, etc.). De ahí nace el **impuesto diferido** (NIC 12).

Relacionado: [[01 - PCGE - Plan Contable General Empresarial]] · [[03 - Cierre Contable y DJ Anual]]

tags: [sunat, tributario, regimenes, peru-2026]
nivel: básico-intermedio
importancia: crítica


# Regímenes Tributarios SUNAT 2026

## 💡 Explicación simple
Al sacar tu RUC eliges una "categoría de impuestos". Elegir mal te puede costar multas o pagar de más. **UIT 2026 = S/ 5,500** (D.S. 301-2025-EF).

## Comparativo de los 4 regímenes

| | NRUS (Nuevo RUS) | RER (Régimen Especial) | RMT (MYPE Tributario) | RG (Régimen General) |
|---|---|---|---|---|
| **Para quién** | Persona natural, negocio pequeño (bodega, puesto) | PN o PJ, comercio/servicios | PN o PJ hasta 1,700 UIT de ingresos | Sin límite |
| **Límite ingresos** | S/ 96,000/año (S/ 8,000/mes) | S/ 525,000/año | 1,700 UIT = **S/ 9,350,000** (2026) | Sin límite |
| **Pago** | Cuota fija: S/ 20 (hasta S/ 5,000/mes) o S/ 50 (hasta S/ 8,000/mes) | 1.5% de ingresos netos mensuales + IGV | Pago a cuenta 1% (hasta 300 UIT) o coeficiente/1.5%; IR anual: 10% hasta 15 UIT de utilidad, 29.5% por el exceso + IGV | Pago a cuenta coeficiente o 1.5%; IR anual 29.5% + IGV |
| **Comprobantes** | Solo boletas y tickets (NO facturas) | Todos | Todos | Todos |
| **Libros** | Ninguno | Registro de Compras y de Ventas | Según ingresos (ver abajo) | Según ingresos, hasta contabilidad completa |
| **DJ Anual** | No | No | Sí | Sí |
| **Trabajadores** | Sin límite legal actual | Máx. 10 por turno | Sin límite | Sin límite |

## Libros contables según ingresos (RMT y RG)
- Hasta 300 UIT: Registro de Ventas, Registro de Compras y Libro Diario de Formato Simplificado.
- Más de 300 hasta 500 UIT: + Libro Diario y Libro Mayor.
- Más de 500 hasta 1,700 UIT: + Libro de Inventarios y Balances.
- Más de 1,700 UIT (solo RG): **contabilidad completa** (incluye Caja y Bancos, y según actividad: Registro de Activos Fijos, Registro de Costos, Inventarios Permanentes).

## Reglas de cambio de régimen
- De menor a mayor (NRUS→RER→RMT→RG): en cualquier mes del año.
- De RG a RMT, o de cualquiera al NRUS: **solo en enero** (con la declaración de diciembre).
- Si superas el límite y no te cambias, SUNAT puede incorporarte **de oficio y retroactivamente** (cruza datos de facturas electrónicas y bancos).

## ¿Cuál elegir? (lógica para la web)
1. ¿Vendes solo a consumidores finales y facturas < S/ 8,000/mes? → **NRUS**
2. ¿Necesitas emitir facturas a empresas y tu utilidad es baja o incierta? → Cuidado con el RER: pagas 1.5% **aunque pierdas dinero**.
3. ¿Tienes utilidad y quieres pagar según ganancia real? → **RMT** (10% sobre las primeras 15 UIT de utilidad es la tasa más baja).
4. ¿Superas 1,700 UIT o eres sucursal de extranjera? → **RG**.

## Novedad 2025-2026
La **Ley 32353** (mayo 2025) creó un marco de formalización MYPE con un Régimen Tributario Especial y crédito tributario por capacitación (hasta 1% de la planilla anual). Su reglamentación estaba pendiente de resoluciones de SUNAT — verificar estado actual antes de publicar contenido.

Relacionado: [[02 - IGV e Impuesto a la Renta]] · [[02 - Pasos para Formalizar una Empresa]]

tags: [sunat, igv, renta, tributario]
nivel: básico-intermedio


# IGV e Impuesto a la Renta

## IGV (Impuesto General a las Ventas)
- Tasa: **18%** (16% IGV + 2% IPM).
- Es un impuesto al **consumidor final**; la empresa solo lo recauda.
- **Mecánica**: IGV de ventas (débito fiscal) – IGV de compras (crédito fiscal) = IGV a pagar del mes.

**Ejemplo**: vendes S/ 11,800 (incluye IGV 1,800) y compraste S/ 5,900 (incluye IGV 900).
→ Pagas a SUNAT: 1,800 – 900 = **S/ 900**.

Requisitos del crédito fiscal: comprobante válido (factura, no boleta), que el gasto sea costo/gasto del negocio, anotado en el Registro de Compras (hoy vía SIRE), y bancarización para operaciones desde S/ 2,000 o US$ 500 (medios de pago).

### Sistemas administrativos del IGV (nivel intermedio)
- **Detracciones (SPOT)**: el cliente deposita un % en la cuenta del Banco de la Nación del proveedor (servicios, transporte, etc.).
- **Retenciones**: agentes de retención retienen 3% al pagar a proveedores.
- **Percepciones**: en importaciones y venta de ciertos bienes.

## Impuesto a la Renta (3.ª categoría)
- Grava la **utilidad** del negocio (no las ventas), salvo NRUS y RER que son simplificados.
- Tasas anuales: RMT = 10% hasta 15 UIT de renta neta y 29.5% por el exceso; RG = 29.5%.
- **Pagos a cuenta mensuales**: adelantos que se descuentan del impuesto anual.
- Gastos deducibles: deben cumplir el **principio de causalidad** (necesarios para generar renta), estar documentados y bancarizados. Hay límites (vehículos, representación, intereses, etc.).

## Otras rentas (contexto)
- 1.ª: alquileres (5% efectivo). 2.ª: ganancias de capital, dividendos (5%). 4.ª: trabajo independiente (recibos por honorarios, retención 8%). 5.ª: planilla.

## Calendario
Las declaraciones mensuales vencen según el **cronograma SUNAT por último dígito de RUC** (días hábiles del mes siguiente). La DJ Anual vence entre marzo y abril.

Relacionado: [[01 - Regímenes Tributarios SUNAT 2026]] · [[02 - SIRE y Libros Electrónicos]]

tags: [formalizacion, empresa, peru]
nivel: básico


# Tipos de Empresa en Perú

## 💡 Decisión clave antes de formalizar

| Tipo | Socios | Responsabilidad | Para quién |
|---|---|---|---|
| **Persona Natural con Negocio** | 1 (tú mismo) | ⚠️ Ilimitada: respondes con tu patrimonio personal | Emprendimiento pequeño, trámite más rápido (RUC en 1 día, sin notario) |
| **EIRL** | 1 titular | Limitada al aporte | Emprendedor solo que quiere proteger su patrimonio |
| **SAC** (Sociedad Anónima Cerrada) | 2 a 20 | Limitada | La más usada; permite acciones, directorio opcional, atraer inversionistas |
| **SRL** | 2 a 20 | Limitada | Alternativa a la SAC con participaciones en vez de acciones |
| **SACS** (S.A. Cerrada Simplificada) | Hasta 20, solo personas naturales | Limitada | **100% digital, sin notario**, vía SID-SUNARP con DNIe (DL 1409); costo total aprox. S/ 100 |
| **SA** | Mín. 2, sin máx. | Limitada | Empresas grandes, directorio obligatorio |

## Persona Natural vs Persona Jurídica

**Persona Natural con Negocio**
- ✅ Gratis e inmediato (solo RUC), menos trámites, puede estar en NRUS.
- ❌ Si el negocio quiebra o te demandan, pueden embargarte casa, auto, ahorros.

**Persona Jurídica (EIRL, SAC, SRL, SACS)**
- ✅ Patrimonio separado, más acceso a crédito y a clientes corporativos, puedes vender participaciones.
- ❌ Costo de constitución (S/ 500–1,500 con notario; ~S/ 100 SACS digital), más formalidades.

## Datos prácticos
- **No hay capital mínimo** legal para constituir (Ley 26887).
- La reserva de nombre en SUNARP cuesta ~S/ 25 y dura 30 días.
- La SAC permite pactar que no haya directorio (la mayoría de MYPE lo omite).

Relacionado: [[02 - Pasos para Formalizar una Empresa]] · [[03 - REMYPE y Régimen Laboral MYPE]]

tags: [formalizacion, tramites, sunarp, sunat]
nivel: básico
importancia: crítica


# Pasos para Formalizar una Empresa (2026)

## Ruta A — Persona Natural con Negocio (la más rápida)
1. Sacar **RUC** en SUNAT (online con DNI + clave SOL, o presencial). Gratis, 1 día.
2. Elegir régimen tributario ([[01 - Regímenes Tributarios SUNAT 2026]]).
3. Licencia de funcionamiento municipal (si tienes local).
4. Listo para operar.

## Ruta B — Persona Jurídica (EIRL, SAC, SRL)

### Paso 1: Búsqueda y reserva de nombre (SUNARP)
- Verificar que el nombre no exista: buscador de personas jurídicas de SUNARP.
- Reservarlo en línea: ~S/ 25, vigencia 30 días.

### Paso 2: Minuta de constitución
- Documento con: socios, objeto social, capital, estatutos.
- Elaborada por abogado, notaría, Centro de Desarrollo Empresarial (CDE) o Centro MAC. Costo: S/ 250–600.

### Paso 3: Escritura pública (Notaría)
- El notario eleva la minuta a escritura pública. Costo: S/ 250–500.
- Se acredita el aporte de capital (depósito bancario o declaración de bienes).

### Paso 4: Inscripción en SUNARP
- La notaría la envía electrónicamente vía **SID-SUNARP**; inscripción en 24–72 horas.
- Tasas: ~S/ 46 calificación + S/ 28 por nombramiento de gerente + S/ 3 por millar de capital.
- Con la partida registral, la empresa **existe legalmente**.

### Paso 5: RUC y clave SOL (SUNAT)
- Con DNI del representante, escritura inscrita y recibo de servicios. Gratis, 1–5 días.
- Se elige régimen tributario en el mismo trámite.
- ⚠️ **Desde junio 2026 (R.S. 000075-2026/SUNAT)**: si te inscribes en RER, RMT o RG eres **emisor electrónico desde el día de la inscripción** y debes usar SIRE desde que nace la obligación. Necesitas facturación electrónica lista desde el día 1.

### Paso 6: Trámites complementarios
- **Licencia de funcionamiento** municipal: S/ 100–500, 7–15 días.
- **Legalización de libros** ante notario (los que no sean electrónicos).
- **REMYPE** (Ministerio de Trabajo) antes de contratar personal: habilita el régimen laboral especial. Ver [[03 - REMYPE y Régimen Laboral MYPE]].
- Registro de marca en **INDECOPI** (opcional, protección por 10 años).
- ESSALUD/T-Registro si tendrás trabajadores.

## Ruta C — SACS 100% digital (sin notario)
- Vía sidciudadano.sunarp.gob.pe con firma digital del DNIe.
- Solo personas naturales como accionistas. Costo total ≈ S/ 100. La opción más barata para formalizarse como persona jurídica.

## Costos totales estimados (PJ tradicional, Lima)
Entre **S/ 700 y S/ 1,800** según notaría, capital y municipio.

## Beneficios de formalizarse (argumentos para la web)
- Emitir facturas → vender a empresas y al Estado (40% de compras estatales reservadas para MYPE).
- Acceso a crédito bancario formal.
- Protección del patrimonio personal (PJ).
- Sin riesgo de multas SUNAT por informalidad.

tags: [remype, laboral, mype, formalizacion]
nivel: intermedio


# REMYPE y Régimen Laboral MYPE

## 💡 Explicación simple
**REMYPE** es el registro del Ministerio de Trabajo que permite a micro y pequeñas empresas contratar personal con **costos laborales reducidos**. Es legal y constitucional (validado por el TC). Sin REMYPE, aplica el régimen general (D.L. 728) completo.

⚠️ No confundir: **Régimen MYPE Tributario** (SUNAT, impuestos) ≠ **REMYPE laboral** (MTPE, trabajadores). Son registros independientes.

## Clasificación MYPE (solo por ventas; el límite de trabajadores fue eliminado)
- **Microempresa**: ventas hasta 150 UIT.
- **Pequeña empresa**: ventas de 150 hasta 1,700 UIT.
- Si una micro supera 150 UIT por 2 años consecutivos, pasa a pequeña; si la pequeña supera 1,700 UIT, sale del régimen.

## Comparativo de beneficios laborales

| Beneficio | Microempresa | Pequeña empresa | Régimen general |
|---|---|---|---|
| Remuneración mínima | RMV (S/ 1,130 en 2026) | RMV | RMV |
| Vacaciones | 15 días | 15 días | 30 días |
| Gratificaciones (jul y dic) | ❌ No | ½ sueldo c/u | 1 sueldo c/u |
| CTS | ❌ No | ½ sueldo/año | 1 sueldo/año |
| Salud | SIS (Estado subsidia 50%) | ESSALUD 9% | ESSALUD 9% |
| Pensión (AFP/ONP) | Opcional para el trabajador | Obligatoria | Obligatoria |
| Indemnización despido | 10 remun. diarias/año (tope 90) | 20 remun. diarias/año (tope 120) | 45 días/año (tope 360) |
| Asignación familiar | ❌ No | ❌ No | 10% RMV |
| Utilidades | ❌ No | Sí (si >20 trabajadores) | Sí |

**Impacto real**: un trabajador con sueldo mínimo en microempresa cuesta al empleador ~S/ 5,000 menos al año que en régimen general.

## Reglas importantes
- Inscribirse en REMYPE **ANTES** de contratar: no es retroactivo.
- Trabajadores ya contratados bajo régimen general no pueden ser "bajados" al régimen MYPE (deben estar fuera de planilla 1 año para recontratarse).
- Registro gratuito y en línea con RUC + clave SOL.

## Obligaciones de planilla (aunque seas MYPE)
- **T-Registro**: alta de cada trabajador.
- **PLAME**: declaración mensual de planilla.
- Retención de 5.ª categoría cuando corresponda; aportes AFP/ONP.

Relacionado: [[01 - Planillas - T-Registro y PLAME]]

tags: [facturacion-electronica, sunat, comprobantes]
nivel: básico-intermedio


# Facturación Electrónica

## 💡 Explicación simple
En Perú casi todos los comprobantes son digitales y se reportan a SUNAT automáticamente. SUNAT "ve" tus ventas en tiempo casi real.

## Tipos de comprobantes
- **Factura**: ventas a empresas (con RUC). Da derecho a crédito fiscal y gasto deducible.
- **Boleta de venta**: ventas a consumidores finales.
- **Notas de crédito/débito**: anulaciones, descuentos, ajustes.
- **Recibo por honorarios**: trabajadores independientes (4.ª categoría).
- **Guía de remisión**: traslado de mercadería.

## Canales de emisión (SEE)
1. **SEE-SOL (portal SUNAT)**: gratis, manual, para bajo volumen.
2. **App Emprender SUNAT**: gratis, desde el celular.
3. **Facturador SUNAT (SFS)**: software gratuito de escritorio.
4. **Sistema del contribuyente / OSE-PSE**: integración vía API para volumen alto (Nubefact, Bizlinks, etc.).

## Quiénes están obligados — cambio clave 2026
**R.S. N.° 000075-2026/SUNAT (vigente desde el 1 de junio de 2026):**
- Nuevos inscritos al RUC en **RER, RMT o RG** → emisores electrónicos **desde el mismo día de inscripción**.
- Quienes salen del NRUS a otro régimen → desde el 1.er día del mes siguiente.
- Designaciones pendientes al 31/05/2026 → emisores electrónicos automáticos desde el 01/06/2026.
- La obligación de llevar registros por **SIRE** nace en paralelo, desde el mismo periodo.

## Implicancia para el proyecto web
Cualquier guía de formalización debe decirle al usuario: "necesitas tu solución de facturación electrónica **antes** de empezar a vender". Multas por no emitir: entre 50% de UIT y 2 UIT.

Relacionado: [[02 - SIRE y Libros Electrónicos]] · [[02 - Pasos para Formalizar una Empresa]]

tags: [sire, libros-electronicos, sunat]
nivel: intermedio


# SIRE y Libros Electrónicos

## 💡 Explicación simple
El **SIRE** (Sistema Integrado de Registros Electrónicos) es la plataforma de SUNAT que genera automáticamente el **Registro de Ventas (RVIE)** y el **Registro de Compras (RCE)** a partir de tus comprobantes electrónicos. SUNAT te "propone" el registro y tú lo confirmas, complementas o reemplazas cada mes.

## Evolución del llevado de libros
Físicos (legalizados ante notario) → PLE (Programa de Libros Electrónicos, archivos TXT) → SLE-Portal → **SIRE** (actual, propuesta automática).

## Cronograma de obligatoriedad SIRE
| Periodo | Obligados |
|---|---|
| Jul 2023 | Anexo 7 de la R.S. 112-2021 |
| Oct 2023 | RER y RMT que ya llevaban libros electrónicos |
| Ago 2024 | RER y MYPE obligados a RV y RC |
| Ene 2025 | Todos los obligados que no sean PRICOS |
| Ene 2026 | PRICOS con ingresos hasta 2,300 UIT |
| **Jun 2026** | PRICOS con ingresos > 2,300 UIT (último grupo) |

- Facultad discrecional: SUNAT no sancionó infracciones SIRE de enero–mayo 2026 si se regularizaba en plazo (R.S.N.A. 0019-2026 y 000005-2026).
- Nuevos contribuyentes (desde jun 2026): SIRE desde que nace la obligación de llevar RV/RC.

## Plazos y multas
- El RVIE/RCE se genera mensualmente según el cronograma de vencimientos (mismo calendario por último dígito de RUC).
- Atraso u omisión = multas (numeral 10 del art. 175 del CT y conexas), con gradualidad.

## Otros libros electrónicos (PLE)
Libro Diario, Mayor, Inventarios y Balances, Activos Fijos, Costos, etc. se siguen llevando por **PLE** según el nivel de ingresos — ver tabla en [[01 - Regímenes Tributarios SUNAT 2026]].

## Implicancia para el proyecto web
Una herramienta para contadores debería: importar/validar los TXT o la propuesta SIRE, detectar inconsistencias (comprobantes rechazados, diferencias con lo declarado en el PDT 621), y recordar vencimientos por último dígito de RUC.

tags: [planilla, laboral, plame, essalud]
nivel: intermedio


# Planillas — T-Registro y PLAME

## 💡 Explicación simple
Tener un trabajador "en planilla" implica registrarlo, pagarle beneficios y declarar mensualmente a SUNAT.

## Las 2 herramientas
1. **T-Registro**: registro online (clave SOL) de empleador y trabajadores. Alta antes del primer día de trabajo, baja al cesar.
2. **PLAME** (Planilla Mensual): declaración mensual de remuneraciones, aportes y retenciones. Se presenta junto con el cronograma tributario mensual.

## Costos laborales sobre el sueldo bruto (régimen general)
| Concepto | A cargo de | % aprox |
|---|---|---|
| ESSALUD | Empleador | 9% |
| AFP/ONP | Trabajador (retención) | ~10–13% |
| Renta 5.ª categoría | Trabajador (retención) | Si excede 7 UIT anuales |
| CTS | Empleador | ~8.33% anual (1 sueldo) |
| Gratificaciones | Empleador | 2 sueldos/año + bonif. 9% |
| Vacaciones | Empleador | 1 sueldo/año |

**Regla práctica**: en régimen general, un trabajador cuesta ~1.4 veces su sueldo bruto. En microempresa REMYPE, mucho menos (ver [[03 - REMYPE y Régimen Laboral MYPE]]).

## Fechas clave del año laboral
- CTS: depósitos en **mayo y noviembre**.
- Gratificaciones: **julio y diciembre**.
- Utilidades (si aplica): tras la DJ Anual.
- RMV 2026: **S/ 1,130**.

## Errores comunes de emprendedores (contenido para la web)
- Pagar "por recibo por honorarios" a alguien con horario y subordinación → riesgo de desnaturalización y multas SUNAFIL.
- No inscribirse en REMYPE antes de contratar → pierde los beneficios del régimen especial.
- No retener AFP/ONP → deuda solidaria del empleador.

tags: [analisis-financiero, ratios, avanzado]
nivel: avanzado


# Análisis Financiero y Ratios

## 💡 Para qué sirve
Convertir los estados financieros en **decisiones**: ¿puedo pagar mis deudas?, ¿estoy ganando lo suficiente?, ¿cuánto demoro en cobrar? Es el corazón de los "dashboards" que la web debe ofrecer.

## Ratios de liquidez (¿puedo pagar a corto plazo?)
- **Liquidez corriente** = Activo corriente / Pasivo corriente. Sano: > 1.2–1.5.
- **Prueba ácida** = (Act. corriente – Inventarios) / Pasivo corriente. Sano: ~1.
- **Capital de trabajo** = Act. corriente – Pas. corriente.

## Ratios de gestión (¿qué tan eficiente soy?)
- **Rotación de inventarios** = Costo de ventas / Inventario promedio.
- **Periodo promedio de cobro** = (Ctas. por cobrar / Ventas) × 365.
- **Periodo promedio de pago** = (Ctas. por pagar / Compras) × 365.
- **Ciclo de conversión de efectivo** = días inventario + días cobro – días pago. Si cobras a 60 y pagas a 30, financias a tus clientes con tu caja.

## Ratios de solvencia (¿estoy muy endeudado?)
- **Endeudamiento** = Pasivo total / Activo total. >0.6 = alerta.
- **Apalancamiento** = Pasivo / Patrimonio.
- **Cobertura de intereses** = Utilidad operativa / Gastos financieros.

## Ratios de rentabilidad (¿gano lo suficiente?)
- **Margen bruto** = Utilidad bruta / Ventas.
- **Margen neto** = Utilidad neta / Ventas.
- **ROA** = Utilidad neta / Activo total.
- **ROE** = Utilidad neta / Patrimonio (lo que rinde el dinero del dueño).

## Análisis complementarios
- **Vertical**: cada partida como % de ventas o del activo total.
- **Horizontal**: variación entre periodos.
- **Punto de equilibrio** = Costos fijos / (1 – Costos variables/Ventas) → la métrica más útil para un emprendedor: "¿cuánto debo vender al mes para no perder?".

## Para la web
Cada ratio debe mostrarse con: fórmula, resultado, semáforo (verde/ámbar/rojo) y explicación en lenguaje simple ("tu negocio demora 45 días en cobrar; estás financiando a tus clientes").

tags: [costos, avanzado]
nivel: avanzado


# Contabilidad de Costos

## 💡 Para qué sirve
Saber cuánto cuesta **realmente** producir o vender cada producto/servicio, para poner precios correctos. Error típico de emprendedores: fijar precio sin incluir costos indirectos ni su propio tiempo.

## Clasificación de costos
- **Directos**: identificables con el producto (materia prima, mano de obra directa).
- **Indirectos (CIF)**: alquiler de planta, luz, supervisión, depreciación.
- **Fijos**: no varían con el volumen (alquiler). **Variables**: varían (insumos).
- Costo del producto vs gasto del periodo (ventas y administración no van al costo).

## Sistemas de costeo
| Sistema | Cuándo usarlo |
|---|---|
| Por órdenes | Producción a pedido (muebles, confecciones, servicios por proyecto) |
| Por procesos | Producción continua (bebidas, panificación industrial) |
| ABC (por actividades) | Empresas con altos costos indirectos; asigna por "drivers" |
| Estándar | Grandes empresas; compara costo real vs predeterminado y analiza variaciones |

## Valuación de inventarios (NIC 2 / tributario Perú)
- Métodos aceptados: **PEPS (FIFO)** y **promedio ponderado** (UEPS no es aceptado por NIIF).
- Registro de costos e inventarios permanentes: obligatorios según nivel de ingresos (>1,500 UIT: sistema de contabilidad de costos completo con Registro de Costos e Inventarios Permanentes Valorizados; 500–1,500 UIT: inventario permanente en unidades; <500 UIT: inventarios anuales).

## Margen de contribución
```
Margen de contribución = Precio – Costo variable unitario
Punto de equilibrio (unidades) = Costos fijos / Margen de contribución unitario
```

## Para la web
Calculadora de costos y precio sugerido para MYPE: insumos + mano de obra + % indirectos + margen deseado → precio con y sin IGV.

tags: [cierre, dj-anual, avanzado, sunat]
nivel: avanzado


# Cierre Contable y Declaración Jurada Anual

## 💡 Para qué sirve
Es el proceso de fin de año donde el contador "cuadra todo" y determina el impuesto real a pagar. La época de mayor carga de trabajo de los contadores (enero–abril): aquí está la mayor oportunidad de la web para ahorrarles tiempo.

## Checklist de cierre (la que usan los estudios contables)
1. Conciliaciones bancarias de los 12 meses.
2. Arqueo y análisis de caja.
3. Confirmación de cuentas por cobrar/pagar; provisión de cobranza dudosa (requisitos tributarios estrictos).
4. Inventario físico al 31/12 y ajuste contra kárdex.
5. Depreciación: contable (vida útil NIC 16) vs tributaria (tasas máximas del reglamento LIR).
6. Vacaciones devengadas, CTS, gratificaciones provisionadas (deducibles solo si se pagan antes de la DJ).
7. Diferencia de cambio (saldos en moneda extranjera al TC de cierre SBS).
8. Análisis de gastos no deducibles (multas, gastos personales, sin sustento, sin bancarizar).

## Conciliación contable–tributaria
```
Utilidad contable (NIIF)
(+) Adiciones (gastos no deducibles, exceso de límites)
(–) Deducciones (ingresos exonerados, depreciación acelerada por leasing)
= Renta neta imponible
(–) Pérdidas tributarias arrastrables (sistema A o B)
× Tasa (29.5% RG; 10%/29.5% RMT)
= IR anual
(–) Pagos a cuenta del año
= Saldo a pagar o a favor
```

## Participación de trabajadores en utilidades
Empresas con >20 trabajadores: 5–10% de la renta antes de impuestos según industria (10% pesca/telecom/industria, 8% minería/comercio, 5% otras).

## DJ Anual
- Formulario virtual (710 simplificado o completo).
- Vence marzo–abril según último dígito de RUC.
- Adjunta estados financieros; ingresos >1,700 UIT presentan información adicional.

## ITAN
Impuesto Temporal a los Activos Netos: 0.4% sobre activos netos que excedan S/ 1 millón (al 31/12 anterior). Es crédito contra el IR.

tags: [proyecto, estrategia, web]


# Análisis del Proyecto Web

## ⚠️ Diagnóstico honesto
La idea original mezcla **3 productos distintos**:
1. Guía/asistente de formalización para emprendedores → ✅ hueco real, poca competencia de calidad, alto impacto (informalidad >70% en Perú).
2. Sistema contable para grandes empresas → ❌ mercado tomado (SAP, Oracle, Concar, Siscont); ciclos de venta de 6–18 meses; requiere certificaciones y soporte. **No empezar por aquí.**
3. Herramientas para contadores → ⚠️ viable como segunda fase (calculadoras, recordatorio de vencimientos, validadores SIRE), compitiendo con Noticiero Contable y similares en contenido.

## Recomendación de MVP (fase 1)
**"El asistente de formalización y primeros pasos contables del Perú"**
- Wizard interactivo: "¿Qué régimen tributario me conviene?" (árbol de decisión con datos 2026).
- Guía paso a paso de formalización (PN, EIRL, SAC, SACS) con costos y enlaces oficiales.
- Calculadoras: IGV, costo laboral por régimen, punto de equilibrio, cuota NRUS, IR según régimen.
- Glosario contable en lenguaje simple (basado en estas notas).
- Calendario de vencimientos según último dígito de RUC.

## Fase 2 (contadores y MYPE operando)
- Cursos/contenido nivel intermedio-avanzado (SIRE, cierre, NIIF).
- Plantillas descargables (flujo de caja, kárdex, conciliación).
- Recordatorios de vencimientos por correo/WhatsApp.

## Fase 3 (solo si hay tracción)
- Mini-sistema de registro de ventas/compras para NRUS-RER.
- Nunca competir frontalmente con ERPs de gran empresa.

## Principios de producto
- **Lenguaje simple primero**: cada término técnico con tooltip/explicación.
- Datos parametrizados (UIT, RMV, tasas) en un solo archivo de configuración → se actualizan cada enero sin tocar el código.
- Disclaimer legal visible: "información referencial, no reemplaza asesoría profesional".
- Móvil primero: el público emprendedor usa celular.

## Riesgos
- Normativa cambia cada año (UIT, cronogramas, resoluciones) → contenido desactualizado destruye la confianza. Mitigación: archivo de parámetros + fecha de "última verificación" visible en cada página.
- Responsabilidad por mal consejo → disclaimers y citar fuente oficial (SUNAT, SUNARP, MTPE) en cada dato.
