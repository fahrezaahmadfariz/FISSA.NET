export const SITE = {
  name: "FISSAN.NET",
  tagline: "Fiber Optic Internet",
  phoneDisplay: "0851 7222 2264",
  phoneRaw: "085172222264",
  waNumber: "6285172222264",
  hours: "Senin - Minggu, 08.00 - 21.00 WIB",
  area: "Melayani pemasangan di area kota & sekitarnya",
} as const;

export const ADMINS = [
  {
    id: 1,
    name: "Admin 1",
    phoneDisplay: "0882 9343 8539",
    phoneRaw: "088293438539",
    waNumber: "6288293438539",
  },
  {
    id: 2,
    name: "Admin 2",
    phoneDisplay: "0877 3398 0672",
    phoneRaw: "087733980672",
    waNumber: "6287733980672",
  },
] as const;

export const waLink = (adminNumber: string | null, message?: string) => {
  const raw = adminNumber ?? SITE.waNumber;
  return `https://wa.me/${raw}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
};

export const WA_DEFAULT_MESSAGE =
  "Halo FISSAN.NET! Saya tertarik dengan layanan internet FISSAN.NET dan ingin bertanya.";

export const WA_DEFAULT_MESSAGE_EN =
  "Hello FISSAN.NET! I'm interested in FISSAN.NET internet service and would like to ask a few questions.";
