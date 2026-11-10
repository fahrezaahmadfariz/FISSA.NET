"use client";

import { SITE, WA_DEFAULT_MESSAGE, WA_DEFAULT_MESSAGE_EN, waLink } from "@/lib/site";
import { useSettings } from "./SettingsProvider";
import { WifiIcon } from "./icons";

export default function Footer() {
  const { lang, t } = useSettings();

  return (
    <footer className="footer">
      <div className="container-fissa">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">
                <WifiIcon width={18} height={18} />
              </span>
              FISSA.NET
            </div>
            <p className="footer-copy">{t.footer.copy}</p>
            <a
              className="btn btn-ghost"
              style={{ marginTop: "1.2rem" }}
              href={waLink(null, lang === "en" ? WA_DEFAULT_MESSAGE_EN : WA_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.phoneDisplay}
            </a>
          </div>

          <div>
            <h4 className="footer-title">{t.footer.navTitle}</h4>
            {t.footer.nav.map((link) => (
              <a className="footer-link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <h4 className="footer-title">{t.footer.servicesTitle}</h4>
            {t.footer.services.map((service) => (
              <span className="footer-link" key={service}>
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer.rights}</span>
          <span>{t.footer.hours}</span>
        </div>
      </div>
    </footer>
  );
}
