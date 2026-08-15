import { useState, useRef } from "react";

const DATES = ["May 30", "Jun 2", "Jun 5", "Jun 8", "Jun 11", "Jun 14", "Jun 18", "Jun 21", "Jun 24", "Jun 28"];

const SERIES = [
  { key: "bp", label: "Blood Pressure (mmHg)", color: "#1d9e75", data: [132, 128, 125, 122, 124, 119, 121, 118, 120, 118] },
  { key: "sugar", label: "Blood Sugar (mg/dL)", color: "#ef9f27", data: [102, 100, 103, 99, 101, 98, 100, 97, 99, 98] },
  { key: "weight", label: "Weight (kg)", color: "#378add", data: [73, 73, 72, 72, 73, 72, 72, 72, 72, 72] },
  { key: "heart", label: "Heart Rate (bpm)", color: "#a78bfa", data: [74, 71, 70, 69, 72, 68, 70, 67, 69, 68] },
];

const W = 900;
const H = 300;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 26;
const Y_MAX = 160;
const Y_TICKS = [0, 40, 80, 120, 160];

export default function VitalsTrendChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const svgRef = useRef(null);

  const xFor = (i) => PAD_L + (i / (DATES.length - 1)) * (W - PAD_L - PAD_R);
  const yFor = (v) => PAD_T + (1 - v / Y_MAX) * (H - PAD_T - PAD_B);

  function buildPath(data) {
    const pts = data.map((v, i) => ({ x: xFor(i), y: yFor(v) }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }

  function handleMove(e) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    DATES.forEach((_, i) => {
      const d = Math.abs(xFor(i) - relX);
      if (d < best) { best = d; nearest = i; }
    });
    setActiveIndex(nearest);
  }

  return (
    <div className="vitals-trend-chart">
      <div className="vitals-trend-chart__legend">
        {SERIES.map((s) => (
          <span className="vitals-trend-chart__legend-item" key={s.key}>
            <span className="vitals-trend-chart__legend-dot" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="vitals-trend-chart__canvas">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="vitals-trend-chart__svg"
          onMouseMove={handleMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {Y_TICKS.map((t) => (
            <g key={t}>
              <line x1={PAD_L} y1={yFor(t)} x2={W - PAD_R} y2={yFor(t)} stroke="var(--border)" strokeDasharray="3 4" />
              <text x={PAD_L - 8} y={yFor(t) + 3} textAnchor="end" className="vitals-trend-chart__tick">{t}</text>
            </g>
          ))}

          {activeIndex != null && (
            <line
              x1={xFor(activeIndex)}
              y1={PAD_T}
              x2={xFor(activeIndex)}
              y2={H - PAD_B}
              stroke="var(--border-strong)"
              strokeDasharray="3 3"
            />
          )}

          {SERIES.map((s) => (
            <g key={s.key}>
              <path d={buildPath(s.data)} fill="none" stroke={s.color} strokeWidth="2.25" strokeLinecap="round" />
              {activeIndex != null && (
                <circle cx={xFor(activeIndex)} cy={yFor(s.data[activeIndex])} r="4" fill={s.color} stroke="var(--surface)" strokeWidth="2" />
              )}
            </g>
          ))}

          {[0, Math.round((DATES.length - 1) / 3), Math.round(((DATES.length - 1) * 2) / 3), DATES.length - 1].map((i) => (
            <text key={i} x={xFor(i)} y={H - 6} textAnchor="middle" className="vitals-trend-chart__tick">
              {DATES[i]}
            </text>
          ))}
        </svg>

        {activeIndex != null && (
          <div
            className="vitals-trend-chart__tooltip"
            style={{ left: `${(xFor(activeIndex) / W) * 100}%` }}
          >
            <div className="vitals-trend-chart__tooltip-date">{DATES[activeIndex]}</div>
            {SERIES.map((s) => (
              <div className="vitals-trend-chart__tooltip-row" key={s.key}>
                <span style={{ backgroundColor: s.color }} />
                {s.data[activeIndex]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
