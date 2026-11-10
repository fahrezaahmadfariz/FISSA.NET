import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SettingsProvider } from "@/components/SettingsProvider";
import "./globals.css";
import "@/components/PixelCard.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FISSA.NET — Internet Fiber Optic Cepat, Unlimited, Harga Mulai 110rb",
  description:
    "FISSA.NET menyediakan internet fiber optic untuk rumah dan usaha kecil. Kuota unlimited tanpa FUP, gratis instalasi, support 24/7, harga mulai Rp110.000 per bulan.",
  keywords: [
    "FISSA.NET",
    "wifi fiber optic",
    "internet rumah",
    "internet unlimited",
    "pasang wifi",
  ],
  openGraph: {
    title: "FISSA.NET — Internet Fiber Optic Cepat & Unlimited",
    description:
      "Internet fiber optic untuk rumah dan usaha kecil. Unlimited tanpa FUP, support 24/7, mulai Rp110.000 per bulan.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f9fd" },
    { media: "(prefers-color-scheme: dark)", color: "#060d18" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('fissa-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;var l=localStorage.getItem('fissa-lang');if(l==='en'||l==='id'){document.documentElement.lang=l}}catch(e){}})();",
          }}
        />
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
