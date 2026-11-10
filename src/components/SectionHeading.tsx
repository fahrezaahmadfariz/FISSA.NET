type SectionHeadingProps = {
  kicker: string;
  title: string;
  accent?: string;
  desc?: string;
  center?: boolean;
  split?: boolean;
};

export default function SectionHeading({ kicker, title, accent, desc, center, split }: SectionHeadingProps) {
  return (
    <div className={`section-head${center ? " center" : ""}${split ? " split" : ""}`} data-reveal>
      <span className="section-kicker">{kicker}</span>
      <h2 className="section-title">
        {title} {accent ? <span className="accent">{accent}</span> : null}
      </h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}
