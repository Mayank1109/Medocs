export default function TrustbarItem({ icon, text }) {
  return (
    <div className="trustbar__item">
      {icon}
      <span>{text}</span>
    </div>
  );
}
