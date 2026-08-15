import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconCalendar,
  IconChevronDown,
  IconPlusSmall,
  IconMoreHorizontal,
  IconTrendUp,
  IconX,
  IconChevronRight,
  IconInfo,
} from "../icons/AppIcons";
import "./VitalsPage.css";
import Sparkline from "../components/ui/Sparkline";
import VitalsTrendChart from "../components/ui/VitalsTrendChart";

const STAT_CARDS = [
  {
    key: "bp",
    title: "Blood Pressure",
    value: "118/76",
    unit: "mmHg",
    trend: "↓ Improving",
    tone: "good",
    color: "#1d9e75",
    data: [132, 128, 125, 130, 122, 126, 119, 121, 118],
    yMin: 100,
    yMax: 140,
  },
  {
    key: "sugar",
    title: "Blood Sugar",
    value: "98",
    unit: "mg/dL",
    trend: "→ Stable",
    tone: "warn",
    color: "#ef9f27",
    data: [102, 100, 103, 99, 101, 97, 100, 96, 98],
    yMin: 80,
    yMax: 120,
  },
  {
    key: "weight",
    title: "Weight",
    value: "72",
    unit: "kg",
    trend: "→ Stable",
    tone: "good",
    color: "#1d9e75",
    data: [73, 73, 72, 73, 72, 72, 72, 72, 72],
    yMin: 64,
    yMax: 80,
  },
  {
    key: "heart",
    title: "Heart Rate",
    value: "68",
    unit: "bpm",
    trend: "↓ Healthy",
    tone: "good",
    color: "#1d9e75",
    data: [74, 71, 70, 73, 69, 72, 67, 70, 68],
    yMin: 50,
    yMax: 90,
  },
];

const MEASUREMENTS = [
  {
    date: "Jun 28, 2026",
    bp: "118/76",
    sugar: "98 mg/dL",
    weight: "72 kg",
    heart: "68 bpm",
  },
  {
    date: "Jun 20, 2026",
    bp: "121/79",
    sugar: "102 mg/dL",
    weight: "72 kg",
    heart: "70 bpm",
  },
  {
    date: "Jun 10, 2026",
    bp: "126/82",
    sugar: "107 mg/dL",
    weight: "72 kg",
    heart: "72 bpm",
  },
  {
    date: "May 30, 2026",
    bp: "132/86",
    sugar: "115 mg/dL",
    weight: "73 kg",
    heart: "74 bpm",
  },
];

export default function VitalsPage() {
  const [summaryDismissed, setSummaryDismissed] = useState(false);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Vitals</h1>
          <p className="page-header__subtitle">
            Track your health trends over time
          </p>
        </div>
        <div className="page-header__actions">
          <button type="button" className="docs-toolbar__btn">
            <IconCalendar /> Last 30 days <IconChevronDown />
          </button>
          <button type="button" className="button">
            <IconPlusSmall /> Add Reading
          </button>
        </div>
      </div>

      {!summaryDismissed && (
        <div className="vitals-summary-banner">
          <span className="vitals-summary-banner__icon">
            <IconTrendUp />
          </span>
          <div className="vitals-summary-banner__body">
            <div className="vitals-summary-banner__title">Health Summary</div>
            <p className="vitals-summary-banner__text">
              Your blood pressure continues to improve. Weight has remained
              stable over the last 30 days.
            </p>
          </div>
          <button
            type="button"
            className="vitals-summary-banner__close"
            onClick={() => setSummaryDismissed(true)}
            aria-label="Dismiss"
          >
            <IconX />
          </button>
        </div>
      )}

      <div className="vitals-stats-grid">
        {STAT_CARDS.map((s) => (
          <div className="card vitals-stat-card" key={s.key}>
            <div className="vitals-stat-card__header">
              <h3>{s.title}</h3>
              <button
                type="button"
                className="vitals-stat-card__more"
                aria-label="More options"
              >
                <IconMoreHorizontal />
              </button>
            </div>
            <div className="vitals-stat-card__value">
              {s.value} <span>{s.unit}</span>
            </div>
            <div
              className={`vitals-stat-card__trend vitals-stat-card__trend--${s.tone}`}
            >
              {s.trend}
            </div>
            <Sparkline
              data={s.data}
              color={s.color}
              yMin={s.yMin}
              yMax={s.yMax}
              xStart="May 30"
              xEnd="Jun 28"
            />
          </div>
        ))}
      </div>

      <div className="card health-trends-card">
        <div className="panel-header">
          <h3>Health Trends</h3>
          <button type="button" className="docs-toolbar__btn">
            Last 30 days <IconChevronDown />
          </button>
        </div>
        <VitalsTrendChart />
      </div>

      <div className="card">
        <div className="panel-header">
          <h3>Recent Measurements</h3>
          <Link to="/vitals/history" className="panel-header__link">
            View all <IconChevronRight />
          </Link>
        </div>

        <div className="measurements-table">
          <div className="measurements-table__row measurements-table__row--head">
            <span>Date</span>
            <span>Blood Pressure</span>
            <span>Blood Sugar</span>
            <span>Weight</span>
            <span>Heart Rate</span>
          </div>
          {MEASUREMENTS.map((m) => (
            <div className="measurements-table__row" key={m.date}>
              <span>{m.date}</span>
              <span>{m.bp}</span>
              <span>{m.sugar}</span>
              <span>{m.weight}</span>
              <span>{m.heart}</span>
            </div>
          ))}
        </div>

        <div className="measurements-footer">
          <span>
            <IconInfo /> All times are in <a href="#">Your local time</a>
          </span>
          <a href="#" className="measurements-footer__add">
            Add reading manually
          </a>
        </div>
      </div>
    </>
  );
}
