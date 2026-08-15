import { Link } from "react-router-dom";
import "./LandingPage.css";
import {
  Logo,
  IconActivity,
  IconChat,
  IconDocs,
  IconGear,
  IconGrid,
  IconLock,
  IconPeople,
  IconSend,
  IconShield,
  IconShare,
  IconSparkle,
  IconDevices,
} from "../icons/HeroIcons";
import HeroStat from "../components/hero/HeroStat";
import MockupStat from "../components/hero/MockupStat";
import TimelineItem from "../components/hero/TimelineItem";
import SuggestionItem from "../components/hero/SuggestionItem";
import TrustbarItem from "../components/hero/TrustbarItem";
import {
  HERO_STATS,
  HERO_MOCKUP_STATS,
  HERO_TIMELINE,
  HERO_SUGGESTIONS,
  TRUSTBAR_ITEMS,
  TOP_NAV_LINKS,
  TOP_NAV_CTA,
  FOOTER_LINKS,
  SIDEBAR_ITEMS,
  LANDING_COPY,
  FEATURES,
  STEPS,
} from "../data/landingPageContent";

export default function LandingPage() {
  return (
    <div className="landing" data-theme="dark">
      <header className="landing__navbar">
        <div
          className="container flex"
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" className="landing__logo">
            <span className="landing__logo-icon">
              <Logo width={20} height={20} stroke="transparent" fill="white" />
            </span>
            <span className="landing__logo-name">Medocs.</span>
          </Link>

          <nav className="landing__nav-actions">
            {TOP_NAV_LINKS.map((item) => (
              <a key={item.id} href={item.href} className="landing__nav-link">
                {item.label}
              </a>
            ))}
            <Link to={TOP_NAV_CTA.to} className="button">
              {TOP_NAV_CTA.label}
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero__top">
            <div className="hero__inner">
              <span className="hero__kicker">{LANDING_COPY.heroKicker}</span>
              <h1 className="hero__title">
                {LANDING_COPY.heroTitleBefore}
                <span className="accent">{LANDING_COPY.heroTitleAccent}</span>
              </h1>
              <p className="hero__subtitle">{LANDING_COPY.heroSubtitle}</p>

              <div className="hero__stats">
                {HERO_STATS.map((stat) => (
                  <HeroStat
                    key={stat.id}
                    label={stat.label}
                    value={stat.value}
                    delta={stat.delta}
                  />
                ))}
              </div>

              <div className="hero__insight">
                <span className="hero__insight-dot" />
                <p className="hero__insight-text">
                  <strong>{LANDING_COPY.heroInsightStrong}</strong>{" "}
                  {LANDING_COPY.heroInsightText}
                </p>
                <Link to="/login" className="hero__insight-link">
                  {LANDING_COPY.heroInsightLink}
                </Link>
              </div>

              <div className="hero__cta">
                <Link to="/login" className="button">
                  {LANDING_COPY.heroCtaPrimary}
                </Link>
                <span className="hero__cta-note">
                  {LANDING_COPY.heroCtaNote}
                </span>
              </div>
              <p className="hero__fineprint">
                <IconShield />
                {LANDING_COPY.heroFineprint}
              </p>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="hero__mockup-outer">
                <div className="hero__mockup">
                  <div className="hero__mockup-sidebar">
                    <div className="hero__mockup-logo">
                      <span className="hero__mockup-logo-icon">+</span>
                      <span className="hero__mockup-logo-name">Medocs.</span>
                    </div>
                    {SIDEBAR_ITEMS.map((item) => (
                      <div
                        className={`hero__mockup-nav-item${item.active ? " active" : ""}`}
                        key={item.id}
                      >
                        {item.icon}
                        {item.label}
                      </div>
                    ))}

                    <div className="hero__mockup-user">
                      <span className="hero__mockup-avatar">U</span>
                      <span className="hero__mockup-username">
                        {LANDING_COPY.heroUsername}
                      </span>
                    </div>
                  </div>

                  <div className="hero__mockup-main">
                    <div className="hero__mockup-topbar">
                      <div>
                        <div className="hero__mockup-greeting">
                          {LANDING_COPY.heroGreeting}
                        </div>
                        <div className="hero__mockup-subgreeting">
                          {LANDING_COPY.heroSubgreeting}
                        </div>
                      </div>
                      <span className="hero__mockup-upload">
                        {LANDING_COPY.heroUpload}
                      </span>
                    </div>

                    <div className="hero__mockup-stats">
                      {HERO_MOCKUP_STATS.map((stat) => (
                        <MockupStat
                          key={stat.id}
                          label={stat.label}
                          value={stat.value}
                          delta={stat.delta}
                          deltaClass={stat.deltaClass}
                        />
                      ))}
                    </div>

                    <div className="hero__mockup-panels">
                      <div className="hero__mockup-panel">
                        <div className="hero__mockup-panel-header">
                          <span className="hero__mockup-panel-title">
                            {LANDING_COPY.timelineTitle}
                          </span>
                          <span className="hero__mockup-panel-link">
                            {LANDING_COPY.timelineLink}
                          </span>
                        </div>

                        {HERO_TIMELINE.map((item) => (
                          <TimelineItem
                            key={item.id}
                            date={item.date}
                            dotClass={item.dotClass}
                            name={item.name}
                            sub={item.sub}
                            badgeText={item.badgeText}
                            badgeClass={item.badgeClass}
                          />
                        ))}
                      </div>

                      <div className="hero__mockup-panel hero__mockup-panel--ai">
                        <div className="hero__mockup-panel-header">
                          <span className="hero__mockup-panel-title">
                            {LANDING_COPY.askAiTitle}
                          </span>
                          <span className="hero__mockup-panel-link">
                            {LANDING_COPY.askAiLink}
                          </span>
                        </div>
                        {HERO_SUGGESTIONS.map((suggestion) => (
                          <SuggestionItem
                            key={suggestion.id}
                            text={suggestion.text}
                          />
                        ))}
                        <div className="hero__mockup-input-row">
                          <span className="hero__mockup-input">
                            {LANDING_COPY.askAnything}
                          </span>
                          <span className="hero__mockup-send">
                            <IconSend />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trustbar">
        <div className="container">
          <p className="trustbar__title">{LANDING_COPY.trustbarTitle}</p>
          <div className="trustbar__row">
            {TRUSTBAR_ITEMS.map((item) => (
              <TrustbarItem key={item.id} icon={item.icon} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="features__header">
            <span className="features__eyebrow">
              {LANDING_COPY.featuresEyebrow}
            </span>
            <h2 className="features__title">{LANDING_COPY.featuresTitle}</h2>
            <p className="features__subtitle">
              {LANDING_COPY.featuresSubtitle}
            </p>
          </div>

          <div className="features__grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.id}>
                <div
                  className={`feature-card__icon feature-card__icon--${f.tone}`}
                >
                  {f.icon}
                </div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="steps" id="steps">
        <div className="container">
          <h2 className="steps__title">{LANDING_COPY.stepsTitle}</h2>

          <div className="steps__grid">
            {STEPS.map((s, i) => (
              <div className="step" key={s.id}>
                <span className="step__number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-banner">
            <h2 className="cta-banner__title">{LANDING_COPY.ctaBannerTitle}</h2>
            <p className="cta-banner__subtitle">
              {LANDING_COPY.ctaBannerSubtitle}
            </p>
            <div className="cta-banner__actions">
              <Link to="/login" className="button">
                {LANDING_COPY.ctaBannerPrimary}
              </Link>
              <Link to="/login" className="button button--secondary">
                {LANDING_COPY.ctaBannerSecondary}
              </Link>
            </div>
            <p className="cta-banner__fineprint">
              {LANDING_COPY.ctaBannerFineprint}
            </p>
          </div>
        </div>
      </section>

      <footer className="landing__footer">
        <div
          className="container flex"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span className="landing__footer-copy">
            {LANDING_COPY.footerCopy}
          </span>
          <div className="landing__footer-links">
            {FOOTER_LINKS.map((item) =>
              item.to ? (
                <Link key={item.id} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.id} href={item.href}>
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
