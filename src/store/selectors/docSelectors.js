import { createSelector } from "@reduxjs/toolkit";

// Base selectors
export const selectDocState = (state) => state.doc;
export const selectUserDocs = (state) => state.doc.userDocs;
export const selectDocPage = (state) => state.doc.page;
export const selectDocTotalPages = (state) => state.doc.totalPages;
export const selectDocLoading = (state) => state.doc.loading;
export const selectDocRefresh = (state) => state.doc.refresh;

// Derived selectors
export const selectDocPagination = createSelector(
  [selectDocPage, selectDocTotalPages],
  (page, totalPages) => ({
    page,
    totalPages,
    hasMore: page < totalPages,
  }),
);

export const selectFavoriteDocs = createSelector([selectUserDocs], (docs) =>
  docs.filter((d) => d.favorite),
);

export const selectDocsByCategory = createSelector(
  [selectUserDocs, (_, category) => category],
  (docs, category) => {
    if (!category || category === "all") return docs;
    return docs.filter((d) => d.category === category);
  },
);

export const selectDocById = createSelector(
  [selectUserDocs, (_, docId) => docId],
  (docs, docId) => docs.find((d) => d.id === docId),
);

export const selectDocLoadingState = createSelector(
  [selectDocLoading, selectDocState],
  (loading, docState) => ({
    loading,
    refresh: docState.refresh,
  }),
);
