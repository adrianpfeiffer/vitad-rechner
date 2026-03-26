import { PHARMACY } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="no-print bg-primary-dark text-white/80 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm space-y-1">
        <p>{PHARMACY.name} · {PHARMACY.address}</p>
        <p>
          Tel: {PHARMACY.phone} ·{" "}
          <a href={`mailto:${PHARMACY.email}`} className="underline hover:text-white">
            {PHARMACY.email}
          </a>{" "}
          ·{" "}
          <a href={PHARMACY.web} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            {PHARMACY.web.replace("https://", "")}
          </a>
        </p>
        <p className="text-xs text-white/50 pt-2">Powered by VitaD Rechner</p>
      </div>
    </footer>
  );
}
