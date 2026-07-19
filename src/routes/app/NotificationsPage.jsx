import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconSparkleSmall,
  IconDocs,
  IconShare,
  IconPerson,
  IconCalendar,
  IconDatabase,
  IconInboxCheck,
} from "../../icons/AppIcons";
import { IconCheck } from "../../icons/AuthIcons";
import "./Documents.css";
import "./NotificationsPage.css";

const NOTIFICATIONS = [
  {
    group: "Today",
    items: [
      {
        id: "n1",
        icon: <IconSparkleSmall />,
        tone: "violet",
        title: "AI analysis completed",
        message: 'Your analysis for "Blood Test — June 2026" is ready.',
        time: "3 min ago",
        action: "View",
        unread: true,
      },
      {
        id: "n2",
        icon: <IconDocs />,
        tone: "green",
        title: "Document uploaded",
        message: '"Blood Test — June 2026.pdf" was uploaded successfully.',
        time: "15 min ago",
        action: "Open",
        unread: true,
      },
      {
        id: "n3",
        icon: <IconShare />,
        tone: "blue",
        title: "Document shared",
        message: 'You shared "Prescription — Dr Sharma" with Dr. Sharma.',
        time: "2 hr ago",
        unread: true,
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        id: "n4",
        icon: <IconPerson />,
        tone: "amber",
        title: "Document viewed",
        message: 'Dr. Sharma viewed "Prescription — Dr Sharma".',
        time: "Yesterday, 6:30 PM",
      },
      {
        id: "n5",
        icon: <IconCalendar />,
        tone: "indigo",
        title: "Health reminder",
        message: "Time for your annual blood test. Stay on top of your health!",
        time: "Yesterday, 9:00 AM",
      },
    ],
  },
  {
    group: "This week",
    items: [
      {
        id: "n6",
        icon: <IconDatabase />,
        tone: "amber",
        title: "Storage almost full",
        message: "You've used 85% of your storage. Consider freeing up space.",
        time: "2 days ago",
      },
      {
        id: "n7",
        icon: <IconSparkleSmall />,
        tone: "blue",
        title: "Product update",
        message: "We've added new AI insights for lab reports.",
        time: "3 days ago",
      },
    ],
  },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [readIds, setReadIds] = useState(new Set());

  function markAllRead() {
    const all = new Set();
    NOTIFICATIONS.forEach((g) =>
      g.items.forEach((n) => n.unread && all.add(n.id)),
    );
    setReadIds(all);
  }

  function isUnread(n) {
    return n.unread && !readIds.has(n.id);
  }

  const filteredGroups = NOTIFICATIONS.map((g) => ({
    ...g,
    items: g.items.filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
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
            onClick={markAllRead}
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

        {filteredGroups.length === 0 ? (
          <div className="docs-empty">No notifications match your search.</div>
        ) : (
          filteredGroups.map((g) => (
            <div className="docs-group" key={g.group}>
              <h2 className="docs-group__title">{g.group}</h2>
              <div className="notif-list">
                {g.items.map((n) => (
                  <div
                    className={`notif-row${isUnread(n) ? " unread" : ""}`}
                    key={n.id}
                  >
                    <span
                      className={`notif-row__icon notif-row__icon--${n.tone}`}
                    >
                      {n.icon}
                    </span>
                    <div className="notif-row__body">
                      <div className="notif-row__title-line">
                        {isUnread(n) && <span className="notif-row__dot" />}
                        <span className="notif-row__title">{n.title}</span>
                      </div>
                      <p className="notif-row__message">{n.message}</p>
                    </div>
                    <div className="notif-row__meta">
                      <span className="notif-row__time">{n.time}</span>
                      {n.action && (
                        <button type="button" className="notif-row__action">
                          {n.action}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
      </main>
    </div>
  );
}
