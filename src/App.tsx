import { useState, useCallback, useRef } from "react";
import Header from "./components/Header";
import Calculator from "./components/Calculator";
import ReferenceTable from "./components/ReferenceTable";
import Disclaimer from "./components/Disclaimer";
import PrintSection, { type PatientData } from "./components/PrintSection";
import PrintableReport from "./components/PrintableReport";
import Footer from "./components/Footer";
import type { CalcResults, Unit } from "./lib/calc";

type FullResults = CalcResults & {
  inputs: {
    unit: Unit;
    currentLevel: number;
    targetLevel: number;
    weight: number;
    days: number;
    showMicrograms: boolean;
  };
};

export default function App() {
  const resultsRef = useRef<FullResults | null>(null);
  const [, setTick] = useState(0);
  const [patient, setPatient] = useState<PatientData>({
    name: "",
    birthdate: "",
    patientId: "",
    gender: "",
  });

  const handleResultsChange = useCallback((r: FullResults) => {
    resultsRef.current = r;
    setTick((t) => t + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Calculator onResultsChange={handleResultsChange} />
        <ReferenceTable />
        <Disclaimer />
        <PrintSection onPatientChange={setPatient} />
      </main>
      <Footer />
      <PrintableReport results={resultsRef.current} patient={patient} />
    </div>
  );
}
