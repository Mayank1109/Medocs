import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  IconFolder,
  IconChevronRight,
  IconFilePdf,
  IconFileImage,
} from "../../icons/HeroIcons";

const REPORTS = [
  {
    name: "Blood Test - Full Panel",
    date: "Jun 7, 2026",
    type: "pdf",
    status: "Analysed",
    tone: "success",
  },
  {
    name: "Prescription - Dr. Sharma",
    date: "Apr 28, 2026",
    type: "pdf",
    status: "Viewed",
    tone: "neutral",
  },
  {
    name: "Blood Pressure Check",
    date: "Feb 15, 2026",
    type: "pdf",
    status: "Reviewed",
    tone: "warn",
  },
  {
    name: "Lipid Profile Report",
    date: "Jan 10, 2026",
    type: "image",
    status: "Analysed",
    tone: "success",
  },
  {
    name: "Thyroid Report",
    date: "Dec 28, 2025",
    type: "image",
    status: "Viewed",
    tone: "neutral",
  },
];

const STATUS_ICON = { success: "✓", neutral: "◷", warn: "⚠" };

export default function RecentReports() {
  const scrollerRef = useRef(null);

  function scrollRight() {
    scrollerRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  }

  return (
    <div className="card reports-card">
      <div className="panel-header">
        <h3 className="panel-header__with-icon">
          <IconFolder />
          Recent reports
        </h3>
        <Link to="/documents" className="panel-header__link">
          View all documents <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="reports-strip">
        <div className="reports-strip__scroller" ref={scrollerRef}>
          {REPORTS.map((r) => (
            <div className="report-card" key={r.name}>
              <span
                className={`report-card__icon report-card__icon--${r.type}`}
              >
                {r.type === "image" ? <IconFileImage /> : <IconFilePdf />}
              </span>
              <div className="report-card__name">{r.name}</div>
              <div className="report-card__date">{r.date}</div>
              <span
                className={`report-card__status report-card__status--${r.tone}`}
              >
                {STATUS_ICON[r.tone]} {r.status}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="reports-strip__scroll-btn"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
