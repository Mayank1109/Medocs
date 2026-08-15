import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconSparkleSmall,
  IconDocs,
  IconShare,
  IconInboxCheck,
} from "../icons/AppIcons";
import { IconCheck } from "../icons/AuthIcons";
import "./Documents.css";
import "./NotificationsPage.css";
import { useNotificationActions } from "../hooks/useNotificationActions";

const TYPE_META = {
  upload: { icon: <IconDocs />, tone: "green", action: "Open" },
  ai_analysis: { icon: <IconSparkleSmall />, tone: "violet", action: "View" },
  share: { icon: <IconShare />, tone: "blue" },
  system: { icon: <IconSparkleSmall />, tone: "blue" },
};

function formatNotifTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;

  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();
  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
}

function groupLabel(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "This week";
  return "Older";
}

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const {
    notifications,
    loading,
    fetchNotifications,
    markReadHandler,
    markAllReadHandler,
  } = useNotificationActions();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filtered = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase()),
  );

  const groups = [];
  const byGroup = new Map();
  filtered.forEach((n) => {
    const label = groupLabel(n.createdAt);
    if (!byGroup.has(label)) byGroup.set(label, []);
    byGroup.get(label).push(n);
  });
  ["Today", "Yesterday", "This week", "Older"].forEach((label) => {
    if (byGroup.has(label)) groups.push([label, byGroup.get(label)]);
  });

  return (
    <>
      <div className="page-header">
        <div>
          <h1 style={{ margin: "0rem 0rem 1rem 0rem", textAlign: "left" }}>
            Notifications
          </h1>
          <p className="page-header__subtitle">
            Stay updated with the latest activity and alerts
          </p>
        </div>
        <button
          type="button"
          className="mark-read-link"
          onClick={markAllReadHandler}
        >
          <IconCheck /> Mark all as read
        </button>
      </div>

      <div className="docs-toolbar">
        <div className="docs-toolbar__search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search notifications…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" className="docs-toolbar__btn">
          <IconFilter /> All types <IconChevronDown />
        </button>
      </div>

      {loading ? (
        <div className="docs-empty">Loading…</div>
      ) : groups.length === 0 ? (
        <div className="docs-empty">No notifications match your search.</div>
      ) : (
        groups.map(([label, items]) => (
          <div className="docs-group" key={label}>
            <h2 className="docs-group__title">{label}</h2>
            <div className="notif-list">
              {items.map((n) => {
                const meta = TYPE_META[n.type] || TYPE_META.system;
                return (
                  <div
                    className={`notif-row${!n.read ? " unread" : ""}`}
                    key={n._id}
                  >
                    <span
                      className={`notif-row__icon notif-row__icon--${meta.tone}`}
                    >
                      {meta.icon}
                    </span>
                    <div className="notif-row__body">
                      <div className="notif-row__title-line">
                        {!n.read && <span className="notif-row__dot" />}
                        <span className="notif-row__title">{n.title}</span>
                      </div>
                      <p className="notif-row__message">{n.message}</p>
                    </div>
                    <div className="notif-row__meta">
                      <span className="notif-row__time">
                        {formatNotifTime(n.createdAt)}
                      </span>
                      {meta.action && n.relatedDocumentId && (
                        <button
                          type="button"
                          className="notif-row__action"
                          onClick={() => markReadHandler(n._id)}
                        >
                          {meta.action}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      <div className="docs-end">
        <IconInboxCheck />
        <div>
          <div className="docs-end__title">You've reached the end</div>
          <div className="docs-end__sub">No more notifications to show</div>
        </div>
      </div>
    </>
  );
}
