"use client";

import { useEffect, useState } from "react";
import packagesData from "@/data/packages.json";
import { waLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";

export default function RegistrationForm() {
  const { t } = useSettings();
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [paket, setPaket] = useState("");
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) {
        setPaket(detail);
        setLastUrl(null);
      }
    };
    window.addEventListener("fissa:select-package", handler);
    return () => window.removeEventListener("fissa:select-package", handler);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      t.register.message.intro,
      "",
      `${t.register.message.name}: ${nama}`,
      `${t.register.message.phone}: ${hp || "-"}`,
      `${t.register.message.address}: ${alamat}`,
      `${t.register.message.package}: ${paket}`,
      "",
      t.register.message.closing,
    ].join("\n");

    const url = waLink(message);
    setLastUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="daftar" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.register.kicker}
          title={t.register.title}
          accent={t.register.accent}
          desc={t.register.desc}
        />

        <div className="register-wrap">
          <div className="neon-card register-copy" data-reveal>
            <h3 className="contact-title">{t.register.copyTitle}</h3>
            <p className="contact-copy">{t.register.copyDesc}</p>

            <div className="steps">
              {t.register.steps.map((step, index) => (
                <div className="step" key={step.title}>
                  <span className="step-num">{index + 1}</span>
                  <span className="step-text">
                    <strong>{step.title}</strong>
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>

            <p className="form-note" style={{ marginTop: "1.4rem" }}>
              {t.register.note}
            </p>
          </div>

          <form className="neon-card register-form" onSubmit={handleSubmit} data-reveal>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="nama">{t.register.name}</label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder={t.register.namePlaceholder}
                  value={nama}
                  onChange={(event) => {
                    setNama(event.target.value);
                    setLastUrl(null);
                  }}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="hp">{t.register.phone}</label>
                <input
                  id="hp"
                  name="hp"
                  type="tel"
                  inputMode="tel"
                  placeholder={t.register.phonePlaceholder}
                  value={hp}
                  onChange={(event) => {
                    setHp(event.target.value);
                    setLastUrl(null);
                  }}
                  required
                />
              </div>

              <div className="field full">
                <label htmlFor="alamat">{t.register.address}</label>
                <textarea
                  id="alamat"
                  name="alamat"
                  placeholder={t.register.addressPlaceholder}
                  value={alamat}
                  onChange={(event) => {
                    setAlamat(event.target.value);
                    setLastUrl(null);
                  }}
                  required
                />
              </div>

              <div className="field full">
                <label htmlFor="paket-pilihan">{t.register.package}</label>
                <select
                  id="paket-pilihan"
                  name="paket"
                  value={paket}
                  onChange={(event) => {
                    setPaket(event.target.value);
                    setLastUrl(null);
                  }}
                  required
                >
                  <option value="" disabled>
                    {t.register.packagePlaceholder}
                  </option>
                  {packagesData.packages.map((pkg) => (
                    <option value={pkg.name} key={pkg.id}>
                      {pkg.name} - {pkg.speed} (Rp{pkg.price}
                      {t.packages.perMonth})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-neon">
                  <WhatsAppIcon width={17} height={17} />
                  {t.register.submit}
                  <ArrowRightIcon width={15} height={15} />
                </button>
                <p className="form-note">{t.register.promoNote}</p>
              </div>

              {lastUrl ? (
                <p className="form-success">
                  {t.register.successBefore}
                  <a
                    href={lastUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    {t.register.successLink}
                  </a>
                  {t.register.successAfter}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
