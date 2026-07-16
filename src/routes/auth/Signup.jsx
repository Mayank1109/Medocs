import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import {
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconGoogle,
  IconArrowRight,
  IconLock as IconLockSolid,
  IconSparkle,
  IconPeople,
} from "../../icons/AuthIcons";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FEATURES = [
  {
    icon: <IconLockSolid />,
    title: "Secure",
    desc: "Your data is encrypted from day one.",
  },
  {
    icon: <IconSparkle />,
    title: "Smart",
    desc: "AI reads and explains your reports.",
  },
  {
    icon: <IconPeople />,
    title: "Private",
    desc: "Share only when you choose.",
  },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasLength = form.password.length >= 8;
  const hasNumberOrSymbol = /[0-9]|[^A-Za-z0-9]/.test(form.password);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!hasLength || !hasNumberOrSymbol) {
      setError(
        "Password must be at least 8 characters and include a number or symbol.",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 600);
  }

  return (
    <AuthLayout
      kicker="Create your account"
      heading={
        <>
          Your health journey <span className="accent">starts here.</span>
        </>
      }
      subtitle="Join in less than 30 seconds."
      panelExtra={
        <div className="auth__features">
          {FEATURES.map((f) => (
            <div className="auth__feature" key={f.title}>
              <span className="auth__feature-icon">{f.icon}</span>
              <div>
                <div className="auth__feature-title">{f.title}</div>
                <div className="auth__feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      }
      title="Create account"
      subtitleForm="Start your journey to better health"
    >
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="field__label" htmlFor="name">
            Full name
          </label>
          <div className="field__control">
            <span className="field__icon">
              <IconUser />
            </span>
            <input
              id="name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            Email
          </label>
          <div className="field__control">
            <span className="field__icon">
              <IconMail />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="password">
            Password
          </label>
          <div className="field__control">
            <span className="field__icon">
              <IconLock />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="field__toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <div className="field__control">
            <span className="field__icon">
              <IconLock />
            </span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error ? (
          <p className="auth__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="pw-reqs">
          <span className={`pw-req${hasLength ? " met" : ""}`}>
            <IconCheck /> At least 8 characters
          </span>
          <span className={`pw-req${hasNumberOrSymbol ? " met" : ""}`}>
            <IconCheck /> Includes a number or symbol
          </span>
        </div>

        <button
          type="submit"
          className="button auth__submit"
          disabled={loading}
        >
          {loading ? (
            "Creating account..."
          ) : (
            <>
              Create account <IconArrowRight />
            </>
          )}
        </button>

        <div className="auth__divider">
          <span>or</span>
        </div>

        <button type="button" className="google-btn">
          <IconGoogle />
          Continue with Google
        </button>
      </form>

      <p className="auth__footer-link">
        Already have an account?{" "}
        <Link to="/login" className="auth__link">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
