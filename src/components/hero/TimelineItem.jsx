export default function TimelineItem({ date, dotClass, name, sub, badgeText, badgeClass }) {
  return (
    <div className="hero__mockup-timeline-item">
      <span className="hero__mockup-timeline-date">{date}</span>
      <span className={`hero__mockup-timeline-dot ${dotClass}`} />
      <div className="hero__mockup-timeline-item-list">
        <div className="hero__mockup-timeline-name">{name}</div>
        <div className="hero__mockup-timeline-sub">{sub}</div>
        <span className={`hero__mockup-badge ${badgeClass}`}>{badgeText}</span>
      </div>
    </div>
  );
}
