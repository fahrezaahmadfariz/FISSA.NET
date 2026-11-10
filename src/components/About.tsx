"use client";

import type { CSSProperties } from "react";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";

export default function About() {
  const { lang, t } = useSettings();
  const locale = lang === "en" ? "en-US" : "id-ID";

  return (
    <section id="tentang" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.about.kicker}
          title={t.about.title}
          accent={t.about.accent}
          desc={t.about.desc}
        />

        <div className="about-wrap">
          <div className="neon-card about-card" data-reveal>
            <p className="about-lead">
              <span className="hl">FISSA.NET</span> {t.about.lead}
            </p>
            <div className="about-points">
              {t.about.points.map((point) => (
                <div className="about-point" key={point}>
                  <span className="dot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-grid">
            <div className="neon-card stat-card" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
              <span className="stat-num">
                <CountUp end={500} suffix="+" locale={locale} />
              </span>
              <span className="stat-label">{t.about.stats.customers}</span>
            </div>
            <div className="neon-card stat-card" data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties}>
              <span className="stat-num">
                <CountUp end={99.8} decimals={1} suffix="%" locale={locale} />
              </span>
              <span className="stat-label">{t.about.stats.uptime}</span>
            </div>
            <div className="neon-card stat-card" data-reveal style={{ "--reveal-delay": "240ms" } as CSSProperties}>
              <span className="stat-num">
                <CountUp end={24} suffix="/7" locale={locale} />
              </span>
              <span className="stat-label">{t.about.stats.support}</span>
            </div>
            <div className="neon-card stat-card" data-reveal style={{ "--reveal-delay": "320ms" } as CSSProperties}>
              <span className="stat-num">
                <CountUp end={110} suffix={t.about.stats.startSuffix} locale={locale} />
              </span>
              <span className="stat-label">{t.about.stats.start}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
