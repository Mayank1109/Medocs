export default function HeroStat({ label, value, delta }) {
  return (
    <div className="hero__stat">
      <div className="hero__stat-label">{label}</div>
      <div className="hero__stat-value">{value}</div>
      <div className="hero__stat-delta">{delta}</div>
    </div>
  );
}
