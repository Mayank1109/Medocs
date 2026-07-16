import { IconTrendUp, IconSparkleSmall, IconLightbulb, IconCheckCircle } from "../../icons/AppIcons";
import TrendMiniChart from "./TrendMiniChart";

const ROWS = [
  { marker: "Total cholesterol", jan: "230 mg/dL", jun: "215 mg/dL", change: "↓ 15 mg/dL" },
  { marker: "LDL cholesterol", jan: "152 mg/dL", jun: "138 mg/dL", change: "↓ 14 mg/dL" },
  { marker: "HDL cholesterol", jan: "44 mg/dL", jun: "52 mg/dL", change: "↑ 8 mg/dL" },
  { marker: "Haemoglobin", jan: "13.1 g/dL", jun: "14.2 g/dL", change: "↑ 1.1 g/dL" },
  { marker: "Triglycerides", jan: "168 mg/dL", jun: "142 mg/dL", change: "↓ 26 mg/dL" },
];

const SERIES = [
  { name: "Total Cholesterol", color: "#c084fc", values: [230, 215] },
  { name: "LDL Cholesterol", color: "#60a5fa", values: [152, 138] },
  { name: "HDL Cholesterol", color: "#34d399", values: [44, 52] },
  { name: "Triglycerides", color: "#fb923c", values: [168, 142] },
];

const INSIGHTS = [
  "LDL cholesterol decreased by 9%.",
  "HDL cholesterol increased by 18%.",
  "Triglycerides decreased by 15%.",
  "Overall heart health indicators are moving in the right direction.",
];

export default function ComparisonReport() {
  return (
    <div className="ai-message">
      <p className="ai-message__intro">
        Here's a comparison between your <span className="hl-blue">January 2026</span> and{" "}
        <span className="hl-green">June 2026</span> blood tests:
      </p>

      <div className="report-block">
        <div className="report-block__header">
          <span className="report-block__icon"><IconTrendUp /></span>
          <div>
            <h4>Key Summary</h4>
            <p>Overall, your lipid profile has improved significantly over 5 months. LDL cholesterol and triglycerides decreased, while HDL increased.</p>
          </div>
          <span className="badge badge--amber report-block__ai-tag"><IconSparkleSmall /> AI analysis</span>
        </div>

        <div className="report-table">
          <div className="report-table__row report-table__row--head">
            <span>Marker</span>
            <span>Jan 2026</span>
            <span>Jun 2026</span>
            <span>Change</span>
            <span>Trend</span>
          </div>
          {ROWS.map((r) => (
            <div className="report-table__row" key={r.marker}>
              <span>{r.marker}</span>
              <span>{r.jan}</span>
              <span>{r.jun}</span>
              <span>{r.change}</span>
              <span className="report-table__trend">
                <IconCheckCircle /> Improved
              </span>
            </div>
          ))}
        </div>

        <div className="report-block__split">
          <div className="report-block__chart">
            <h5>Trend Overview <span>(Jan 2026 → Jun 2026)</span></h5>
            <TrendMiniChart series={SERIES} xLabels={["Jan 2026", "Jun 2026"]} />
          </div>

          <div className="report-block__insights">
            <h5><IconLightbulb /> Insights</h5>
            <ul>
              {INSIGHTS.map((text) => (
                <li key={text}>
                  <IconCheckCircle /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
