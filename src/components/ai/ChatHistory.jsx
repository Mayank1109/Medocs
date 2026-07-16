import { GROUPS } from "../../data/ChatHistoryData";

export default function ChatHistory({ active, onSelect }) {
  return (
    <>
      <span className="sidebar__section-label">Chat History</span>
      <div className="sidebar__history-group">
        {GROUPS.map((group) => (
          <button
            type="button"
            key={group.id}
            className={`sidebar__history-item${active === group.id ? " active" : ""}`}
            onClick={() => onSelect?.(group.id)}
          >
            <span className="sidebar__history-dot" />
            {group.title}
          </button>
        ))}
      </div>
    </>
  );
}
