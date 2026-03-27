const rows = [
  { label: "Mangel", ng: "< 20", nmol: "< 50", color: "bg-red-100 text-red-800" },
  { label: "Suboptimal", ng: "20–30", nmol: "50–75", color: "bg-yellow-100 text-yellow-800" },
  { label: "Ausreichend", ng: "30–40", nmol: "75–100", color: "bg-green-100 text-green-700" },
  { label: "Optimal", ng: "40–60", nmol: "100–150", color: "bg-emerald-200 text-emerald-900" },
  { label: "Hoch", ng: "60–90", nmol: "150–225", color: "bg-yellow-100 text-yellow-800" },
  { label: "Toxisch", ng: "> 150", nmol: "> 375", color: "bg-red-100 text-red-800" },
];

export default function ReferenceTable() {
  return (
    <section className="no-print max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Referenzwerte</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-4 py-2 rounded-tl">Bereich</th>
              <th className="px-4 py-2">ng/ml</th>
              <th className="px-4 py-2">nmol/l</th>
              <th className="px-4 py-2 rounded-tr">Bewertung</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-200">
                <td className="px-4 py-2 font-medium">{row.label}</td>
                <td className="px-4 py-2">{row.ng}</td>
                <td className="px-4 py-2">{row.nmol}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${row.color}`}>
                    {row.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
