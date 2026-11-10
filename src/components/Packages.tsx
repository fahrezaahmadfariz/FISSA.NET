"use client";

import type { CSSProperties } from "react";
import packagesData from "@/data/packages.json";
import PixelCard from "./PixelCard";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import { CheckIcon } from "./icons";

export default function Packages() {
  const { lang, theme, t } = useSettings();
  const packages = packagesData.packages;

  const selectPackage = (name: string) => {
    window.dispatchEvent(new CustomEvent<string>("fissa:select-package", { detail: name }));
  };

  const palette = ["#67e8f9", "#22b8ff", "#2563eb"];
  const popularPalette = ["#a5f3fc", "#38bdf8", "#0284c7"];
  
  return (
    <section id="paket" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.packages.kicker}
          title={t.packages.title}
          accent={t.packages.accent}
          desc={t.packages.desc}
        />
  
        <div className="pkg-grid">
          {packages.map((pkg, index) => {
            const tagline = lang === "en" ? pkg.taglineEn : pkg.tagline;
            const features = lang === "en" ? pkg.featuresEn : pkg.features;
  
            return (
              <div
                className={`pkg-shell${pkg.popular ? " is-popular" : ""}`}
                key={pkg.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                {pkg.popular ? <span className="pkg-popular-badge">{t.packages.popular}</span> : null}
                <PixelCard
                  className="pkg-pixel"
                  theme="dark"
                  colors={pkg.popular ? popularPalette : palette}
                  glowColor={theme === "dark" ? "#38bdf8" : "#93c5fd"}
                  gap={8}
                  pixelSize={2}
                  speed={25}
                  shape="square"
                  origin="center"
                  revealDuration={700}
                  spotlight={0.45}
                  glow={0.5}
                  opacity={0.5}
                  fade={0.55}
                  trigger="hover"
                  radius={22}
                  clickPulse
                  intro
                  introDelay={index * 90}
                >
                  <div className="pkg-body">
                    <span className="pkg-name">{pkg.name}</span>
                    <span className="pkg-speed">{pkg.speed}</span>
                    <span className="pkg-tagline">{tagline}</span>
  
                    <div className="pkg-price-row">
                      <span className="pkg-price">Rp {pkg.price}</span>
                      <small>{t.packages.perMonth}</small>
                    </div>
  
                    <ul className="pkg-features">
                      {features.map((feature) => (
                        <li key={feature}>
                          <CheckIcon width={15} height={15} />
                          {feature}
                        </li>
                      ))}
                    </ul>
  
                    <a
                      className={`btn ${pkg.popular ? "btn-neon" : "btn-ghost"} btn-block`}
                      href="#daftar"
                      onClick={() => selectPackage(pkg.name)}
                    >
                      {t.packages.cta}
                    </a>
                  </div>
                </PixelCard>
              </div>
            );
          })}
        </div>
  
        <p className="pkg-note" data-reveal>
          {t.packages.note}
        </p>
      </div>
    </section>
   );
}
