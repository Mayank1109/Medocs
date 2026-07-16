/**
 * Circular progress ring. score/max determines fill percentage.
 * Pure SVG, no dependencies — starts at 12 o'clock and fills clockwise.
 */
export default function HealthScoreRing({ score = 84, max = 100, size = 148, stroke = 12 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, score / max));
  const offset = circumference * (1 - pct);

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--highlight-mid)"
          strokeOpacity="0.25"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--highlight-color)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="score-ring__label">
        <span className="score-ring__value">{score}</span>
        <span className="score-ring__max">/{max}</span>
      </div>
    </div>
  );
}
