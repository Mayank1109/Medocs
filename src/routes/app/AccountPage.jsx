import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import {
  IconPencil,
  IconCamera,
  IconCalendar,
  IconClockDot,
  IconShieldBadge,
  IconPerson,
  IconMail,
  IconPhone,
  IconDroplet,
  IconMapPin,
  IconInfo,
  IconChevronRight,
  IconDatabase,
  IconDocs,
  IconSparkleSmall,
  IconLock,
  IconLink,
  IconGoogleColor,
  IconApple,
  IconCrown,
} from "../../icons/AppIcons";
import "./ProfilePage.css";
import "./AccountPage.css";

const PERSONAL_INFO = [
  { icon: <IconPhone />, label: "Phone number", value: "+91 98765 43210" },
  { icon: <IconCalendar />, label: "Date of birth", value: "12 Mar 2000" },
  { icon: <IconPerson />, label: "Gender", value: "Male" },
  {
    icon: <IconDroplet />,
    label: "Blood group",
    value: "B+",
    info: "Used for emergency profile sharing",
  },
];

const SECURITY_ROWS = [
  { label: "Password", value: "•••••••••" },
  { label: "Two-factor authentication", value: "On", tone: "good" },
  { label: "Active devices", value: "2 devices" },
  { label: "Last login", value: "Today, 10:42 AM" },
];

export default function AccountPage() {
  const [twoFactorOn] = useState(true);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 style={{ margin: "0rem 0rem 1rem 0rem", textAlign: "left" }}>
              My Account
            </h1>
            <p className="page-header__subtitle">
              Manage your personal details and account settings
            </p>
          </div>
          <button
            type="button"
            className="button button--secondary"
            style={{ width: "9rem" }}
          >
            <IconPencil size="1.5rem" /> Edit profile
          </button>
        </div>

        {/* ---------- Identity card ---------- */}
        <div className="card profile-hero">
          <div className="profile-hero__avatar-wrap">
            <span className="profile-hero__avatar">MC</span>
            <button
              type="button"
              className="profile-hero__camera"
              aria-label="Change photo"
            >
              <IconCamera />
            </button>
          </div>

          <div className="profile-hero__identity">
            <h2>Mayank Chauhan</h2>
            <p className="profile-hero__email">mayank.chauhan@email.com</p>
            <span className="badge badge--amber profile-hero__premium">
              <IconCrown /> Premium member
            </span>
          </div>

          <div className="profile-hero__meta">
            <div className="profile-hero__meta-item">
              <span className="profile-hero__meta-label">
                <IconCalendar /> Member since
              </span>
              <span className="profile-hero__meta-value">15 Jan 2025</span>
            </div>
            <div className="profile-hero__meta-item">
              <span className="profile-hero__meta-label">
                <IconClockDot /> Last login
              </span>
              <span className="profile-hero__meta-value">Today, 10:42 AM</span>
            </div>
            <div className="profile-hero__meta-item">
              <span className="profile-hero__meta-label">
                <IconShieldBadge /> Account status
              </span>
              <span className="profile-hero__meta-value account-status--active">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Grid ---------- */}
        <div className="account-grid">
          <div className="card">
            <h3 className="profile-section-title">Personal information</h3>
            <div className="info-rows">
              {PERSONAL_INFO.map((f) => (
                <div className="info-row" key={f.label}>
                  <span className="info-row__icon">{f.icon}</span>
                  <span className="info-row__label">
                    {f.label}
                    {f.info && (
                      <span className="tooltip-wrap tooltip-wrap--top info-row__info-icon">
                        <IconInfo />
                        <span className="tooltip tooltip--ghost">{f.info}</span>
                      </span>
                    )}
                  </span>
                  <span className="info-row__value">{f.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="button button--secondary account-card__cta"
            >
              Edit information
            </button>
          </div>

          <div className="card">
            <h3 className="profile-section-title panel-header__with-icon">
              <span className="account-card__icon">
                <IconDatabase />
              </span>
              Storage &amp; usage
            </h3>

            <div className="storage-summary">
              <span className="storage-summary__value">
                420 MB <span>/ 1 GB used</span>
              </span>
              <span className="storage-summary__pct">42% used</span>
            </div>
            <div className="account-row__progress storage-bar">
              <div
                className="account-row__progress-fill"
                style={{ width: "42%" }}
              />
            </div>

            <div className="storage-mini-stats">
              <div className="storage-mini-stat">
                <IconDocs />
                <div>
                  <strong>14</strong>
                  <span>Documents</span>
                </div>
              </div>
              <div className="storage-mini-stat">
                <IconSparkleSmall />
                <div>
                  <strong>2</strong>
                  <span>AI analyses remaining</span>
                </div>
              </div>
              <div className="storage-mini-stat">
                <IconCalendar />
                <div>
                  <span className="storage-mini-stat__label-only">
                    Member since
                  </span>
                  <strong className="storage-mini-stat__small">Jan 2025</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="button button--secondary account-card__cta"
            >
              Manage storage
            </button>
          </div>

          <div className="card">
            <h3 className="profile-section-title panel-header__with-icon">
              <span className="account-card__icon">
                <IconShieldBadge />
              </span>
              Security
            </h3>
            <div className="security-rows">
              {SECURITY_ROWS.map((r) => (
                <button type="button" className="security-row" key={r.label}>
                  <span className="security-row__label">{r.label}</span>
                  <span
                    className={`security-row__value${r.tone === "good" ? " security-row__value--good" : ""}`}
                  >
                    {r.value}
                  </span>
                  <IconChevronRight />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="button button--secondary account-card__cta"
            >
              Manage security
            </button>
          </div>

          <div className="card">
            <h3 className="profile-section-title panel-header__with-icon">
              <span className="account-card__icon">
                <IconLink />
              </span>
              Connected accounts
            </h3>
            <div className="connected-rows">
              <div className="connected-row">
                <span className="connected-row__logo">
                  <IconGoogleColor />
                </span>
                <div className="connected-row__body">
                  <div className="connected-row__name">Google</div>
                  <div className="connected-row__sub">
                    mayank.chauhan@gmail.com
                  </div>
                </div>
                <span className="badge badge--success connected-row__status">
                  Connected
                </span>
                <IconChevronRight />
              </div>
              <div className="connected-row">
                <span className="connected-row__logo connected-row__logo--apple">
                  <IconApple />
                </span>
                <div className="connected-row__body">
                  <div className="connected-row__name">Apple</div>
                  <div className="connected-row__sub">Not connected</div>
                </div>
                <button
                  type="button"
                  className="button button--secondary button--sm"
                >
                  Connect
                </button>
                <IconChevronRight />
              </div>
            </div>
            <button
              type="button"
              className="button button--secondary account-card__cta"
              style={{ marginTop: "2.7rem" }}
            >
              Manage accounts
            </button>
          </div>
        </div>

        {/* ---------- Privacy footer ---------- */}
        <div className="card privacy-banner">
          <span className="privacy-banner__icon">
            <IconLock />
          </span>
          <div className="privacy-banner__body">
            <div className="privacy-banner__title">
              Your data is private and secure
            </div>
            <div className="privacy-banner__sub">
              We use industry-standard encryption to protect your personal and
              health information.
            </div>
          </div>
          <Link to="/privacy" className="privacy-banner__link">
            Learn more about privacy <IconChevronRight />
          </Link>
        </div>
      </main>
    </div>
  );
}
