import { useState } from "react";
import { sendPrintNotification } from "../lib/email";

export interface PatientData {
  name: string;
  birthdate: string;
  patientId: string;
  gender: string;
}

interface Props {
  onPatientChange: (data: PatientData) => void;
}

export default function PrintSection({ onPatientChange }: Props) {
  const [patient, setPatient] = useState<PatientData>({
    name: "",
    birthdate: "",
    patientId: "",
    gender: "",
  });

  function update(field: keyof PatientData, value: string) {
    const next = { ...patient, [field]: value };
    setPatient(next);
    onPatientChange(next);
  }

  function handlePrint() {
    sendPrintNotification();
    window.print();
  }

  return (
    <section className="no-print max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Bericht drucken</h2>
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={patient.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Geburtsdatum</label>
            <input
              type="date"
              value={patient.birthdate}
              onChange={(e) => update("birthdate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Patienten-ID / SV-Nr.
            </label>
            <input
              type="text"
              value={patient.patientId}
              onChange={(e) => update("patientId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Geschlecht</label>
            <select
              value={patient.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
            >
              <option value="">Keine Angabe</option>
              <option value="männlich">Männlich</option>
              <option value="weiblich">Weiblich</option>
              <option value="divers">Divers</option>
            </select>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="mt-4 w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
        >
          Bericht drucken
        </button>
      </div>
    </section>
  );
}
