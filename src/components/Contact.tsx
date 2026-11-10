"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { ADMINS, WA_DEFAULT_MESSAGE, WA_DEFAULT_MESSAGE_EN, waLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";

export default function Contact() {
  const { lang, t } = useSettings();
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyPhone = async (phoneRaw: string) => {
    try {
      await navigator.clipboard.writeText(phoneRaw);
      setCopied(phoneRaw);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="kontak" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.contact.kicker}
          title={t.contact.title}
          accent={t.contact.accent}
          desc={t.contact.desc}
        />

        <div className="contact-grid">
          <div className="neon-card contact-main" data-reveal>
            <h3 className="contact-title">{t.contact.titleMain}</h3>
            <p className="contact-copy">{t.contact.copy}</p>
            <a
              className="btn btn-neon"
              href={waLink(ADMINS[0].waNumber, lang === "en" ? WA_DEFAULT_MESSAGE_EN : WA_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width={18} height={18} />
              {t.contact.chat}
            </a>
            <p className="form-note" style={{ marginTop: "1.2rem" }}>
              {t.contact.note}
            </p>
          </div>

          <div className="contact-info">
            {ADMINS.map((admin) => (
              <div
                className="neon-card info-row"
                data-reveal
                key={admin.id}
                style={{ "--reveal-delay": `${admin.id * 80}ms` } as CSSProperties}
              >
                <span className="info-icon">
                  <PhoneIcon width={20} height={20} />
                </span>
                <div>
                  <div className="info-label">{admin.name}</div>
                  <div className="info-value">{admin.phoneDisplay}</div>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyPhone(admin.phoneRaw)}
                  aria-live="polite"
                >
                  {copied === admin.phoneRaw ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
                </button>
              </div>
            ))}

            <div className="neon-card info-row" data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties}>
              <span className="info-icon">
                <ClockIcon width={20} height={20} />
              </span>
              <div>
                <div className="info-label">{t.contact.hoursLabel}</div>
                <div className="info-value">{t.contact.hours}</div>
              </div>
            </div>

            <div className="neon-card info-row" data-reveal style={{ "--reveal-delay": "240ms" } as CSSProperties}>
              <span className="info-icon">
                <MapPinIcon width={20} height={20} />
              </span>
              <div>
                <div className="info-label">{t.contact.areaLabel}</div>
                <div className="info-value">{t.contact.area}</div>
              </div>
            </div>

            <p className="form-note" style={{ paddingInline: "0.2rem" }}>
              {copied ? t.contact.copied : t.contact.copyHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
