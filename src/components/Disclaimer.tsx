export default function Disclaimer() {
  return (
    <section className="no-print max-w-4xl mx-auto px-4 py-8">
      <div className="border-2 border-primary/30 rounded-lg bg-primary-light/20 p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-3">Wichtige Hinweise</h2>
        <p className="text-sm text-gray-700 mb-3">
          Die vom Rechner ermittelten Empfehlungen zur Vitamin-D-Supplementation basieren auf einer
          vereinfachten Berechnungsformel und dienen ausschließlich der ersten Orientierung. Sie
          stellen keine medizinische Beratung dar und ersetzen weder die ärztliche Konsultation noch
          die regelmäßige Kontrolle der Vitamin-D-Blutwerte.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          Sollte eine Messung nicht möglich sein, kann eine tägliche Dosis von bis zu{" "}
          <strong>4.000 I.E.</strong> (bei 70 kg Körpergewicht) für gesunde Erwachsene als sicher
          angesehen werden.
        </p>
        <p className="text-sm text-gray-700">
          Bei Vorliegen eines Mangels können höhere Dosierungen erforderlich sein. Diese sollten mit
          einem Arzt abgestimmt werden.
        </p>
      </div>
    </section>
  );
}
