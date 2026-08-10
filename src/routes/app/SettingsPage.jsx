import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useTheme } from "../../hooks/useTheme";
import { useProfileActions } from "../../hooks/useProfileActions";
import { formatBytes, modalDisplayHandler } from "../../utility/Functions";
import {
  IconMonitor,
  IconMoon,
  IconSun,
  IconBell,
  IconSparkleSmall,
  IconChevronDown,
  IconChevronRight,
  IconDatabase,
  IconShieldBadge,
  IconDownload,
  IconLink,
  IconTrash,
} from "../../icons/AppIcons";
import "./SettingsPage.css";

const THEMES = [
  {
    key: "system",
    label: "System",
    sub: "Use device settings",
    icon: <IconMonitor />,
  },
  { key: "dark", label: "Dark", sub: "Always dark", icon: <IconMoon /> },
  { key: "light", label: "Light", sub: "Always light", icon: <IconSun /> },
];

const NOTIFICATION_PREFS = [
  {
    key: "ai",
    title: "AI analysis completed",
    sub: "Get notified when AI analysis of your reports is ready",
  },
  {
    key: "viewed",
    title: "Shared document viewed",
    sub: "Get notified when someone views a document you shared",
  },
  {
    key: "upload",
    title: "Document upload successful",
    sub: "Get notified when your document is uploaded",
  },
  {
    key: "product",
    title: "Product updates and announcements",
    sub: "Important updates about Medocs",
  },
];

const DEFAULT_NOTIFICATION_PREFS = {
  ai: true,
  viewed: true,
  upload: true,
  product: true,
};

const PRIVACY_ROWS = [
  {
    key: "download",
    icon: <IconDownload />,
    title: "Download my data",
    sub: "Export all your data and documents",
  },
  {
    key: "connected",
    icon: <IconLink />,
    title: "Manage connected accounts",
    sub: "Manage your connected accounts",
  },
  {
    key: "delete",
    icon: <IconTrash />,
    title: "Delete account",
    sub: "Permanently delete your account and all data",
    danger: true,
  },
];
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const {
    profile,
    fetchProfileHandler,
    storagePct,
    editProfileHandler,
    downloadDataHandler,
    deleteAccountHandler,
  } = useProfileActions();

  useEffect(() => {
    fetchProfileHandler();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const prefs = profile.notificationPreferences || DEFAULT_NOTIFICATION_PREFS;

  function togglePref(key) {
    editProfileHandler({
      notificationPreferences: { ...prefs, [key]: !prefs[key] },
    });
  }

  function handlePrivacyAction(key) {
    if (key === "download") downloadDataHandler();
    else if (key === "connected") navigate("/profile");
    else if (key === "delete") modalDisplayHandler(event, "DeleteAccount"); // see note below
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="page-header__subtitle">
            Manage your account preferences and app settings
          </p>
        </div>
      </div>

      {/* ---------- Appearance ---------- */}
      <div className="card settings-card">
        <SettingsCardHeader
          icon={<IconMonitor />}
          title="Appearance"
          sub="Choose how Medocs looks on your device."
        />
        <div className="theme-options">
          {THEMES.map((t) => (
            <button
              type="button"
              key={t.key}
              className={`theme-option${theme === t.key ? " active" : ""}`}
              onClick={() => setTheme(t.key)}
            >
              <span className="theme-option__icon">{t.icon}</span>
              <span className="theme-option__label">{t.label}</span>
              <span className="theme-option__sub">{t.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Notifications ---------- */}
      <div className="card settings-card">
        <SettingsCardHeader
          icon={<IconBell />}
          title="Notifications"
          sub="Manage what you want to be notified about."
        />
        <div className="pref-rows">
          {NOTIFICATION_PREFS.map((p) => (
            <button
              type="button"
              className="pref-row"
              key={p.key}
              onClick={() => togglePref(p.key)}
            >
              <span
                className={`pref-row__check${prefs[p.key] ? " checked" : ""}`}
              >
                {prefs[p.key] && <CheckMark />}
              </span>
              <span className="pref-row__body">
                <span className="pref-row__title">{p.title}</span>
                <span className="pref-row__sub">{p.sub}</span>
              </span>
              <IconChevronRight />
            </button>
          ))}
        </div>
      </div>

      {/* ---------- AI Preferences ---------- */}
      <div className="card settings-card">
        <SettingsCardHeader
          icon={<IconSparkleSmall />}
          title="AI Preferences"
          sub="Configure AI behaviour and preferences."
        />

        <div className="settings-row">
          <span className="settings-row__label">Default AI model</span>
          <div className="model-select">
            <button type="button" className="model-select__button">
              GPT-4.1 <IconChevronDown />
            </button>
          </div>
        </div>

        <div className="settings-row">
          <span className="settings-row__body">
            <span className="settings-row__label">
              Automatically suggest AI analysis
            </span>
            <span className="settings-row__sub">
              Suggest AI analysis for new uploads
            </span>
          </span>
          <button type="button" className="toggle-switch" aria-pressed={false}>
            <span className="toggle-switch__knob" />
          </button>
        </div>
      </div>

      {/* ---------- Storage ---------- */}
      <div className="card settings-card">
        <SettingsCardHeader
          icon={<IconDatabase />}
          title="Storage"
          sub="View your storage usage and manage files."
        />
        <div className="storage-row">
          <div className="storage-row__text">
            <span className="storage-row__value">
              {formatBytes(profile.storageUsedBytes)} <span>/ 1 GB used</span>
            </span>
            <span className="storage-row__pct">{storagePct}% used</span>
          </div>
          <Link to="/profile" className="button button--secondary">
            Manage storage
          </Link>
        </div>
        <div className="account-row__progress settings-storage-bar">
          <div
            className="account-row__progress-fill"
            style={{ width: `${storagePct}%` }}
          />
        </div>
      </div>

      {/* ---------- Privacy & data ---------- */}
      <div className="card settings-card">
        <SettingsCardHeader
          icon={<IconShieldBadge />}
          title="Privacy &amp; data"
          sub="Manage your data and privacy settings."
        />
        <div className="privacy-rows">
          {PRIVACY_ROWS.map((r) => (
            <button
              type="button"
              className={`privacy-row${r.danger ? " danger" : ""}`}
              key={r.title}
              onClick={(e) => {
                if (r.key === "delete") {
                  modalDisplayHandler(e, "DeleteAccount");
                } else if (r.key === "connected") {
                  navigate("/profile");
                } else if (r.key === "download") {
                  downloadDataHandler();
                }
              }}
            >
              <span className="privacy-row__icon">{r.icon}</span>
              <span className="privacy-row__body">
                <span className="privacy-row__title">{r.title}</span>
                <span className="privacy-row__sub">{r.sub}</span>
              </span>
              <IconChevronRight />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function SettingsCardHeader({ icon, title, sub }) {
  return (
    <div className="settings-card__header">
      <span className="settings-card__icon">{icon}</span>
      <div>
        <h3 className="profile-section-title">{title}</h3>
        <p className="profile-section-subtitle">{sub}</p>
      </div>
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
