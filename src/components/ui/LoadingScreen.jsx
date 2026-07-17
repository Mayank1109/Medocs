export default function LoadingScreen({
  message = "Loading your health records…",
}) {
  return (
    <div className="loading-screen">
      <div className="loading-screen__logo">
        <span className="sidebar__logo-icon">
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
        </span>
        <span className="loading-screen__logo-name">Medocs.</span>
      </div>
      <div className="spinner" />
      <p className="loading-screen__message">{message}</p>
    </div>
  );
}
