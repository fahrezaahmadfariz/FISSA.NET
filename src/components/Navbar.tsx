"use client";

import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon, WifiIcon } from "./icons";

const SECTION_IDS = ["home", "tentang", "promo", "paket", "instalasi", "bantuan", "kontak"] as const;

export default function Navbar() {
  const { theme, lang, t, toggleTheme, toggleLang } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "tentang", label: t.nav.about },
    { id: "promo", label: t.nav.promo },
    { id: "paket", label: t.nav.packages },
    { id: "instalasi", label: t.nav.installation },
    { id: "bantuan", label: t.nav.help },
    { id: "kontak", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav-shell">
      <nav className={`nav-pill${scrolled ? " is-scrolled" : ""}`} aria-label={t.nav.ariaMain}>
        <a className="nav-brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <WifiIcon width={18} height={18} />
          </span>
          FISSAN.NET
        </a>

        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-tools">
          <button
            type="button"
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark}
            title={theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark}
          >
            {theme === "dark" ? <SunIcon width={17} height={17} /> : <MoonIcon width={17} height={17} />}
          </button>
          <button
            type="button"
            className="nav-lang"
            onClick={toggleLang}
            aria-label={t.nav.langLabel}
            title={t.nav.langLabel}
          >
            <span className={lang === "id" ? "is-on" : ""}>ID</span>
            <span className="nav-lang-sep">/</span>
            <span className={lang === "en" ? "is-on" : ""}>EN</span>
          </button>
        </div>

        <a className="btn btn-neon nav-cta" href="#daftar">
          {t.nav.cta}
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
        </button>

        <div className={`nav-mobile${open ? " is-open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn btn-neon" href="#daftar" onClick={() => setOpen(false)}>
            {t.nav.ctaMobile}
          </a>
        </div>
      </nav>
    </header>
  );
}
