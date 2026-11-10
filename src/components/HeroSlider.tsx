"use client";

import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import { ArrowRightIcon, WifiIcon } from "./icons";
import { waLink } from "@/lib/site";

const AUTOPLAY_MS = 6500;

export default function HeroSlider() {
  const { t } = useSettings();
  const slides = t.hero.slides;
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, slides.length]);

  const goTo = (next: number) => {
    const total = slides.length;
    setIndex(((next % total) + total) % total);
  };

  const activeSlide = slides[index];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      t.hero.formMessageIntro,
      "",
      `${t.register.message.name}: ${name || "-"}`,
      `${t.register.message.phone}: ${phone || "-"}`,
      "",
      t.register.message.closing,
    ].join("\n");
    const url = waLink(null, message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="home" className="hero" aria-label={t.hero.aria}>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob blob-a" />
        <span className="hero-blob blob-b" />
        <span className="hero-dots-deco" />
      </div>

      <div className="container-fissa">
        <div className="hero-card">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="pulse-dot" />
              {t.hero.badge}
            </span>
            <h1 className="hero-title">
              <span className="line">{t.hero.titleTop}</span>
              <span className="line accent">{t.hero.titleBottom}</span>
            </h1>
            <p className="hero-desc">{t.hero.desc}</p>

            <form className="hero-form" onSubmit={handleSubmit}>
              <label className="hero-field">
                <span>{t.hero.formName}</span>
                <input
                  type="text"
                  placeholder={t.hero.formNamePlaceholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label className="hero-field">
                <span>{t.hero.formPhone}</span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder={t.hero.formPhonePlaceholder}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-neon hero-form-btn">
                {t.hero.formSubmit}
                <ArrowRightIcon width={15} height={15} />
              </button>
            </form>
            <p className="hero-form-note">{t.hero.formNote}</p>

            <div className="hero-chips">
              {t.hero.chips.map((chip) => (
                <span className="hero-chip" key={chip}>
                  <span className="pulse-dot" />
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-art">
              <div className="blob-shell">
                <span className="blob-outline" aria-hidden="true" />
                <div className="blob-main">
                  <span className="blob-glyph" aria-hidden="true">
                    <WifiIcon width={120} height={120} />
                  </span>
                  <div className="hero-panel" key={index}>
                    <div className="hero-panel-top">
                      <span className="panel-label">{activeSlide.badge}</span>
                      <span className="panel-live">
                        <i />
                        {t.hero.online}
                      </span>
                    </div>
                    <div className="panel-speed">
                      <span className="panel-value">{activeSlide.panelValue}</span>
                      <span className="panel-unit">{activeSlide.panelUnit}</span>
                    </div>
                    <div className="speed-bars">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="panel-grid">
                      {activeSlide.stats.map(([value, label]) => (
                        <div className="panel-stat" key={label}>
                          <strong>{value}</strong>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <span className="float-card float-a">
                <WifiIcon width={16} height={16} />
                {t.hero.floatUnlimited}
              </span>
              <span className="float-card float-b">
                <span className="pulse-dot" />
                {t.hero.floatSupport}
              </span>
              <div className="hero-art-dots">
                <div className="hero-dots" role="tablist" aria-label={t.hero.dotsLabel}>
                  {slides.map((slide, i) => (
                    <button
                      key={slide.badge}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`${t.hero.dotsLabel} ${i + 1}: ${slide.badge}`}
                      className={`hero-dot${i === index ? " is-active" : ""}`}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-controls">
          <span className="hero-count">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="hero-right-controls">
            <div className="hero-arrows">
              <button
                type="button"
                className="hero-arrow"
                aria-label={t.hero.prev}
                onClick={() => goTo(index - 1)}
              >
                <ArrowRightIcon width={18} height={18} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button
                type="button"
                className="hero-arrow"
                aria-label={t.hero.next}
                onClick={() => goTo(index + 1)}
              >
                <ArrowRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-progress" aria-hidden="true">
          <span key={`${index}`} className={index === 0 ? "" : ""} />
        </div>
        <span className="sr-only">
          {t.hero.activeLead} {activeSlide.badge}. {t.hero.activeHint}
        </span>
      </div>
    </section>
  );
}