import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthLayout from "./AuthLayout";
import {
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconShield,
  IconGoogle,
  IconArrowRight,
  IconLock as IconLockSolid,
  IconSparkle,
  IconPeople,
} from "../../icons/AuthIcons";
import { authActions } from "../../store/authSlice";
import { login, signup } from "../../services/authService";
import { useFieldValidation } from "../../hooks/useFieldValidation";
import { markSafeEntry } from "../../utility/authHistory";

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

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") !== "signup";

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validateInputHandler, validateFormHandler } = useFieldValidation();

  const hasLength = form.password.length >= 8;
  const hasNumberOrSymbol = /[0-9]|[^A-Za-z0-9]/.test(form.password);

  useEffect(() => {
    markSafeEntry();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const fieldsToCheck = isLogin
      ? { email: form.email, loginPassword: form.password }
      : { fullName: form.fullName, email: form.email, password: form.password };

    if (!validateFormHandler(fieldsToCheck)) return;

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const response = await login({
          email: form.email,
          password: form.password,
        });
        const { token, user } = response.data;
        dispatch(authActions.loginSuccess({ token, user }));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        await signup({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        });
        navigate("/auth?mode=login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      kicker={isLogin ? "Welcome back" : "Create your account"}
      heading={
        isLogin ? (
          <>
            Welcome back, take control of your{" "}
            <span className="accent">health.</span>
          </>
        ) : (
          <>
            Your health journey <span className="accent">starts here.</span>
          </>
        )
      }
      subtitle={
        isLogin
          ? "One secure place for your medical records, insights, and AI analysis."
          : "Join in less than 30 seconds."
      }
      panelExtra={
        isLogin ? (
          <div className="auth__illustration" aria-hidden="true" />
        ) : (
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
        )
      }
      title={isLogin ? "Sign in" : "Create account"}
      subtitleForm={
        isLogin
          ? "Access your account securely"
          : "Start your journey to better health"
      }
    >
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="field">
            <label className="field__label" htmlFor="fullName">
              Full name
            </label>
            <div className="field__control">
              <span className="field__icon">
                <IconUser />
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                onBlur={validateInputHandler}
                required
              />
            </div>
          </div>
        )}

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
              onBlur={validateInputHandler}
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
              placeholder={isLogin ? "••••••••" : "Create a password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={form.password}
              onChange={handleChange}
              onBlur={isLogin ? undefined : validateInputHandler}
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

        {!isLogin && (
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
        )}

        {error ? (
          <p className="auth__error" role="alert">
            {error}
          </p>
        ) : null}

        {!isLogin && (
          <div className="pw-reqs">
            <span className={`pw-req${hasLength ? " met" : ""}`}>
              <IconCheck /> At least 8 characters
            </span>
            <span className={`pw-req${hasNumberOrSymbol ? " met" : ""}`}>
              <IconCheck /> Includes a number or symbol
            </span>
          </div>
        )}

        {isLogin && (
          <div className="auth__row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="auth__link">
              Forgot password?
            </Link>
          </div>
        )}

        <button
          type="submit"
          className={`button auth__submit${loading ? " button--loading" : ""}`}
          disabled={loading}
        >
          {isLogin ? (
            <>
              Sign in <IconArrowRight style={{ height: "1.5rem" }} />
            </>
          ) : (
            <>
              Create account <IconArrowRight />
            </>
          )}
        </button>

        <div className="auth__divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={() => {
            window.location.replace(
              `${import.meta.env.VITE_API_URL || "http://localhost:7000"}/auth/google`,
            );
          }}
        >
          <IconGoogle />
          Continue with Google
        </button>
      </form>

      {isLogin && (
        <p className="auth__footer-note">
          <IconShield />
          End-to-end encrypted · HIPAA compliant
        </p>
      )}
      <p className="auth__footer-link">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={`/auth?mode=${isLogin ? "signup" : "login"}`}
          className="auth__link"
        >
          {isLogin ? "Sign up free" : "Sign in"}
        </Link>
      </p>
    </AuthLayout>
  );
}
