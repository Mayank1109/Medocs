import { DOCUMENT_CATEGORIES } from "../../data/documentCategories";

export default function DocumentCategories({ active, onSelect }) {
  return (
    <div className="doc-categories">
      {DOCUMENT_CATEGORIES.map((category) => (
        <button
          key={category.key}
          type="button"
          className={`doc-category ${active === category.key ? "active" : ""}`}
          onClick={() => onSelect(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
