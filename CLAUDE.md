# CLAUDE.md — ContaPerú (nombre provisional)

## Qué es este proyecto
Plataforma web educativa y de herramientas para emprendedores peruanos que quieren formalizar su negocio y entender su contabilidad, y (fase 2) utilidades para contadores. NO es un ERP ni un sistema contable completo.

## Público objetivo (en orden de prioridad)
1. Emprendedores SIN conocimientos de contabilidad ni finanzas (prioridad máxima).
2. MYPE ya formalizadas que quieren entender/controlar sus números.
3. Contadores (calculadoras y recordatorios; fase 2).

## Regla de oro de contenido
TODO texto visible debe ser entendible por alguien sin formación financiera:
- Cada término técnico (IGV, UIT, crédito fiscal, devengado) lleva un tooltip o enlace al glosario.
- Frases cortas, ejemplos con montos en soles, analogías cotidianas.
- Nivel de lectura objetivo: secundaria completa.

## Contexto normativo (Perú, datos 2026 — verificados a junio 2026)
- UIT 2026: S/ 5,500 (D.S. 301-2025-EF). RMV: S/ 1,130. IGV: 18%.
- 4 regímenes tributarios: NRUS (tope S/ 96,000/año, solo boletas), RER (tope S/ 525,000, paga 1.5% de ingresos + IGV), RMT (tope 1,700 UIT; IR anual 10% hasta 15 UIT de utilidad y 29.5% por exceso), RG (sin límite, 29.5%).
- Desde 01/06/2026 (R.S. 000075-2026/SUNAT): nuevos RUC en RER/RMT/RG son emisores electrónicos desde el día de inscripción y usan SIRE desde que nace la obligación.
- Detalle completo en `datos/investigacion-contable-peru.md` — LEER ANTES de escribir cualquier contenido normativo.

## Arquitectura técnica
- Stack: Next.js 14+ (App Router) + TypeScript + Tailwind CSS. Sin backend complejo en MVP (contenido estático + calculadoras client-side).
- Despliegue: Vercel.
- TODOS los parámetros normativos (UIT, RMV, tasas, topes, costos de trámites) viven en `src/config/parametros-peru.ts` con campo `vigencia` y `fuente`. NUNCA hardcodear montos en componentes.
- Cada página de contenido muestra "Última verificación: <fecha>" leída de frontmatter/config.
- Contenido educativo en MDX dentro de `src/content/`, organizado igual que la investigación (fundamentos, regímenes, formalización, etc.).

## Componentes clave del MVP
1. `WizardRegimen`: árbol de decisión "¿qué régimen me conviene?" (preguntas: ¿facturas a empresas?, ¿ingresos mensuales estimados?, ¿tienes utilidad o margen bajo?). Lógica en `src/lib/wizard-regimen.ts` con tests.
2. Calculadoras (client-side, en `src/components/calculadoras/`): IGV, costo laboral por régimen (general vs pequeña vs micro), punto de equilibrio, cuota NRUS, IR anual RMT vs RG comparado.
3. `GuiaFormalizacion`: checklist interactivo por tipo de empresa (PN, EIRL, SAC, SACS) con costos y enlaces oficiales (gob.pe, SUNARP, SUNAT).
4. Glosario con búsqueda.
5. Calendario de vencimientos por último dígito de RUC (datos en config, no hardcodeados).

## Reglas de desarrollo
- Mobile-first. Accesibilidad AA (la audiencia incluye usuarios de gama baja y conexiones lentas).
- Sin dependencias pesadas; Lighthouse performance > 90.
- Cada calculadora: pure function en `src/lib/` + tests unitarios con casos límite (ingresos exactamente en el tope del régimen, por ejemplo).
- Disclaimer legal en footer y en cada calculadora: "Información referencial. No constituye asesoría contable, legal ni tributaria."
- Español peruano. Tono cercano, no académico. "Tu negocio", no "el contribuyente".
- No inventar montos, tasas ni plazos: si un dato no está en `datos/investigacion-contable-peru.md` ni en `parametros-peru.ts`, marcar TODO y preguntar.

## Comandos
- `npm run dev` / `npm run build` / `npm run test` / `npm run lint`
