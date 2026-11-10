"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import { ArrowRightIcon, CheckIcon, SparkIcon } from "./icons";

type Remaining = {
  d: number;
  h: number;
  m: number;
  s: number;
};

function getRemaining(): Remaining {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

export default function Promo() {
  const { t } = useSettings();
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setLeft(getRemaining());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: t.promo.units[0], value: left?.d },
    { label: t.promo.units[1], value: left?.h },
    { label: t.promo.units[2], value: left?.m },
    { label: t.promo.units[3], value: left?.s },
  ];

  return (
    <section id="promo" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.promo.kicker}
          title={t.promo.title}
          accent={t.promo.accent}
          desc={t.promo.desc}
        />

        <div className="promo-panel" data-reveal>
          <div className="promo-grid">
            <div>
              <span className="promo-tag">
                <SparkIcon width={12} height={12} />
                {t.promo.tag}
              </span>
              <h3 className="promo-title">
                {t.promo.titleLine1}
                <br />
                <span className="accent">{t.promo.titleLine2}</span>
              </h3>
              <p className="promo-desc">{t.promo.descLong}</p>
              <ul className="promo-list">
                {t.promo.offers.map((offer) => (
                  <li className="promo-item" key={offer}>
                    <CheckIcon width={17} height={17} />
                    {offer}
                  </li>
                ))}
              </ul>
              <a className="btn btn-neon" href="#daftar" style={{ marginTop: "1.4rem" }}>
                {t.promo.cta}
                <ArrowRightIcon width={16} height={16} />
              </a>
            </div>

            <div className="neon-card countdown-card">
              <span className="countdown-label">{t.promo.remaining}</span>
              <div className="count-row" aria-live="polite">
                {units.map((unit) => (
                  <div className="count-box" key={unit.label}>
                    <span className="count-num">
                      {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="count-label">{unit.label}</span>
                  </div>
                ))}
              </div>
              <p className="countdown-note">{t.promo.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
