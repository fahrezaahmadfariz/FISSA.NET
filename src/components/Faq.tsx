"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useSettings } from "./SettingsProvider";
import { PlusIcon } from "./icons";

export default function Faq() {
  const { t } = useSettings();
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggle = (index: number) =>
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  return (
    <section id="bantuan" className="section">
      <div className="container-fissa">
        <SectionHeading
          kicker={t.faq.kicker}
          title={t.faq.title}
          accent={t.faq.accent}
          desc={t.faq.desc}
          center
        />

        <div className="faq-wrap">
          {t.faq.items.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div className="faq-item-wrap" key={index} data-reveal>
                <div className={`faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq-q">{faq.q}</span>
                    <span className="faq-plus">
                      <PlusIcon width={16} height={16} />
                    </span>
                  </button>
                  <div className="faq-a" id={`faq-panel-${index}`} role="region">
                    <div className="faq-a-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
