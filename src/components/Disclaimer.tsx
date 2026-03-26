export default function Disclaimer() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-2 border-primary/30 rounded-lg bg-primary-light/20 p-6">
        <h2 className="text-lg font-bold text-primary-dark mb-3">Wichtige Hinweise</h2>
        <p className="text-sm text-gray-700 mb-3">
          Die vom Rechner ermittelten Werte zur Vitamin D-Supplementation sind Ergebnisse einer
          Faustformel und dienen lediglich als erste Orientierung. Sie ersetzen weder die
          Konsultation eines Arztes noch die regelmäßige Laborkontrolle der Vitamin D-Blutwerte.
        </p>
        <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
          <li>
            Der Zielwert des Vitamin D-Spiegels liegt bei gesunden Erwachsenen zwischen{" "}
            <strong>40–60 ng/ml</strong> (100–150 nmol/l).
          </li>
          <li>
            Sollte eine Messung nicht möglich sein, kann eine tägliche Dosis von bis zu{" "}
            <strong>5.000 I.E.</strong> (bei 70 kg Körpergewicht) für gesunde Erwachsene als sicher
            angesehen werden.
          </li>
          <li>
            Dieser Rechner ist für <strong>gesunde Erwachsene</strong> konzipiert. Nicht zur
            Berechnung des Vitamin D-Bedarfs von Kindern verwenden.
          </li>
          <li>
            Im Krankheitsfall können höhere Dosierungen erforderlich sein. Diese sollten mit einem
            Arzt abgestimmt werden.
          </li>
          <li>
            Achten Sie auf eine ausreichende Zufuhr der Co-Faktoren <strong>Magnesium</strong> und{" "}
            <strong>Vitamin K2</strong>.
          </li>
        </ul>
      </div>
    </section>
  );
}
