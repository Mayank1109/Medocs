import { useState, useRef } from "react";
import { IconChevronDown } from "../../icons/HeroIcons";

/**
 * Mock 6-month datasets. Swap these for real vitals history once that
 * data exists — shape is { month: string, value: number }[].
 * Blood pressure's Feb spike + June value intentionally match the
 * "Feb 2026 — was elevated" timeline entry and the current 118 stat
 * card, so the story is consistent across the dashboard.
 */
const METRICS = {
  "Blood Pressure": {
    unit: "mmHg",
    data: [
      { month: "Jan '26", value: 88 },
      { month: "Feb '26", value: 130 },
      { month: "Mar '26", value: 122 },
      { month: "Apr '26", value: 112 },
      { month: "May '26", value: 120 },
      { month: "Jun '26", value: 118 },
    ],
    subtitle:
      "Your blood pressure spiked in February and has steadily improved since.",
    insight: "Great! Your blood pressure is back in the normal range.",
  },
  "Blood Sugar": {
    unit: "mg/dL",
    data: [
      { month: "Jan '26", value: 105 },
      { month: "Feb '26", value: 112 },
      { month: "Mar '26", value: 108 },
      { month: "Apr '26", value: 103 },
      { month: "May '26", value: 100 },
      { month: "Jun '26", value: 98 },
    ],
    subtitle: "Your blood sugar has been trending steadily downward.",
    insight: "Nice — your blood sugar is within the healthy range.",
  },
  Weight: {
    unit: "kg",
    data: [
      { month: "Jan '26", value: 74 },
      { month: "Feb '26", value: 73.5 },
      { month: "Mar '26", value: 73 },
      { month: "Apr '26", value: 72.5 },
      { month: "May '26", value: 72 },
      { month: "Jun '26", value: 72 },
    ],
    subtitle: "Your weight has remained stable over the past 6 months.",
    insight: "You've held a steady weight for 3 months running.",
  },
};

const CHART_W = 600;
const CHART_H = 220;
const PAD_L = 34;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 28;

function niceTicks(min, max, count = 5) {
  const range = max - min || 1;
  const step = Math.ceil(range / (count - 1) / 5) * 5 || 1;
  const start = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step; v += step) ticks.push(v);
  return ticks;
}

function buildSmoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function HealthTrendChart() {
  const [metric, setMetric] = useState("Blood Pressure");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const svgRef = useRef(null);

  const { data, unit, subtitle, insight } = METRICS[metric];
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const ticks = niceTicks(min - 5, max + 5);
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];

  const points = data.map((d, i) => ({
    x: PAD_L + (i / (data.length - 1)) * (CHART_W - PAD_L - PAD_R),
    y:
      PAD_T +
      (1 - (d.value - yMin) / (yMax - yMin)) * (CHART_H - PAD_T - PAD_B),
    ...d,
  }));

  const linePath = buildSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_H - PAD_B} L ${points[0].x} ${CHART_H - PAD_B} Z`;

  // Default to the last point (matches the reference's pinned "latest reading" tooltip)
  const shownIndex = activeIndex ?? points.length - 1;
  const shownPoint = points[shownIndex];

  function handleMove(e) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * CHART_W;
    let nearest = 0;
    let bestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < bestDist) {
        bestDist = dist;
        nearest = i;
      }
    });
    setActiveIndex(nearest);
  }

  return (
    <div className="card trend-card">
      <div className="panel-header">
        <h3>Health trend</h3>

        <div className="metric-select">
          <button
            type="button"
            className="metric-select__button"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {metric}
            <IconChevronDown />
          </button>
          {menuOpen && (
            <div className="metric-select__menu">
              {Object.keys(METRICS).map((m) => (
                <button
                  type="button"
                  key={m}
                  className={`metric-select__option${m === metric ? " active" : ""}`}
                  onClick={() => {
                    setMetric(m);
                    setMenuOpen(false);
                    setActiveIndex(null);
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="trend-card__subtitle">{subtitle}</p>

      <div className="trend-chart">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="trend-chart__svg"
          onMouseMove={handleMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--highlight-color)"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="var(--highlight-color)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {ticks.map((t) => {
            const y =
              PAD_T +
              (1 - (t - yMin) / (yMax - yMin)) * (CHART_H - PAD_T - PAD_B);
            return (
              <g key={t}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={CHART_W - PAD_R}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={PAD_L - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="trend-chart__tick"
                >
                  {t}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#trend-fill)" stroke="none" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--highlight-color)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {points.map((p, i) => (
            <circle
              key={p.month}
              cx={p.x}
              cy={p.y}
              r={i === shownIndex ? 5 : 3}
              fill={
                i === shownIndex ? "var(--highlight-color)" : "var(--surface)"
              }
              stroke="var(--highlight-color)"
              strokeWidth="2"
            />
          ))}

          {points.map((p) => (
            <text
              key={p.month}
              x={p.x}
              y={CHART_H - 6}
              textAnchor="middle"
              className="trend-chart__tick"
            >
              {p.month}
            </text>
          ))}

          {shownIndex != null && (
            <line
              x1={shownPoint.x}
              y1={shownPoint.y}
              x2={shownPoint.x}
              y2={CHART_H - PAD_B}
              stroke="var(--highlight-mid)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}
        </svg>

        {shownPoint && (
          <div
            className="trend-chart__tooltip"
            style={{
              left: `${(shownPoint.x / CHART_W) * 100}%`,
              top: `${(shownPoint.y / CHART_H) * 100}%`,
            }}
          >
            <div className="trend-chart__tooltip-date">
              {shownPoint.month === "Jun '26"
                ? "Jun 7, 2026"
                : shownPoint.month}
            </div>
            <div className="trend-chart__tooltip-value">
              {shownPoint.value} {unit}
            </div>
          </div>
        )}
      </div>

      <div className="trend-card__insight">
        <span className="trend-card__insight-dot" />
        {insight}
      </div>
    </div>
  );
}
