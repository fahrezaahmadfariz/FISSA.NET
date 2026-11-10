"use client";

import { useState } from "react";
import { ADMINS, WA_DEFAULT_MESSAGE, WA_DEFAULT_MESSAGE_EN, waLink } from "@/lib/site";
import { useSettings } from "./SettingsProvider";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const { lang, t } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const message = lang === "en" ? WA_DEFAULT_MESSAGE_EN : WA_DEFAULT_MESSAGE;

  return (
    <div className="wa-float-wrap">
      <button
        type="button"
        className="wa-float"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.waFloat.aria}
        aria-expanded={isOpen}
      >
        <WhatsAppIcon width={20} height={20} />
        <span>{t.common.whatsapp}</span>
      </button>

      {isOpen ? (
        <div className="wa-float-menu" role="menu">
          {ADMINS.map((admin) => (
            <a
              key={admin.id}
              className="wa-float-option"
              href={waLink(admin.waNumber, message)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label={admin.id === 1 ? t.waFloat.ariaAdmin1 : t.waFloat.ariaAdmin2}
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppIcon width={18} height={18} />
              <span>{admin.id === 1 ? t.waFloat.admin1 : t.waFloat.admin2}</span>
              <small>{admin.phoneDisplay}</small>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
