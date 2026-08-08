import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  IconGrid,
  IconDocs,
  IconActivity,
  IconChat,
  IconShare,
  IconGear,
  IconBell,
  IconChevronRight,
  IconChevronLeft,
  IconLogOut,
} from "../../icons/HeroIcons";
import { useSidebar } from "../../hooks/useSidebar";
import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { performLogout } from "../../utility/authHistory";

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
  const { collapsed, toggleCollapsed } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await performLogout(dispatch, navigate, authActions.logout());
  }

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__top">
        <Link to="/dashboard" className="sidebar__logo">
          <span className="sidebar__logo-icon">
            <PlusMark />
          </span>
          {!collapsed && (
            <span className="sidebar__logo-name">{logoLabel}</span>
          )}
        </Link>
        <button
          type="button"
          className="sidebar__collapse-btn"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
      </div>

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `sidebar__nav-item${isActive ? " active" : ""}`
          }
          title={collapsed ? item.label : undefined}
        >
          <span className="sidebar__nav-icon">{item.icon}</span>
          {!collapsed && item.label}
        </NavLink>
      ))}

      {React.Children.count(children) > 0 && !collapsed && (
        <div className="sidebar__divider" />
      )}

      {!collapsed && children}

      <div className="sidebar__divider" />

      {secondaryItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `sidebar__nav-item${isActive ? " active" : ""}`
          }
          title={collapsed ? item.label : undefined}
        >
          <span className="sidebar__nav-icon">{item.icon}</span>
          {!collapsed && item.label}
          {item.to === "/notifications" && hasUnreadNotifications && (
            <span className="sidebar__unread-dot" />
          )}
        </NavLink>
      ))}

      {showUserCard && (
        <div className="sidebar__bottom">
          <button
            type="button"
            className="sidebar__logout"
            onClick={handleLogout}
            title={collapsed ? "Log out" : undefined}
          >
            <span className="sidebar__nav-icon">
              <IconLogOut />
            </span>
            {!collapsed && "Log out"}
          </button>

          <Link
            to="/profile"
            className="sidebar__user"
            title={collapsed ? userName : undefined}
          >
            <span className="sidebar__avatar">{userInitials}</span>
            {!collapsed && (
              <span>
                <span className="sidebar__user-name">{userName}</span>
                <span className="sidebar__user-link">
                  View profile <IconChevronRight />
                </span>
              </span>
            )}
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
