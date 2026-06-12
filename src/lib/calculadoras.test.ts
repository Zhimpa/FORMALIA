import { describe, it, expect } from "vitest";
import {
  calcularIGV,
  calcularDebitoCredito,
  calcularCostoLaboral,
  calcularPuntoEquilibrio,
  calcularImpuestoRenta,
  calcularCuotaNRUS,
} from "./calculadoras";

// ---------------------------------------------------------------------------
// 1. IGV
// ---------------------------------------------------------------------------

describe("calcularIGV", () => {
  describe("precio sin IGV (incluyeIGV=false)", () => {
    it("S/ 1,000 → base=1000, igv=180, total=1180", () => {
      const r = calcularIGV(1000, false);
      expect(r.montoBase).toBe(1000);
      expect(r.igv).toBe(180);
      expect(r.montoTotal).toBe(1180);
    });

    it("S/ 0 → todo en cero", () => {
      const r = calcularIGV(0, false);
      expect(r.igv).toBe(0);
      expect(r.montoTotal).toBe(0);
    });

    it("monto no redondo → igv redondeado a 2 decimales", () => {
      const r = calcularIGV(50.50, false);
      expect(r.igv).toBe(9.09);
      expect(r.montoTotal).toBe(59.59);
    });

    it("tasaIGV es siempre 18", () => {
      expect(calcularIGV(500, false).tasaIGV).toBe(18);
    });
  });

  describe("precio con IGV (incluyeIGV=true)", () => {
    it("S/ 1,180 → base=1000, igv=180, total=1180", () => {
      const r = calcularIGV(1180, true);
      expect(r.montoBase).toBe(1000);
      expect(r.igv).toBe(180);
      expect(r.montoTotal).toBe(1180);
    });

    it("S/ 100 → base=84.75, igv=15.25", () => {
      const r = calcularIGV(100, true);
      expect(r.montoBase).toBe(84.75);
      expect(r.igv).toBe(15.25);
      expect(r.montoTotal).toBe(100);
    });

    it("base + igv no supera el total original", () => {
      const monto = 250;
      const r = calcularIGV(monto, true);
      expect(r.montoBase + r.igv).toBeLessThanOrEqual(monto + 0.01);
    });
  });
});

describe("calcularDebitoCredito", () => {
  it("ventas > compras → saldo positivo (debe pagar)", () => {
    const r = calcularDebitoCredito(10000, 5000);
    expect(r.debitoFiscal).toBe(1800);
    expect(r.creditoFiscal).toBe(900);
    expect(r.saldo).toBe(900);
    expect(r.debesPagar).toBe(true);
  });

  it("ventas < compras → saldo negativo (a favor)", () => {
    const r = calcularDebitoCredito(5000, 10000);
    expect(r.saldo).toBe(-900);
    expect(r.debesPagar).toBe(false);
  });

  it("ventas = compras → saldo cero", () => {
    const r = calcularDebitoCredito(5000, 5000);
    expect(r.saldo).toBe(0);
    expect(r.debesPagar).toBe(false);
  });

  it("sin compras → débito fiscal = 18% de ventas", () => {
    const r = calcularDebitoCredito(20000, 0);
    expect(r.debitoFiscal).toBe(3600);
    expect(r.creditoFiscal).toBe(0);
    expect(r.saldo).toBe(3600);
  });
});

// ---------------------------------------------------------------------------
// 2. Costo laboral
// ---------------------------------------------------------------------------

describe("calcularCostoLaboral", () => {
  describe("régimen general (sueldo=1000)", () => {
    const r = calcularCostoLaboral(1000, "general");

    it("ESSALUD = 9% = 90", () => expect(r.essaludMensual).toBe(90));
    it("CTS = 1 sueldo/año ÷ 12 = 83.33", () => expect(r.ctsMensual).toBe(83.33));
    it("gratificaciones = 2 sueldos/año ÷ 12 = 166.67", () => expect(r.gratificacionesMensual).toBe(166.67));
    it("vacaciones = 1 sueldo/año ÷ 12 = 83.33", () => expect(r.vacacionesMensual).toBe(83.33));
    it("costo mensual promedio = 1423.33", () => expect(r.costoMensualPromedio).toBe(1423.33));
    it("multiplicador ≈ 1.42", () => expect(r.multiplicador).toBe(1.42));
    it("costo anual = 12 × mensual", () => expect(r.costoAnual).toBe(r.costoMensualPromedio * 12));
  });

  describe("pequeña empresa (sueldo=1000)", () => {
    const r = calcularCostoLaboral(1000, "pequeña");

    it("ESSALUD = 9% = 90", () => expect(r.essaludMensual).toBe(90));
    it("CTS = ½ sueldo/año ÷ 12 = 41.67", () => expect(r.ctsMensual).toBe(41.67));
    it("gratificaciones = 1 sueldo/año ÷ 12 = 83.33", () => expect(r.gratificacionesMensual).toBe(83.33));
    it("vacaciones = ½ sueldo/año ÷ 12 = 41.67", () => expect(r.vacacionesMensual).toBe(41.67));
    it("costo mensual promedio = 1256.67", () => expect(r.costoMensualPromedio).toBe(1256.67));
    it("multiplicador ≈ 1.26", () => expect(r.multiplicador).toBe(1.26));
  });

  describe("microempresa (sueldo=1000)", () => {
    const r = calcularCostoLaboral(1000, "micro");

    it("ESSALUD = 0 (SIS subsidiado)", () => expect(r.essaludMensual).toBe(0));
    it("CTS = 0 (no aplica)", () => expect(r.ctsMensual).toBe(0));
    it("gratificaciones = 0 (no aplica)", () => expect(r.gratificacionesMensual).toBe(0));
    it("vacaciones = 15 días = 41.67", () => expect(r.vacacionesMensual).toBe(41.67));
    it("costo mensual promedio = 1041.67", () => expect(r.costoMensualPromedio).toBe(1041.67));
    it("multiplicador ≈ 1.04", () => expect(r.multiplicador).toBe(1.04));
  });

  it("microempresa cuesta menos que pequeña que cuesta menos que general", () => {
    const micro = calcularCostoLaboral(2000, "micro");
    const pequeña = calcularCostoLaboral(2000, "pequeña");
    const general = calcularCostoLaboral(2000, "general");
    expect(micro.costoMensualPromedio).toBeLessThan(pequeña.costoMensualPromedio);
    expect(pequeña.costoMensualPromedio).toBeLessThan(general.costoMensualPromedio);
  });

  it("el sueldo bruto se conserva sin cambio", () => {
    expect(calcularCostoLaboral(3500, "general").sueldoBruto).toBe(3500);
  });
});

// ---------------------------------------------------------------------------
// 3. Punto de equilibrio
// ---------------------------------------------------------------------------

describe("calcularPuntoEquilibrio", () => {
  it("CF=10000, CV=5, P=15 → 1000 unidades", () => {
    const r = calcularPuntoEquilibrio(10000, 5, 15);
    expect(r.esViable).toBe(true);
    expect(r.margenContribucion).toBe(10);
    expect(r.peUnidades).toBe(1000);
    expect(r.peSoles).toBe(15000);
    expect(r.margenContribucionPct).toBe(66.67);
  });

  it("redondea hacia arriba las unidades (ceil)", () => {
    const r = calcularPuntoEquilibrio(1000, 3, 7);
    // mc=4, pe=250 exacto
    expect(r.peUnidades).toBe(250);
  });

  it("CF=1000, CV=5, P=7 → ceil(500) = 500", () => {
    const r = calcularPuntoEquilibrio(1000, 5, 7);
    // mc=2, pe=500
    expect(r.peUnidades).toBe(500);
    expect(r.peSoles).toBe(3500);
  });

  it("precio = costo variable → no viable (MC = 0)", () => {
    const r = calcularPuntoEquilibrio(5000, 10, 10);
    expect(r.esViable).toBe(false);
    expect(r.peUnidades).toBeNull();
    expect(r.peSoles).toBeNull();
  });

  it("precio < costo variable → no viable (MC negativo)", () => {
    const r = calcularPuntoEquilibrio(5000, 15, 10);
    expect(r.esViable).toBe(false);
    expect(r.margenContribucion).toBe(-5);
  });

  it("costos fijos = 0 → PE = 0 unidades (ya está en equilibrio)", () => {
    const r = calcularPuntoEquilibrio(0, 5, 10);
    expect(r.esViable).toBe(true);
    expect(r.peUnidades).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 4. Impuesto a la Renta anual
// ---------------------------------------------------------------------------

describe("calcularImpuestoRenta", () => {
  it("utilidad = 0 → sin impuesto", () => {
    const r = calcularImpuestoRenta(0);
    expect(r.impuestoRMT).toBe(0);
    expect(r.impuestoRG).toBe(0);
    expect(r.ahorroRMT).toBe(0);
  });

  it("utilidad negativa → tratada como 0", () => {
    const r = calcularImpuestoRenta(-50000);
    expect(r.utilidad).toBe(0);
    expect(r.impuestoRMT).toBe(0);
  });

  it("utilidad = 50,000 (< 15 UIT = 82,500) → tasa plana 10%", () => {
    const r = calcularImpuestoRenta(50000);
    expect(r.impuestoRMT).toBe(5000);
    expect(r.impuestoRG).toBe(14750);
    expect(r.ahorroRMT).toBe(9750);
    expect(r.detalleRMT.tramoExceso).toBe(0);
    expect(r.detalleRMT.impuestoExceso).toBe(0);
  });

  it("utilidad = 82,500 (exactamente 15 UIT) → todo al 10%", () => {
    const r = calcularImpuestoRenta(82500);
    expect(r.impuestoRMT).toBe(8250);
    expect(r.detalleRMT.tramoExceso).toBe(0);
  });

  it("utilidad = 100,000 (supera 15 UIT) → tramos distintos", () => {
    const r = calcularImpuestoRenta(100000);
    expect(r.detalleRMT.tramoBase).toBe(82500);
    expect(r.detalleRMT.impuestoBase).toBe(8250);
    expect(r.detalleRMT.tramoExceso).toBe(17500);
    expect(r.detalleRMT.impuestoExceso).toBe(5162.5);
    expect(r.impuestoRMT).toBe(13412.5);
    expect(r.impuestoRG).toBe(29500);
    expect(r.ahorroRMT).toBe(16087.5);
  });

  it("RMT siempre paga menos o igual que RG", () => {
    for (const u of [0, 10000, 50000, 82500, 200000, 1000000]) {
      const r = calcularImpuestoRenta(u);
      expect(r.impuestoRMT).toBeLessThanOrEqual(r.impuestoRG + 0.01);
    }
  });

  it("tasa efectiva RG es siempre 29.5%", () => {
    const r = calcularImpuestoRenta(100000);
    expect(r.tasaEfectivaRG).toBe(29.5);
  });

  it("tasa efectiva RMT < 29.5% para cualquier utilidad positiva", () => {
    for (const u of [1000, 50000, 100000, 500000]) {
      const r = calcularImpuestoRenta(u);
      expect(r.tasaEfectivaRMT).toBeLessThan(29.5);
    }
  });

  describe("escala progresiva RMT — casos de referencia", () => {
    it("utilidad S/ 82,500 (exactamente 15 UIT) → IR = S/ 8,250 (todo al 10%)", () => {
      const r = calcularImpuestoRenta(82_500);
      // tramo base: 82,500 × 10% = 8,250
      expect(r.detalleRMT.tramoBase).toBe(82_500);
      expect(r.detalleRMT.impuestoBase).toBe(8_250);
      // sin exceso
      expect(r.detalleRMT.tramoExceso).toBe(0);
      expect(r.detalleRMT.impuestoExceso).toBe(0);
      expect(r.impuestoRMT).toBe(8_250);
    });

    it("utilidad S/ 100,000 → IR = 8,250 + 29.5% × 17,500 = S/ 13,412.50", () => {
      const r = calcularImpuestoRenta(100_000);
      // tramo 1: 82,500 × 10% = 8,250
      expect(r.detalleRMT.tramoBase).toBe(82_500);
      expect(r.detalleRMT.impuestoBase).toBe(8_250);
      // tramo 2: (100,000 − 82,500) × 29.5% = 17,500 × 0.295 = 5,162.50
      expect(r.detalleRMT.tramoExceso).toBe(17_500);
      expect(r.detalleRMT.impuestoExceso).toBe(5_162.5);
      // total: 8,250 + 5,162.50 = 13,412.50
      expect(r.impuestoRMT).toBe(13_412.5);
    });
  });
});

// ---------------------------------------------------------------------------
// 5. Cuota NRUS
// ---------------------------------------------------------------------------

describe("calcularCuotaNRUS", () => {
  it("ingresos = 0 → categoría 1, cuota 20", () => {
    const r = calcularCuotaNRUS(0);
    expect(r.categoria).toBe(1);
    expect(r.cuotaMensual).toBe(20);
    expect(r.superaTope).toBe(false);
  });

  it("ingresos = 3,000 → categoría 1", () => {
    const r = calcularCuotaNRUS(3000);
    expect(r.categoria).toBe(1);
    expect(r.cuotaMensual).toBe(20);
  });

  it("ingresos exactamente S/ 5,000 (tope Cat1) → categoría 1", () => {
    const r = calcularCuotaNRUS(5000);
    expect(r.categoria).toBe(1);
    expect(r.cuotaMensual).toBe(20);
  });

  it("ingresos = 5,001 (un sol sobre Cat1) → categoría 2", () => {
    const r = calcularCuotaNRUS(5001);
    expect(r.categoria).toBe(2);
    expect(r.cuotaMensual).toBe(50);
  });

  it("ingresos = 7,500 → categoría 2", () => {
    const r = calcularCuotaNRUS(7500);
    expect(r.categoria).toBe(2);
    expect(r.cuotaMensual).toBe(50);
  });

  it("ingresos exactamente S/ 8,000 (tope Cat2) → categoría 2", () => {
    const r = calcularCuotaNRUS(8000);
    expect(r.categoria).toBe(2);
    expect(r.cuotaMensual).toBe(50);
    expect(r.superaTope).toBe(false);
  });

  it("ingresos = 8,001 → supera tope NRUS", () => {
    const r = calcularCuotaNRUS(8001);
    expect(r.categoria).toBeNull();
    expect(r.cuotaMensual).toBeNull();
    expect(r.superaTope).toBe(true);
  });

  it("topes están disponibles en el resultado", () => {
    const r = calcularCuotaNRUS(1000);
    expect(r.topeCat1).toBe(5000);
    expect(r.topeCat2).toBe(8000);
  });
});
