const W = 260;
const H = 90;
const PAD = 4;

/**
 * Minimal sparkline: a smoothed line + dots, y-axis min/max labels,
 * x-axis start/end labels. No interactivity — this is meant for small
 * glanceable stat cards, not analysis (see VitalsTrendChart for that).
 */
export default function Sparkline({ data, color = "var(--highlight-color)", yMin, yMax, xStart, xEnd }) {
  const min = yMin ?? Math.min(...data);
  const max = yMax ?? Math.max(...data);
  const points = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + (1 - (v - min) / (max - min || 1)) * (H - PAD * 2 - 14),
  }));

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    path += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  return (
    <div className="sparkline">
      <svg viewBox={`0 0 ${W} ${H}`} className="sparkline__svg">
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
        ))}
      </svg>
      <div className="sparkline__axis-y">
        <span>{max}</span>
        <span>{min}</span>
      </div>
      <div className="sparkline__axis-x">
        <span>{xStart}</span>
        <span>{xEnd}</span>
      </div>
    </div>
  );
}
