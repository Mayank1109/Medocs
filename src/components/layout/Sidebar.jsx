import { Link, NavLink } from "react-router-dom";
import {
  IconGrid,
  IconDocs,
  IconActivity,
  IconChat,
  IconShare,
  IconGear,
  IconBell,
  IconChevronRight,
} from "../../icons/HeroIcons";
import React from "react";

const DEFAULT_NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: <IconGrid /> },
  { to: "/documents", label: "Documents", icon: <IconDocs /> },
  { to: "/vitals", label: "Vitals", icon: <IconActivity /> },
  { to: "/ai-assistant", label: "AI Assistant", icon: <IconChat /> },
  { to: "/share-profile", label: "Share Profile", icon: <IconShare /> },
];

const DEFAULT_SECONDARY_ITEMS = [
  { to: "/notifications", label: "Notifications", icon: <IconBell /> },
  { to: "/settings", label: "Settings", icon: <IconGear /> },
];

/** Shared app sidebar with an optional page-specific content slot. */
export default function Sidebar({
  children,
  userName = "Mayank Chauhan",
  userInitials = "MC",
  hasUnreadNotifications = true,
  navItems = DEFAULT_NAV_ITEMS,
  secondaryItems = DEFAULT_SECONDARY_ITEMS,
  showUserCard = true,
  logoLabel = "Medocs.",
}) {
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="sidebar__logo">
        <span className="sidebar__logo-icon">
          <PlusMark />
        </span>
        <span className="sidebar__logo-name">{logoLabel}</span>
      </Link>

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `sidebar__nav-item${isActive ? " active" : ""}`
          }
        >
          <span className="sidebar__nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}

      {React.Children.count(children) > 0 && (
        <div className="sidebar__divider" />
      )}

      {children}

      <div className="sidebar__divider" />

      {secondaryItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `sidebar__nav-item${isActive ? " active" : ""}`
          }
        >
          <span className="sidebar__nav-icon">{item.icon}</span>
          {item.label}
          {item.to === "/notifications" && hasUnreadNotifications && (
            <span className="sidebar__unread-dot" />
          )}
        </NavLink>
      ))}

      {showUserCard && (
        <div className="sidebar__bottom">
          <Link to="/profile" className="sidebar__user">
            <span className="sidebar__avatar">{userInitials}</span>
            <span>
              <span className="sidebar__user-name">{userName}</span>
              <span className="sidebar__user-link">
                View profile <IconChevronRight />
              </span>
            </span>
          </Link>
        </div>
      )}
    </aside>
  );
}

function PlusMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
