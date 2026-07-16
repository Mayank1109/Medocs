export default function MockupStat({ label, value, delta, deltaClass }) {
  return (
    <div className="hero__mockup-stat">
      <span className="hero__mockup-stat-label">{label}</span>
      <span className="hero__mockup-stat-value">{value}</span>
      <span className={`hero__mockup-stat-delta ${deltaClass}`}>{delta}</span>
    </div>
  );
}
