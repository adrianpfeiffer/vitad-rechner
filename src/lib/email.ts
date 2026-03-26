import emailjs from "@emailjs/browser";
import { PHARMACY, EMAILJS } from "./constants";

export function sendPrintNotification(): void {
  const now = new Date();
  const timestamp = now.toLocaleString("de-AT", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  emailjs
    .send(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      {
        to_email: "adrian.pfeiffer.ruiz@gmail.com",
        subject: "VitaD Rechner — Bericht gedruckt",
        message: `Bericht gedruckt am ${timestamp}\nApotheke: ${PHARMACY.name}`,
      },
      EMAILJS.publicKey
    )
    .catch(() => {
      // Silent failure — fire-and-forget
    });
}
