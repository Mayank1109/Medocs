import { Link } from "react-router-dom";
import { IconArrowRight, IconFilePdf } from "../../icons/HeroIcons";

export default function HealthTimeline({ items = [] }) {
  return (
    <div className="card timeline-card">
      <div className="panel-header">
        <h3>Health timeline</h3>
        <Link to="/documents" className="panel-header__link">
          View all
        </Link>
      </div>

      <div className="timeline-card__list">
        {items.map((item, index) => (
          <div
            className={`timeline-item timeline-item--connected${index === items.length - 1 ? " last" : ""}`}
            key={item.name}
          >
            <span className="timeline-date timeline-date--stacked">
              {item.date.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
            <span className={`timeline-dot timeline-dot--${item.dot}`} />
            <div className="timeline-item__body">
              <div className="timeline-name">{item.name}</div>
              <div className="timeline-sub">{item.sub}</div>
              <span className={`badge badge--${item.badge.tone}`}>
                {item.badge.text}
              </span>
            </div>
            <span
              className={`timeline-item__doc timeline-item__doc--${item.docTone}`}
            >
              <IconFilePdf />
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="button button--secondary timeline-card__view-all"
      >
        View full timeline{" "}
        <IconArrowRight style={{ width: "1.5rem", height: "1.5rem" }} />
      </button>
    </div>
  );
}
