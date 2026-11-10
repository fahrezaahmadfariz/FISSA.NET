export const SITE = {
  name: "FISSA.NET",
  tagline: "Fiber Optic Internet",
  phoneDisplay: "0851 7222 2264",
  phoneRaw: "085172222264",
  waNumber: "6285172222264",
  hours: "Senin - Minggu, 08.00 - 21.00 WIB",
  area: "Melayani pemasangan di area kota & sekitarnya",
} as const;

export const waLink = (message?: string) =>
  `https://wa.me/${SITE.waNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const WA_DEFAULT_MESSAGE =
  "Halo FISSA.NET! Saya tertarik dengan layanan internet FISSA.NET dan ingin bertanya.";

export const WA_DEFAULT_MESSAGE_EN =
  "Hello FISSA.NET! I'm interested in FISSA.NET internet service and would like to ask a few questions.";
