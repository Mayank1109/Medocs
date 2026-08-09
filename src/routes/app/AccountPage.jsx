import { useEffect, useRef } from "react";
import {
  IconPencil,
  IconCamera,
  IconCalendar,
  IconClockDot,
  IconShieldBadge,
  IconPerson,
  IconPhone,
  IconDroplet,
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
  IconRuler,
  IconScale,
  IconBriefcase,
  IconMapPin,
  IconHeart,
} from "../../icons/AppIcons";
import "./ProfilePage.css";
import "./AccountPage.css";
import {
  formatDate,
  initialsOf,
  modalDisplayHandler,
  formatBytes,
  STORAGE_CAP_BYTES,
} from "../../utility/Functions";
import { useProfileActions } from "../../hooks/useProfileActions";

function joinOrNotSet(list) {
  return list && list.length > 0 ? list.join(", ") : "Not set";
}

export default function AccountPage() {
  const { profile, loading, fetchProfileHandler, uploadAvatarHandler } =
    useProfileActions();
  const avatarInputRef = useRef(null);
  useEffect(() => {
    fetchProfileHandler();
  }, []);

  if (loading || !profile.userName) {
    return <main className="main-content">Loading…</main>;
  }

  function handleAvatarClick() {
    avatarInputRef.current?.click();
  }

  const storagePct = Math.min(
    100,
    Math.round(((profile.storageUsedBytes || 0) / STORAGE_CAP_BYTES) * 100),
  );

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadAvatarHandler(file);
    e.target.value = ""; // allow re-selecting the same file later
  }

  const personalInfo = [
    {
      icon: <IconPhone />,
      label: "Phone number",
      value: profile.phone || "Not set",
    },
    {
      icon: <IconCalendar />,
      label: "Date of birth",
      value: formatDate(profile.dateOfBirth),
    },
    {
      icon: <IconPerson />,
      label: "Gender",
      value: profile.gender || "Not set",
    },
    {
      icon: <IconDroplet />,
      label: "Blood group",
      value: profile.bloodGroup || "Not set",
      info: "Used for emergency profile sharing",
    },
  ];

  const healthInfo = [
    {
      icon: <IconRuler />,
      label: "Height",
      value: profile.height ? `${profile.height} cm` : "Not set",
    },
    {
      icon: <IconScale />,
      label: "Weight",
      value: profile.weight ? `${profile.weight} kg` : "Not set",
    },
    {
      icon: <IconBriefcase />,
      label: "Occupation",
      value: profile.occupation || "Not set",
    },
    {
      icon: <IconMapPin />,
      label: "Location",
      value: profile.location || "Not set",
    },
    {
      icon: <IconInfo />,
      label: "Allergies",
      value: joinOrNotSet(profile.allergies),
    },
    {
      icon: <IconInfo />,
      label: "Chronic conditions",
      value: joinOrNotSet(profile.chronicConditions),
    },
    {
      icon: <IconInfo />,
      label: "Current medications",
      value: joinOrNotSet(profile.currentMedications),
    },
    {
      icon: <IconInfo />,
      label: "Past surgeries",
      value: joinOrNotSet(profile.pastSurgeries),
    },
  ];

  const emergencyInfo = [
    {
      icon: <IconPerson />,
      label: "Name",
      value: profile.emergencyContact?.name || "Not set",
    },
    {
      icon: <IconPhone />,
      label: "Phone",
      value: profile.emergencyContact?.phone || "Not set",
    },
    {
      icon: <IconHeart />,
      label: "Relationship",
      value: profile.emergencyContact?.relation || "Not set",
    },
  ];

  const securityRows = [
    { label: "Password", value: "•••••••••" },
    { label: "Two-factor authentication", value: "Off", stub: true },
    { label: "Active devices", value: "Not tracked yet", stub: true },
    {
      label: "Last login",
      value: profile.lastLogin ? formatDate(profile.lastLogin) : "—",
    },
  ];

  return (
    <>
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
          onClick={(e) => modalDisplayHandler(e, "EditPersonalInfo")}
        >
          <IconPencil size="1.5rem" /> Edit profile
        </button>
      </div>

      {/* ---------- Identity card ---------- */}
      <div className="card profile-hero">
        <div className="profile-hero__avatar-wrap">
          <span className="profile-hero__avatar">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" />
            ) : (
              initialsOf(profile.userName)
            )}
          </span>
          <button
            type="button"
            className="profile-hero__camera"
            aria-label="Change photo"
            onClick={handleAvatarClick}
          >
            <IconCamera />
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={handleAvatarChange}
          />
        </div>

        <div className="profile-hero__identity">
          <h2>{profile.userName}</h2>
          <p className="profile-hero__email">{profile.email}</p>
        </div>

        <div className="profile-hero__meta">
          <div className="profile-hero__meta-item">
            <span className="profile-hero__meta-label">
              <IconCalendar /> Member since
            </span>
            <span className="profile-hero__meta-value">
              {formatDate(profile.memberSince)}
            </span>
          </div>
          <div className="profile-hero__meta-item">
            <span className="profile-hero__meta-label">
              <IconClockDot /> Last login
            </span>
            <span className="profile-hero__meta-value">
              {profile.lastLogin ? formatDate(profile.lastLogin) : "—"}
            </span>
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
            {personalInfo.map((f) => (
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
            onClick={(e) => modalDisplayHandler(e, "EditPersonalInfo")}
          >
            <IconPencil size="1rem" /> Edit information
          </button>
        </div>

        <div className="card">
          <h3 className="profile-section-title">Health information</h3>
          <div className="info-rows">
            {healthInfo.map((f) => (
              <div className="info-row" key={f.label}>
                <span className="info-row__icon">{f.icon}</span>
                <span className="info-row__label">{f.label}</span>
                <span className="info-row__value">{f.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="button button--secondary account-card__cta"
            onClick={(e) => modalDisplayHandler(e, "EditHealthInfo")}
          >
            <IconPencil size="1rem" /> Edit health information
          </button>
        </div>

        <div className="card">
          <h3 className="profile-section-title">Emergency contact</h3>
          <div className="info-rows">
            {emergencyInfo.map((f) => (
              <div className="info-row" key={f.label}>
                <span className="info-row__icon">{f.icon}</span>
                <span className="info-row__label">{f.label}</span>
                <span className="info-row__value">{f.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="button button--secondary account-card__cta"
            onClick={(e) => modalDisplayHandler(e, "EditEmergencyContact")}
          >
            <IconPencil size="1rem" /> Edit emergency contact
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
              {formatBytes(profile.storageUsedBytes)} <span>/ 1 GB used</span>
            </span>
            <span className="storage-summary__pct">{storagePct}% used</span>
          </div>
          <div className="account-row__progress storage-bar">
            <div
              className="account-row__progress-fill"
              style={{ width: `${storagePct}%` }}
            />
          </div>

          <div className="storage-mini-stats">
            <div className="storage-mini-stat">
              <IconDocs />
              <div>
                <strong>{profile.documentCount ?? 0}</strong>
                <span>Documents</span>
              </div>
            </div>
            <div className="storage-mini-stat">
              <IconSparkleSmall />
              <div>
                <strong>{profile.aiAnalysesCount ?? 0}</strong>
                <span>AI analyses run</span>
              </div>
            </div>
            <div className="storage-mini-stat">
              <IconCalendar />
              <div>
                <span className="storage-mini-stat__label-only">
                  Member since
                </span>
                <strong className="storage-mini-stat__small">
                  {formatDate(profile.memberSince)}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="profile-section-title panel-header__with-icon">
            <span className="account-card__icon">
              <IconShieldBadge />
            </span>
            Security
          </h3>
          <div className="security-rows">
            {securityRows.map((r) => (
              <button type="button" className="security-row" key={r.label}>
                <span className="security-row__label">
                  {r.label}
                  {r.stub && <span className="stub-badge">Coming soon</span>}
                </span>
                <span className="security-row__value">{r.value}</span>
                <IconChevronRight />
              </button>
            ))}
          </div>
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
                  {profile.authProviders?.google
                    ? profile.email
                    : "Not connected"}
                </div>
              </div>
              <span
                className={`badge connected-row__status${
                  profile.authProviders?.google ? " badge--success" : ""
                }`}
              >
                {profile.authProviders?.google ? "Connected" : "Not connected"}
              </span>
            </div>

            <div className="connected-row">
              <span className="connected-row__logo connected-row__logo--apple">
                <IconApple />
              </span>
              <div className="connected-row__body">
                <div className="connected-row__name">
                  Apple
                  <span className="stub-badge">Coming soon</span>
                </div>
                <div className="connected-row__sub">
                  Not supported yet — no Apple auth provider configured
                </div>
              </div>
              <button
                type="button"
                className="button button--secondary button--sm"
                disabled
              >
                Connect
              </button>
            </div>
          </div>
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
      </div>

      <div className="premium-banner">
        <span className="premium-banner__icon">
          <IconCrown />
        </span>
        <div>
          <h4>You're on Premium</h4>
          <p>
            Enjoy unlimited AI analyses, advanced insights and secure storage.
          </p>
          <button type="button" className="button premium-banner__cta">
            Manage plan
          </button>
        </div>
      </div>
    </>
  );
}
