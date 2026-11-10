"use client";

import { WA_DEFAULT_MESSAGE, WA_DEFAULT_MESSAGE_EN, waLink } from "@/lib/site";
import { useSettings } from "./SettingsProvider";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const { lang, t } = useSettings();

  return (
    <a
      className="wa-float"
      href={waLink(lang === "en" ? WA_DEFAULT_MESSAGE_EN : WA_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.waFloat.aria}
    >
      <WhatsAppIcon width={20} height={20} />
      <span>{t.common.whatsapp}</span>
    </a>
  );
}
