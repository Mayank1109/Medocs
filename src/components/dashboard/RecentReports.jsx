import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconFolder,
  IconChevronRight,
  IconFilePdf,
  IconFileImage,
} from "../../icons/HeroIcons";
import { useDocumentList } from "../../hooks/useDocumentList";

const STATUS_ICON = { success: "✓", neutral: "◷", warn: "⚠" };

export default function RecentReports() {
  const scrollerRef = useRef(null);
  const { userDocs, refresh } = useSelector((s) => s.doc);
  const { fetchPage } = useDocumentList();

  useEffect(() => {
    fetchPage({ page: 1, append: false });
  }, [refresh, fetchPage]);

  const recent = [...userDocs]
    .sort((a, b) => b.sortDate - a.sortDate)
    .slice(0, 5);

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
          {recent.length === 0 ? (
            <p className="reports-strip__empty">No documents uploaded yet.</p>
          ) : (
            recent.map((doc) => (
              <div className="report-card" key={doc.id}>
                <span
                  className={`report-card__icon report-card__icon--${doc.fileType === "JPG" || doc.fileType === "PNG" ? "image" : "pdf"}`}
                >
                  {doc.fileType === "JPG" || doc.fileType === "PNG" ? (
                    <IconFileImage />
                  ) : (
                    <IconFilePdf />
                  )}
                </span>
                <div className="report-card__name">{doc.name}</div>
                <div className="report-card__date">{doc.date}</div>
                <span
                  className={`report-card__status report-card__status--${doc.aiStatus === "available" ? "success" : "neutral"}`}
                >
                  {doc.aiStatus === "available"
                    ? `${STATUS_ICON.success} Analysed`
                    : `${STATUS_ICON.neutral} Uploaded`}
                </span>
              </div>
            ))
          )}
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
