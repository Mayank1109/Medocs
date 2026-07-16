const W = 600;
const H = 140;
const PAD_L = 34;
const PAD_R = 12;
const PAD_T = 10;
const PAD_B = 22;

/**
 * SERIES: [{ name, color, values: [startValue, endValue] }]
 * Only ever plots 2 points (start/end of the comparison window) —
 * this isn't a general-purpose time series chart, just enough to
 * visualize "before vs after" across a few markers at once.
 */
export default function TrendMiniChart({ series, xLabels, yMax = 250, yStep = 50 }) {
  const ticks = [];
  for (let v = 0; v <= yMax; v += yStep) ticks.push(v);

  const xFor = (i) => PAD_L + i * (W - PAD_L - PAD_R);
  const yFor = (v) => PAD_T + (1 - v / yMax) * (H - PAD_T - PAD_B);

  return (
    <div className="mini-chart">
      <div className="mini-chart__legend">
        {series.map((s) => (
          <span className="mini-chart__legend-item" key={s.name}>
            <span className="mini-chart__legend-dot" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mini-chart__svg">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD_L} y1={yFor(t)} x2={W - PAD_R} y2={yFor(t)} stroke="var(--border)" strokeWidth="1" />
            <text x={PAD_L - 8} y={yFor(t) + 3} textAnchor="end" className="mini-chart__tick">{t}</text>
          </g>
        ))}

        {series.map((s) => (
          <g key={s.name}>
            <line
              x1={xFor(0)} y1={yFor(s.values[0])}
              x2={xFor(1)} y2={yFor(s.values[1])}
              stroke={s.color} strokeWidth="2.25" strokeLinecap="round"
            />
            <circle cx={xFor(0)} cy={yFor(s.values[0])} r="3.5" fill={s.color} />
            <circle cx={xFor(1)} cy={yFor(s.values[1])} r="3.5" fill={s.color} />
          </g>
        ))}

        <text x={xFor(0)} y={H - 4} textAnchor="start" className="mini-chart__tick">{xLabels[0]}</text>
        <text x={xFor(1)} y={H - 4} textAnchor="end" className="mini-chart__tick">{xLabels[1]}</text>
      </svg>
    </div>
  );
}
