/**
 * Skeleton rows matching the shape of a real document row (icon block +
 * two text lines + status pill), shown while the real list is loading.
 * `count` controls how many placeholder rows render.
 */
export default function DocumentListSkeleton({ count = 3 }) {
  return (
    <div className="docs-list">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-row" key={i}>
          <div className="skeleton-row__icon" />
          <div className="skeleton-row__lines">
            <div className="skeleton__line skeleton__line--med" />
            <div className="skeleton__line skeleton__line--short" />
          </div>
          <div className="skeleton-row__pill" />
        </div>
      ))}
    </div>
  );
}
