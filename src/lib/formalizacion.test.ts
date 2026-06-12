import { describe, it, expect } from "vitest";
import {
  TIPOS_EMPRESA,
  FILAS_COMPARATIVA,
  TEXTO_ADVERTENCIA_FE,
  contarCompletados,
  exportarTexto,
  type TipoEmpresaId,
} from "./formalizacion";

const TIPO_IDS: TipoEmpresaId[] = ["pn", "eirl", "sac", "srl", "sacs"];

describe("TIPOS_EMPRESA", () => {
  it("contiene exactamente 5 tipos", () => {
    expect(TIPOS_EMPRESA).toHaveLength(5);
  });

  it("los ids son únicos", () => {
    const ids = TIPOS_EMPRESA.map((t) => t.id);
    expect(new Set(ids).size).toBe(5);
  });

  it("incluye todos los tipos esperados", () => {
    const ids = TIPOS_EMPRESA.map((t) => t.id);
    for (const id of TIPO_IDS) {
      expect(ids).toContain(id);
    }
  });

  TIPO_IDS.forEach((id) => {
    describe(`tipo "${id}"`, () => {
      const tipo = TIPOS_EMPRESA.find((t) => t.id === id)!;

      it("tiene al menos 3 pasos", () => {
        expect(tipo.pasos.length).toBeGreaterThanOrEqual(3);
      });

      it("todos los pasos tienen id, titulo y descripcion no vacíos", () => {
        for (const paso of tipo.pasos) {
          expect(paso.id.trim().length).toBeGreaterThan(0);
          expect(paso.titulo.trim().length).toBeGreaterThan(0);
          expect(paso.descripcion.trim().length).toBeGreaterThan(0);
        }
      });

      it("los ids de pasos son únicos dentro del tipo", () => {
        const ids = tipo.pasos.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("cada paso tiene costoTexto y tiempoTexto", () => {
        for (const paso of tipo.pasos) {
          expect(paso.costoTexto.trim().length).toBeGreaterThan(0);
          expect(paso.tiempoTexto.trim().length).toBeGreaterThan(0);
        }
      });

      it("tiene ventajas y desventajas", () => {
        expect(tipo.ventajas.length).toBeGreaterThan(0);
        expect(tipo.desventajas.length).toBeGreaterThan(0);
      });

      it("tiene nombre, emoji y costoResumen", () => {
        expect(tipo.nombre.length).toBeGreaterThan(0);
        expect(tipo.emoji.length).toBeGreaterThan(0);
        expect(tipo.costoResumen.length).toBeGreaterThan(0);
      });
    });
  });

  it("pn tiene exactamente 4 pasos", () => {
    expect(TIPOS_EMPRESA.find((t) => t.id === "pn")!.pasos).toHaveLength(4);
  });

  it("eirl tiene 9 pasos", () => {
    expect(TIPOS_EMPRESA.find((t) => t.id === "eirl")!.pasos).toHaveLength(9);
  });

  it("sac tiene 9 pasos", () => {
    expect(TIPOS_EMPRESA.find((t) => t.id === "sac")!.pasos).toHaveLength(9);
  });

  it("srl tiene 9 pasos", () => {
    expect(TIPOS_EMPRESA.find((t) => t.id === "srl")!.pasos).toHaveLength(9);
  });

  it("sacs tiene 8 pasos", () => {
    expect(TIPOS_EMPRESA.find((t) => t.id === "sacs")!.pasos).toHaveLength(8);
  });

  it("pn tiene paso con advertenciaTexto sobre facturación electrónica", () => {
    const pn = TIPOS_EMPRESA.find((t) => t.id === "pn")!;
    const conAdvertencia = pn.pasos.filter((p) => p.advertenciaTexto !== null);
    expect(conAdvertencia.length).toBeGreaterThan(0);
  });

  it("eirl no puede estar en NRUS (descripción del paso régimen lo indica)", () => {
    const eirl = TIPOS_EMPRESA.find((t) => t.id === "eirl")!;
    const pasoRegimen = eirl.pasos.find((p) => p.id.includes("regimen"));
    expect(pasoRegimen?.descripcion).toContain("NRUS");
  });

  it("pn tiene costo Gratis", () => {
    const pn = TIPOS_EMPRESA.find((t) => t.id === "pn")!;
    expect(pn.costoResumen).toBe("Gratis");
  });

  it("los costos de eirl, sac y srl incluyen S/", () => {
    for (const id of ["eirl", "sac", "srl"] as TipoEmpresaId[]) {
      const tipo = TIPOS_EMPRESA.find((t) => t.id === id)!;
      expect(tipo.costoResumen).toContain("S/");
    }
  });

  it("sacs tiene costo menor que pjTradicional", () => {
    const sacs = TIPOS_EMPRESA.find((t) => t.id === "sacs")!;
    const eirl = TIPOS_EMPRESA.find((t) => t.id === "eirl")!;
    expect(sacs.costoResumen).toContain("100");
    expect(eirl.costoResumen).toContain("700");
  });
});

describe("FILAS_COMPARATIVA", () => {
  it("tiene al menos 5 filas", () => {
    expect(FILAS_COMPARATIVA.length).toBeGreaterThanOrEqual(5);
  });

  it("cada fila tiene valores no vacíos para los 5 tipos", () => {
    for (const fila of FILAS_COMPARATIVA) {
      for (const id of TIPO_IDS) {
        expect(fila.valores[id]).toBeDefined();
        expect(fila.valores[id].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("cada fila tiene un aspecto no vacío", () => {
    for (const fila of FILAS_COMPARATIVA) {
      expect(fila.aspecto.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("TEXTO_ADVERTENCIA_FE", () => {
  it("menciona R.S. 000075-2026/SUNAT", () => {
    expect(TEXTO_ADVERTENCIA_FE).toContain("R.S. 000075-2026/SUNAT");
  });

  it("menciona montos en soles", () => {
    expect(TEXTO_ADVERTENCIA_FE).toContain("S/");
  });

  it("no está vacío", () => {
    expect(TEXTO_ADVERTENCIA_FE.trim().length).toBeGreaterThan(50);
  });
});

describe("contarCompletados", () => {
  const pn = TIPOS_EMPRESA.find((t) => t.id === "pn")!;

  it("retorna 0 con estado vacío", () => {
    expect(contarCompletados(pn.pasos, {})).toEqual({
      completados: 0,
      total: pn.pasos.length,
    });
  });

  it("retorna el total cuando todos están marcados", () => {
    const estado: Record<string, boolean> = {};
    for (const paso of pn.pasos) estado[paso.id] = true;
    expect(contarCompletados(pn.pasos, estado)).toEqual({
      completados: pn.pasos.length,
      total: pn.pasos.length,
    });
  });

  it("ignora ids que no corresponden a pasos", () => {
    const estado = { "id-inexistente": true };
    expect(contarCompletados(pn.pasos, estado).completados).toBe(0);
  });

  it("cuenta correctamente un subconjunto", () => {
    const estado: Record<string, boolean> = {};
    estado[pn.pasos[0].id] = true;
    estado[pn.pasos[1].id] = false;
    expect(contarCompletados(pn.pasos, estado).completados).toBe(1);
  });
});

describe("exportarTexto", () => {
  const pn = TIPOS_EMPRESA.find((t) => t.id === "pn")!;

  it("genera texto no vacío", () => {
    expect(exportarTexto(pn, {}).length).toBeGreaterThan(100);
  });

  it("incluye el nombre del tipo", () => {
    expect(exportarTexto(pn, {})).toContain(pn.nombre);
  });

  it("incluye todos los títulos de pasos", () => {
    const texto = exportarTexto(pn, {});
    for (const paso of pn.pasos) {
      expect(texto).toContain(paso.titulo);
    }
  });

  it("usa ✓ para pasos completados", () => {
    const estado = { [pn.pasos[0].id]: true };
    expect(exportarTexto(pn, estado)).toContain("✓");
  });

  it("usa ○ para pasos pendientes", () => {
    expect(exportarTexto(pn, {})).toContain("○");
  });

  it("incluye aviso legal", () => {
    expect(exportarTexto(pn, {})).toContain("Aviso legal");
  });
});
