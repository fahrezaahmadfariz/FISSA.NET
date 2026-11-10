"use client";

import type { CSSProperties, ComponentType, SVGProps } from "react";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import {
  ArrowRightIcon,
  FiberIcon,
  InfinityIcon,
  RouterIcon,
  StarIcon,
  TvIcon,
  WrenchIcon,
} from "./icons";

const featureIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  FiberIcon,
  RouterIcon,
  TvIcon,
  StarIcon,
  InfinityIcon,
  WrenchIcon,
];

export default function Installation() {
  const { t } = useSettings();
  const features = t.installation.features;

  return (
    <section id="instalasi" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.installation.kicker}
          title={t.installation.title}
          accent={t.installation.accent}
          desc={t.installation.desc}
        />

        <div className="install-grid">
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <article
                className="neon-card install-card"
                key={index}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
              >
                <span className="install-icon">
                  <Icon width={24} height={24} />
                </span>
                <h3 className="install-title">{feature.title}</h3>
                <p className="install-desc">{feature.desc}</p>
              </article>
            );
          })}
        </div>

        <div className="neon-card install-banner" data-reveal>
          <div className="install-price">
            {t.installation.bannerPrice}
            <small>{t.installation.bannerNote}</small>
          </div>
          <a className="btn btn-neon" href="#daftar">
            {t.installation.cta}
            <ArrowRightIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
