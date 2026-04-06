import { useState, useMemo } from "react";
import { calculate, convertValue, type Unit, type CalcResults } from "../lib/calc";

interface Props {
  onResultsChange: (results: CalcResults & { inputs: { unit: Unit; currentLevel: number; targetLevel: number; weight: number; days: number; showMicrograms: boolean } }) => void;
}

export default function Calculator({ onResultsChange }: Props) {
  const [unit, setUnit] = useState<Unit>("ng");
  const [currentLevel, setCurrentLevel] = useState(30);
  const [targetLevel, setTargetLevel] = useState(60);
  const [weight, setWeight] = useState(70);
  const [days, setDays] = useState(14);
  const [showMicrograms, setShowMicrograms] = useState(false);

  const results = useMemo(() => {
    const r = calculate({ unit, currentLevel, targetLevel, weight, days, showMicrograms });
    onResultsChange({ ...r, inputs: { unit, currentLevel, targetLevel, weight, days, showMicrograms } });
    return r;
  }, [unit, currentLevel, targetLevel, weight, days, showMicrograms, onResultsChange]);

  const unitLabel = unit === "ng" ? "ng/ml" : "nmol/l";

  function handleUnitSwitch(newUnit: Unit) {
    if (newUnit === unit) return;
    setCurrentLevel(convertValue(currentLevel, unit, newUnit));
    setTargetLevel(convertValue(targetLevel, unit, newUnit));
    setUnit(newUnit);
  }

  return (
    <section className="no-print max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary-dark mb-2">
        Vitamin D — Bedarfsrechner
      </h2>
      <p className="text-gray-600 mb-6">
        Mit diesem Rechner können Sie schnell und einfach Ihre individuelle Vitamin D-Initialdosis
        und Erhaltungsdosis berechnen. Geben Sie einfach Ihre Werte ein — die Berechnung erfolgt
        automatisch.
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
        {/* Unit toggle */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Einheit</label>
          <div className="flex gap-2">
            {(["ng", "nmol"] as const).map((u) => (
              <button
                key={u}
                onClick={() => handleUnitSwitch(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unit === u
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {u === "ng" ? "ng/ml" : "nmol/l"}
              </button>
            ))}
          </div>
        </div>

        {/* Current level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Aktueller Vitamin D-Spiegel ({unitLabel})
          </label>
          <input
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Target level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Zielwert ({unitLabel})
          </label>
          <input
            type="number"
            value={targetLevel}
            onChange={(e) => setTargetLevel(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Körpergewicht (kg)
          </label>
          <input
            type="number"
            min={40}
            max={300}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Period */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Zeitraum für Initialdosis
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
          >
            {[7, 14, 21, 28].map((d) => (
              <option key={d} value={d}>
                {d} Tage
              </option>
            ))}
          </select>
        </div>

        {/* Micrograms toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showMicrograms}
            onChange={(e) => setShowMicrograms(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Ergebnisse in µg anzeigen</span>
        </label>

        {/* Results */}
        <div className="mt-6 pt-5 border-t-2 border-primary-light">
          <h3 className="text-lg font-bold text-primary-dark mb-3">Ergebnis</h3>

          {results.isTargetTooHigh && (
            <div className="bg-amber-50 border border-amber-300 text-amber-800 rounded-lg p-3 mb-3 text-sm">
              Hinweis: Bei Zielwerten über 60 ng/ml (150 nmol/l) ist keine Berechnung möglich.
            </div>
          )}

          {results.isWeightOutOfRange && (
            <div className="bg-red-50 border border-red-300 text-red-800 rounded-lg p-3 mb-3 text-sm">
              Bitte geben Sie ein Gewicht zwischen 40 und 300 kg ein.
            </div>
          )}

          {!results.isWeightOutOfRange && !results.isTargetTooHigh && (
            <div className="space-y-3">
              {/* Initial dose */}
              {results.isTargetTooLow ? (
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm">
                  Der Zielwert liegt unter oder auf dem aktuellen Spiegel. Keine Initialdosis
                  erforderlich.
                </div>
              ) : (
                <div className="bg-primary-light/30 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Initialdosis</div>
                  <div className="text-xl font-bold text-primary-dark">
                    {results.dailyInitialDose_IU.toLocaleString("de-DE")} I.E./Tag für{" "}
                    {results.days} Tage
                    {showMicrograms && (
                      <span className="text-base font-normal text-gray-600 ml-2">
                        ({results.dailyInitialDose_ug} µg/Tag)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Maintenance dose */}
              <div className="bg-primary-light/30 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Erhaltungsdosis</div>
                <div className="text-xl font-bold text-primary-dark">
                  {results.dailyMaintenance_IU.toLocaleString("de-DE")} I.E./Tag
                  {showMicrograms && (
                    <span className="text-base font-normal text-gray-600 ml-2">
                      ({results.dailyMaintenance_ug} µg/Tag)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
