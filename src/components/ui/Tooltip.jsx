export default function Tooltip({
  label,
  children,
  variant = "filled",
  side = "top",
}) {
  return (
    <span className={`tooltip-wrap tooltip-wrap--${side}`}>
      {children}
      <span className={`tooltip tooltip--${variant}`}>{label}</span>
    </span>
  );
}
