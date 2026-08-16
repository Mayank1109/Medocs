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
import { useVitalsTrends } from "../hooks/data-fetching/useVitalsTrends";

export default function VitalsPage() {
  const [summaryDismissed, setSummaryDismissed] = useState(false);
  const { statCards, dates, trendSeries, measurements, loading, hasData } =
    useVitalsTrends();

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

      {loading && (
        <div className="vitals-stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div
              className="card vitals-stat-card vitals-stat-card--skeleton"
              key={i}
            >
              <div className="skeleton-line skeleton-line--title" />
              <div className="skeleton-line skeleton-line--value" />
              <div className="skeleton-block skeleton-block--chart" />
            </div>
          ))}
        </div>
      )}

      {!loading && !hasData && (
        <div className="vitals-empty-state">
          No vitals yet — analyze a lab report, prescription, or visit note to
          start tracking trends.
        </div>
      )}

      {!loading && hasData && (
        <>
          {!summaryDismissed && (
            <div className="vitals-summary-banner">
              <span className="vitals-summary-banner__icon">
                <IconTrendUp />
              </span>
              <div className="vitals-summary-banner__body">
                <div className="vitals-summary-banner__title">
                  Health Summary
                </div>
                <p className="vitals-summary-banner__text">
                  Trends reflect values extracted from documents you've
                  analyzed.
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
            {statCards.map((s) => (
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
                {s.data.length > 0 && (
                  <Sparkline
                    data={s.data}
                    color={s.color}
                    yMin={s.yMin}
                    yMax={s.yMax}
                    xStart={s.xStart}
                    xEnd={s.xEnd}
                  />
                )}
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
            <VitalsTrendChart dates={dates} series={trendSeries} />
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
              {measurements.map((m) => (
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
      )}
    </>
  );
}
