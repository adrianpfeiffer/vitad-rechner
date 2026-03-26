import { PHARMACY } from "../lib/constants";
import type { CalcResults, Unit } from "../lib/calc";
import type { PatientData } from "./PrintSection";

interface Props {
  results: (CalcResults & {
    inputs: {
      unit: Unit;
      currentLevel: number;
      targetLevel: number;
      weight: number;
      days: number;
      showMicrograms: boolean;
    };
  }) | null;
  patient: PatientData;
}

const refRows = [
  { label: "Mangel", ng: "< 20", nmol: "< 50", style: "background:#fee2e2;color:#991b1b" },
  { label: "Suboptimal", ng: "20–30", nmol: "50–75", style: "background:#fef9c3;color:#854d0e" },
  { label: "Ausreichend", ng: "30–40", nmol: "75–100", style: "background:#dcfce7;color:#166534" },
  { label: "Optimal", ng: "40–60", nmol: "100–150", style: "background:#a7f3d0;color:#064e3b" },
  { label: "Hoch", ng: "60–90", nmol: "150–225", style: "background:#fef9c3;color:#854d0e" },
  { label: "Toxisch", ng: "> 150", nmol: "> 375", style: "background:#fee2e2;color:#991b1b" },
];

export default function PrintableReport({ results, patient }: Props) {
  if (!results) return null;

  const now = new Date();
  const dateStr = now.toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const unitLabel = results.inputs.unit === "ng" ? "ng/ml" : "nmol/l";

  return (
    <div className="print-only hidden" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #2D6A4F", paddingBottom: "12px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "20pt", fontWeight: "bold", color: "#2D6A4F" }}>
            {PHARMACY.name}
          </div>
          <div style={{ fontSize: "9pt", color: "#555", marginTop: "4px" }}>
            {PHARMACY.address}<br />
            Tel: {PHARMACY.phone} · {PHARMACY.email}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "9pt", color: "#555" }}>
          <div>Datum: {dateStr}</div>
          <div>Uhrzeit: {timeStr}</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ fontSize: "16pt", fontWeight: "bold", color: "#1B4332", marginBottom: "16px" }}>
        Vitamin D — Bedarfsberechnung
      </div>

      {/* Patient data */}
      {(patient.name || patient.birthdate || patient.patientId || patient.gender) && (
        <div style={{ marginBottom: "16px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <div style={{ fontSize: "10pt", fontWeight: "bold", marginBottom: "6px", color: "#2D6A4F" }}>
            Patientendaten
          </div>
          <div style={{ fontSize: "9pt", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
            {patient.name && <div><strong>Name:</strong> {patient.name}</div>}
            {patient.birthdate && (
              <div>
                <strong>Geburtsdatum:</strong>{" "}
                {new Date(patient.birthdate).toLocaleDateString("de-AT")}
              </div>
            )}
            {patient.patientId && <div><strong>Patienten-ID / SV-Nr.:</strong> {patient.patientId}</div>}
            {patient.gender && <div><strong>Geschlecht:</strong> {patient.gender}</div>}
          </div>
        </div>
      )}

      {/* Input values */}
      <div style={{ marginBottom: "16px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
        <div style={{ fontSize: "10pt", fontWeight: "bold", marginBottom: "6px", color: "#2D6A4F" }}>
          Eingegebene Werte
        </div>
        <div style={{ fontSize: "9pt", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
          <div><strong>Aktueller Spiegel:</strong> {results.inputs.currentLevel} {unitLabel}</div>
          <div><strong>Zielwert:</strong> {results.inputs.targetLevel} {unitLabel}</div>
          <div><strong>Körpergewicht:</strong> {results.inputs.weight} kg</div>
          <div><strong>Zeitraum:</strong> {results.inputs.days} Tage</div>
        </div>
      </div>

      {/* Results */}
      <div style={{ marginBottom: "20px", padding: "12px", border: "2px solid #2D6A4F", borderRadius: "6px", background: "#f0fdf4" }}>
        <div style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "8px", color: "#1B4332" }}>
          Ergebnis
        </div>
        {results.isTargetTooLow ? (
          <div style={{ fontSize: "10pt", color: "#854d0e" }}>
            Der Zielwert liegt unter oder auf dem aktuellen Spiegel. Keine Initialdosis erforderlich.
          </div>
        ) : (
          <div style={{ fontSize: "10pt" }}>
            <div style={{ marginBottom: "6px" }}>
              <strong>Initialdosis:</strong>{" "}
              {results.dailyInitialDose_IU.toLocaleString("de-DE")} I.E./Tag für{" "}
              {results.days} Tage
              {results.inputs.showMicrograms && (
                <span style={{ color: "#555" }}> ({results.dailyInitialDose_ug} µg/Tag)</span>
              )}
            </div>
            <div>
              <strong>Erhaltungsdosis:</strong>{" "}
              {results.dailyMaintenance_IU.toLocaleString("de-DE")} I.E./Tag
              {results.inputs.showMicrograms && (
                <span style={{ color: "#555" }}> ({results.dailyMaintenance_ug} µg/Tag)</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reference table */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10pt", fontWeight: "bold", marginBottom: "6px", color: "#2D6A4F" }}>
          Referenzwerte
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9pt" }}>
          <thead>
            <tr style={{ background: "#2D6A4F", color: "white" }}>
              <th style={{ padding: "4px 8px", textAlign: "left" }}>Bereich</th>
              <th style={{ padding: "4px 8px", textAlign: "left" }}>ng/ml</th>
              <th style={{ padding: "4px 8px", textAlign: "left" }}>nmol/l</th>
            </tr>
          </thead>
          <tbody>
            {refRows.map((row) => (
              <tr key={row.label} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "3px 8px", ...parseStyle(row.style), fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: "3px 8px" }}>{row.ng}</td>
                <td style={{ padding: "3px 8px" }}>{row.nmol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div style={{ fontSize: "8pt", color: "#555", borderTop: "1px solid #ccc", paddingTop: "10px", lineHeight: "1.5" }}>
        <strong>Wichtige Hinweise:</strong> Die vom Rechner ermittelten Werte zur Vitamin
        D-Supplementation sind Ergebnisse einer Faustformel und dienen lediglich als erste
        Orientierung. Sie ersetzen weder die Konsultation eines Arztes noch die regelmäßige
        Laborkontrolle der Vitamin D-Blutwerte. Dieser Rechner ist für gesunde Erwachsene
        konzipiert. Achten Sie auf eine ausreichende Zufuhr der Co-Faktoren Magnesium und
        Vitamin K2.
      </div>

      {/* Footer */}
      <div style={{ marginTop: "20px", fontSize: "7pt", color: "#999", textAlign: "center" }}>
        Erstellt mit VitaD Rechner · {PHARMACY.name} · {dateStr}
      </div>
    </div>
  );
}

function parseStyle(s: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  s.split(";").forEach((rule) => {
    const [key, value] = rule.split(":");
    if (key && value) {
      const camelKey = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camelKey] = value.trim();
    }
  });
  return obj;
}
