import { PHARMACY } from "../lib/constants";

export default function Header() {
  return (
    <header className="no-print bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center gap-4">
        <img
          src={PHARMACY.logo}
          alt={PHARMACY.name}
          className="h-16 w-auto rounded bg-white p-1"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight">{PHARMACY.name}</h1>
          <p className="text-sm opacity-90">{PHARMACY.address}</p>
          <p className="text-sm opacity-90">
            Tel: {PHARMACY.phone} · {PHARMACY.email}
          </p>
        </div>
      </div>
    </header>
  );
}
