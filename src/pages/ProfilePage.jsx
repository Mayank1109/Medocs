import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import {
  IconPencil,
  IconCamera,
  IconCalendar,
  IconPerson,
  IconShieldBadge,
  IconBriefcase,
  IconMapPin,
  IconRuler,
  IconScale,
  IconDroplet,
  IconHeart,
  IconTrendUp,
  IconClockDot,
  IconChevronRight,
  IconDocs,
  IconSparkleSmall,
  IconCrown,
  IconLightbulb,
  IconFilePdf,
} from "../icons/AppIcons";
import "./ProfilePage.css";

const TABS = [
  "Personal Information",
  "Health Information",
  "Emergency Contact",
  "Preferences",
  "Security",
];

const PERSONAL_FIELDS = [
  { icon: <IconPerson />, label: "Full name", value: "Mayank Chauhan" },
  { icon: <IconCalendar />, label: "Date of birth", value: "12 March 2000" },
  { icon: <IconPerson />, label: "Gender", value: "Male" },
  { icon: <IconDroplet />, label: "Blood group", value: "B+" },
  { icon: <IconRuler />, label: "Height", value: "5' 9\" (175 cm)" },
  { icon: <IconScale />, label: "Weight", value: "68 kg" },
  { icon: <IconBriefcase />, label: "Occupation", value: "Software Engineer" },
  { icon: <IconMapPin />, label: "Location", value: "Bangalore, India" },
];

const HEALTH_STATS = [
  {
    icon: <IconHeart />,
    tone: "red",
    value: "72",
    unit: "bpm",
    label: "Resting Heart Rate",
    status: "Normal",
  },
  {
    icon: <IconDroplet />,
    tone: "red",
    value: "118/76",
    unit: "mmHg",
    label: "Blood Pressure",
    status: "Normal",
  },
  {
    icon: <IconScale />,
    tone: "amber",
    value: "68",
    unit: "kg",
    label: "Weight",
    status: "Normal",
  },
  {
    icon: <IconTrendUp />,
    tone: "green",
    value: "Good",
    unit: "",
    label: "Overall Health",
    status: "Excellent",
  },
];

const ACCOUNT_ROWS = [
  { icon: <IconDocs />, label: "Total documents", value: "14" },
  { icon: <IconSparkleSmall />, label: "AI analyses available", value: "2" },
  {
    icon: <IconRuler />,
    label: "Storage used",
    value: "42% (420 MB / 1 GB)",
    progress: 42,
  },
];

const ACTIVITY = [
  {
    icon: <IconFilePdf />,
    title: "Uploaded Blood Test — June 2026.pdf",
    date: "3 Jun 2026",
  },
  {
    icon: <IconSparkleSmall />,
    title: "AI analysis generated for Metformin prescription.pdf",
    date: "28 May 2026",
  },
  {
    icon: <IconPencil />,
    title: "Updated health information",
    date: "20 May 2026",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 style={{ margin: "0rem 0rem 1rem 0rem", textAlign: "left" }}>
            My Profile
          </h1>
          <p className="page-header__subtitle">
            Manage your personal details and health information
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
              <IconCalendar /> Date of birth
            </span>
            <span className="profile-hero__meta-value">12 Mar 2000</span>
          </div>
          <div className="profile-hero__meta-item">
            <span className="profile-hero__meta-label">
              <IconPerson /> Gender
            </span>
            <span className="profile-hero__meta-value">Male</span>
          </div>
          <div className="profile-hero__meta-item">
            <span className="profile-hero__meta-label">
              <IconShieldBadge /> Member since
            </span>
            <span className="profile-hero__meta-value">15 Jan 2025</span>
          </div>
        </div>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="profile-tabs">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            className={`profile-tabs__item${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== "Personal Information" ? (
        <div className="card profile-tab-placeholder">
          <p>
            The &ldquo;{activeTab}&rdquo; tab isn't built out yet — only
            Personal Information has real content so far.
          </p>
        </div>
      ) : (
        <div className="profile-grid">
          {/* ---------- Left column ---------- */}
          <div className="profile-grid__main">
            <div className="card">
              <h3 className="profile-section-title">Personal details</h3>
              <div className="profile-fields">
                {PERSONAL_FIELDS.map((f) => (
                  <div className="profile-field" key={f.label}>
                    <span className="profile-field__icon">{f.icon}</span>
                    <div>
                      <div className="profile-field__label">{f.label}</div>
                      <div className="profile-field__value">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="panel-header">
                <div>
                  <h3 className="profile-section-title">Health summary</h3>
                  <p className="profile-section-subtitle">
                    Your key health highlights
                  </p>
                </div>
                <Link
                  to="/vitals"
                  className="button button--secondary button--sm"
                >
                  View all vitals
                </Link>
              </div>

              <div className="health-stats-grid">
                {HEALTH_STATS.map((s) => (
                  <div className="health-stat-card" key={s.label}>
                    <span
                      className={`health-stat-card__icon health-stat-card__icon--${s.tone}`}
                    >
                      {s.icon}
                    </span>
                    <div className="health-stat-card__value">
                      {s.value}
                      {s.unit && <span> {s.unit}</span>}
                    </div>
                    <div className="health-stat-card__label">{s.label}</div>
                    <div className="health-stat-card__status">{s.status}</div>
                  </div>
                ))}
              </div>

              <p className="profile-updated-note">
                <IconClockDot /> Last updated: 3 Jun 2026
              </p>
            </div>
          </div>

          {/* ---------- Right column ---------- */}
          <div className="profile-grid__side">
            <div className="card">
              <h3 className="profile-section-title">Account overview</h3>
              <div className="account-rows">
                {ACCOUNT_ROWS.map((r) => (
                  <div className="account-row" key={r.label}>
                    <span className="account-row__icon">{r.icon}</span>
                    <div className="account-row__body">
                      <div className="account-row__top">
                        <span className="account-row__label">{r.label}</span>
                        <span className="account-row__value">{r.value}</span>
                      </div>
                      {r.progress != null && (
                        <div className="account-row__progress">
                          <div
                            className="account-row__progress-fill"
                            style={{ width: `${r.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <IconChevronRight />
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-banner">
              <span className="premium-banner__icon">
                <IconCrown />
              </span>
              <div>
                <h4>You're on Premium</h4>
                <p>
                  Enjoy unlimited AI analyses, advanced insights and secure
                  storage.
                </p>
                <button type="button" className="button premium-banner__cta">
                  Manage plan
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="profile-section-title">Recent activity</h3>
              <div className="activity-rows">
                {ACTIVITY.map((a) => (
                  <div className="activity-row" key={a.title}>
                    <span className="activity-row__icon">{a.icon}</span>
                    <div className="activity-row__body">
                      <div className="activity-row__title">{a.title}</div>
                      <div className="activity-row__date">{a.date}</div>
                    </div>
                    <IconChevronRight />
                  </div>
                ))}
              </div>
              <Link to="/activity" className="profile-view-all-link">
                View all activity
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Health insights ---------- */}
      <div className="card insights-card">
        <div className="panel-header__with-icon insights-card__header">
          <span className="insights-card__icon">
            <IconTrendUp />
          </span>
          <div>
            <h3 className="profile-section-title">Health insights</h3>
            <p className="profile-section-subtitle">
              AI-powered insights from your data
            </p>
          </div>
        </div>

        <div className="insight-banner">
          <span className="insight-banner__icon">
            <IconLightbulb />
          </span>
          <div className="insight-banner__body">
            <div className="insight-banner__title">
              Great job! Your vitals are within normal range.
            </div>
            <div className="insight-banner__sub">
              Keep maintaining your active lifestyle and balanced diet.
            </div>
          </div>
          <Link
            to="/ai-assistant"
            className="button button--secondary insight-banner__cta"
          >
            Ask AI about my health
          </Link>
        </div>
      </div>
    </>
  );
}
