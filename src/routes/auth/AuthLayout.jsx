import { Link } from "react-router-dom";
import "./AuthLayout.css";
import { Logo } from "../../icons/HeroIcons";

export default function AuthLayout({
  kicker,
  heading,
  subtitle,
  panelExtra,
  title,
  subtitleForm,
  children,
}) {
  return (
    <div className="auth">
      <div className="auth__panel">
        <Link to="/" className="landing__logo">
          <span className="landing__logo-icon">
            <Logo width={20} height={20} stroke="transparent" fill="white" />
          </span>
          <span className="landing__logo-name">Medocs.</span>
        </Link>
        <div className="auth__panel-content">
          <span className="auth__kicker">{kicker}</span>
          <h1 className="auth__panel-heading">{heading}</h1>
          <p className="auth__panel-subtitle">{subtitle}</p>
          {panelExtra}
        </div>

        <p className="auth__panel-footer">
          © 2026 Medocs Health. All rights reserved.
        </p>
      </div>

      <div className="auth__form-side">
        <div className="auth__form">
          <h2 className="auth__form-title">{title}</h2>
          <p className="auth__form-subtitle">{subtitleForm}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
