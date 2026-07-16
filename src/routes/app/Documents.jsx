import { useState, useMemo } from "react";
import Sidebar from "../../components/layout/Sidebar";
import DocumentCategories from "../../components/documents/DocumentCategories";
import DocumentRow from "../../components/documents/DocumentRow";
import {
  IconUpload,
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconListView,
  IconGridView,
  IconInboxCheck,
} from "../../icons/AppIcons";
import { DOCUMENTS, getAccent } from "../../data/documents";
import "./Documents.css";

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [view, setView] = useState("list");
  const [starred, setStarred] = useState({});

  const totalCount = DOCUMENTS.length;
  const aiAvailableCount = DOCUMENTS.filter(
    (d) => d.aiStatus === "available",
  ).length;

  const groups = useMemo(() => {
    let filtered = DOCUMENTS.filter((d) => {
      const matchesCategory =
        activeCategory === "all" || d.category === activeCategory;
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    filtered = [...filtered].sort((a, b) =>
      sortNewestFirst ? b.sortDate - a.sortDate : a.sortDate - b.sortDate,
    );

    const byGroup = new Map();
    filtered.forEach((doc) => {
      if (!byGroup.has(doc.monthGroup)) byGroup.set(doc.monthGroup, []);
      byGroup.get(doc.monthGroup).push(doc);
    });
    return Array.from(byGroup.entries());
  }, [activeCategory, search, sortNewestFirst]);

  function toggleStar(id) {
    setStarred((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="app-shell">
      <Sidebar>
        <DocumentCategories
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </Sidebar>

      <main className="main-content">
        <div className="page-header">
          <div>
            <h1 style={{ margin: "0rem 0rem 1rem", textAlign: "left" }}>
              Documents
            </h1>
            <p className="page-header__subtitle">
              {totalCount} documents
              {aiAvailableCount > 0 && (
                <>
                  {" "}
                  ·{" "}
                  <span className="text-warning">
                    {aiAvailableCount} optional AI analyses available
                  </span>
                </>
              )}
            </p>
          </div>
          <button type="button" className="button doc-header__button">
            <IconUpload />
            Upload document
          </button>
        </div>

        <div className="docs-toolbar">
          <div className="docs-toolbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Search documents…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="docs-toolbar__btn"
            onClick={() => setSortNewestFirst((v) => !v)}
          >
            Sort: {sortNewestFirst ? "Newest first" : "Oldest first"}
            <IconChevronDown />
          </button>

          <button type="button" className="docs-toolbar__btn">
            <IconFilter />
            Filter
            <IconChevronDown />
          </button>

          <div className="docs-toolbar__view-toggle">
            <button
              type="button"
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <IconListView />
            </button>
            <button
              type="button"
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              <IconGridView />
            </button>
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="docs-empty">No documents match your search.</div>
        ) : (
          groups.map(([monthLabel, docs]) => (
            <div className="docs-group" key={monthLabel}>
              <h2 className="docs-group__title">{monthLabel}</h2>

              <div className={view === "grid" ? "docs-grid" : "docs-list"}>
                {docs.map((doc) => (
                  <DocumentRow
                    key={doc.id}
                    doc={doc}
                    view={view}
                    isStarred={!!starred[doc.id]}
                    onToggleStar={toggleStar}
                    getAccent={getAccent}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        <div className="docs-end">
          <IconInboxCheck />
          <div>
            <div className="docs-end__title">You've reached the end</div>
            <div className="docs-end__sub">No more documents to show</div>
          </div>
        </div>
      </main>
    </div>
  );
}
