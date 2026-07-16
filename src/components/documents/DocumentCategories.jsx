import { DOCUMENT_CATEGORIES } from "../../data/documentCategories";

/**
 * Category filter list for the Documents page sidebar. Passed as
 * children into <Sidebar> so it renders between the main nav and the
 * Notifications/Settings section — other pages just render <Sidebar />
 * without this and get the plain nav.
 */
export default function DocumentCategories({ active = "all", onSelect }) {
  return (
    <>
      <span className="sidebar__section-label">Categories</span>
      {DOCUMENT_CATEGORIES.map((category) => {
        const Icon = category.icon;

        return (
          <button
            type="button"
            key={category.key}
            className={`sidebar__nav-item sidebar__category-item${active === category.key ? " active" : ""}`}
            onClick={() => onSelect?.(category.key)}
          >
            <Icon />
            <span className="sidebar__category-label">{category.label}</span>
            <span className="sidebar__category-count">{category.count}</span>
          </button>
        );
      })}
    </>
  );
}
