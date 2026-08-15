import { Link } from "react-router-dom";
import "./WorkInProgress.css";

/**
 * Generic "coming soon" placeholder page. Use for any route that's
 * planned but not built yet — swap the title/message via props for
 * different sections (e.g. "Settings", "Profile").
 */
export default function WorkInProgress({
  title = "Work in progress",
  message = "We'll be up soon!",
}) {
  return (
    <div className="wip-page">
      <div className="wip-page__banner">
        <span className="wip-page__icon">
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9.5" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <h1 className="wip-page__title">{title}</h1>
        <p className="wip-page__message">{message}</p>
        <Link to="/dashboard" className="button wip-page__back">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
