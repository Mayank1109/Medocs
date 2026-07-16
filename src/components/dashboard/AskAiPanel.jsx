import { Link } from "react-router-dom";
import HealthScoreRing from "./HealthScoreRing";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheckCircle,
} from "../../icons/HeroIcons";

export default function AskAiPanel({ items = [] }) {
  return (
    <div className="card score-card">
      <div className="score-card__ring-col">
        <span className="score-card__eyebrow">Overall health score</span>
        <HealthScoreRing score={84} max={100} />
      </div>

      <div className="score-card__summary-col">
        <span className="score-card__eyebrow">AI health summary</span>
        <h2 className="score-card__heading">Your health is improving.</h2>
        <ul className="score-card__list">
          {items.map((item) => (
            <li
              key={item.text}
              className={`score-card__list-item score-card__list-item--${item.tone}`}
            >
              {item.tone === "warn" ? (
                <IconAlertTriangle />
              ) : (
                <IconCheckCircle />
              )}
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/ai-assistant"
        className="button button--secondary score-card__cta"
      >
        View full report <IconArrowRight />
      </Link>
    </div>
  );
}
