import { IconStar } from "../../icons/AppIcons";
import { DOCUMENT_CATEGORIES } from "../../data/documentCategories";

export default function DocumentCategories({ active = "all", onSelect }) {
  return (
    <>
      <button
        type="button"
        className={`sidebar__nav-item sidebar__category-item${
          active === "favorites" ? " active" : ""
        }`}
        onClick={() => onSelect?.("favorites")}
      >
        <IconStar filled={active === "favorites"} />
        <span className="sidebar__category-label">Favorites</span>
      </button>

      <span className="sidebar__section-label">Categories</span>
      {DOCUMENT_CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <button
            type="button"
            key={category.key}
            className={`sidebar__nav-item sidebar__category-item${
              active === category.key ? " active" : ""
            }`}
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
