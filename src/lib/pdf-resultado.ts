import { nombreRegimen, type ResultadoWizard } from "@/lib/wizard-regimen";

const PW = 210; // A4 ancho mm
const PH = 297; // A4 alto mm
const ML = 18;  // margen
const CW = PW - ML * 2; // ancho útil

export async function generarPDFResultado(resultado: ResultadoWizard): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  let y = ML;

  // Verifica espacio; agrega página si falta.
  function checkPag(needed = 20) {
    if (y + needed > PH - ML) {
      doc.addPage();
      y = ML;
    }
  }

  // Configura fuente + color.
  function estilo(size: number, bold: boolean, r: number, g: number, b: number) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(r, g, b);
  }

  // Escribe texto con ajuste de línea; avanza y.
  function escribe(
    texto: string,
    size: number,
    bold: boolean,
    r: number, g: number, b: number,
    x = ML,
    maxW = CW
  ) {
    estilo(size, bold, r, g, b);
    const lineas: string[] = doc.splitTextToSize(texto, maxW - (x - ML));
    doc.text(lineas, x, y);
    y += lineas.length * (size * 0.353 * 1.5);
  }

  function gap(mm = 4) { y += mm; }

  function divisor(gris = 190) {
    doc.setDrawColor(gris, gris, gris);
    doc.line(ML, y, PW - ML, y);
    y += 5;
  }

  // ── CABECERA ────────────────────────────────────────────────────────────────
  const hoy = new Date().toLocaleDateString("es-PE", {
    day: "numeric", month: "long", year: "numeric",
  });

  escribe("FORMALIA", 16, true, 10, 55, 110);

  estilo(8, false, 80, 130, 80);
  doc.text("Tu aliado para crecer.", PW - ML, ML + 4.5, { align: "right" });
  estilo(8, false, 130, 130, 130);
  doc.text(hoy, PW - ML, ML + 9, { align: "right" });

  gap(9);
  divisor(180);

  // ── TÍTULO ──────────────────────────────────────────────────────────────────
  escribe("RESULTADO DE TU EVALUACION TRIBUTARIA", 13, true, 20, 20, 20);
  gap(5);

  // ── RÉGIMEN RECOMENDADO ─────────────────────────────────────────────────────
  escribe("REGIMEN RECOMENDADO", 8.5, true, 90, 90, 90);
  gap(2);
  escribe(nombreRegimen(resultado.regimenRecomendado), 14, true, 10, 55, 110);
  gap(3);
  escribe(resultado.explicacion, 10, false, 50, 50, 50);
  gap(7);

  // ── RAZONES ─────────────────────────────────────────────────────────────────
  checkPag(25);
  escribe("POR QUE ESTE REGIMEN", 8.5, true, 90, 90, 90);
  gap(2);
  for (const razon of resultado.razones) {
    checkPag(10);
    escribe(`> ${razon}`, 10, false, 50, 50, 50, ML + 3, CW - 3);
    gap(1);
  }
  gap(7);

  // ── ADVERTENCIAS ────────────────────────────────────────────────────────────
  if (resultado.advertencias.length > 0) {
    checkPag(20);
    escribe("CONSIDERACIONES IMPORTANTES", 8.5, true, 155, 85, 0);
    gap(2);
    for (const adv of resultado.advertencias) {
      checkPag(10);
      escribe(`> ${adv}`, 10, false, 130, 65, 0, ML + 3, CW - 3);
      gap(1);
    }
    gap(7);
  }

  // ── TABLA COMPARATIVA ───────────────────────────────────────────────────────
  if (resultado.regimenAlternativo && resultado.tabla.length > 0) {
    checkPag(25);
    escribe(
      `COMPARATIVA: ${nombreRegimen(resultado.regimenRecomendado)} vs ${nombreRegimen(resultado.regimenAlternativo)}`,
      8.5, true, 90, 90, 90
    );
    gap(3);

    const COL = CW / 3;
    const RH = 7; // row height

    // Cabecera tabla
    doc.setFillColor(215, 230, 255);
    doc.rect(ML, y, CW, RH, "F");
    estilo(8.5, true, 15, 45, 95);
    doc.text("Aspecto", ML + 2, y + 4.5);
    doc.text("Recomendado", ML + COL + 2, y + 4.5);
    doc.text("Alternativo", ML + COL * 2 + 2, y + 4.5);
    y += RH;

    // Filas
    resultado.tabla.forEach((fila, i) => {
      checkPag(10);
      if (i % 2 === 0) {
        doc.setFillColor(248, 249, 253);
        doc.rect(ML, y, CW, RH, "F");
      }
      const asp: string[] = doc.splitTextToSize(fila.aspecto, COL - 4);
      const rec: string[] = doc.splitTextToSize(fila.recomendado, COL - 4);
      const alt: string[] = doc.splitTextToSize(fila.alternativo ?? "-", COL - 4);

      estilo(8.5, false, 70, 70, 70);
      doc.text(asp, ML + 2, y + 4.5);
      estilo(8.5, true, 10, 50, 100);
      doc.text(rec, ML + COL + 2, y + 4.5);
      estilo(8.5, false, 70, 70, 70);
      doc.text(alt, ML + COL * 2 + 2, y + 4.5);

      y += Math.max(RH, Math.max(asp.length, rec.length, alt.length) * 4);
    });

    gap(7);
  }

  // ── PIE / DISCLAIMER ────────────────────────────────────────────────────────
  checkPag(30);
  divisor(200);
  escribe("AVISO LEGAL", 8, true, 100, 100, 100);
  gap(1);
  escribe(
    "Esta recomendacion es orientativa. Factores como el tipo exacto de actividad, " +
    "estructura societaria o situacion tributaria previa pueden cambiar el analisis. " +
    "Consulta con un contador publico colegiado antes de inscribirte en cualquier regimen.",
    8, false, 110, 110, 110
  );
  gap(4);
  escribe(
    `Generado en formalia.vercel.app/regimen  |  ${hoy}`,
    7.5, false, 155, 155, 155
  );

  // ── GUARDAR ─────────────────────────────────────────────────────────────────
  const archivo = `formalia-${resultado.regimenRecomendado.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(archivo);
}
