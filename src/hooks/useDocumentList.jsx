import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getDocuments } from "../services/documentService";
import { docActions } from "../store/docSlice";
import { mapDocument } from "../utility/mapDocument";

const PAGE_LIMIT = 20;

export function useDocumentList() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const fetchPage = useCallback(
    async ({ page = 1, category, append = false }) => {
      dispatch(docActions.setLoading(true));
      setError("");
      try {
        const isFavorites = category === "favorites";
        const categoryParam =
          category && category !== "all" && !isFavorites ? category : undefined;

        const response = await getDocuments(
          page,
          PAGE_LIMIT,
          categoryParam,
          isFavorites || undefined,
        );
        const { data, pagination } = response.data;
        const mapped = data.map(mapDocument);

        dispatch(
          (append ? docActions.appendDocs : docActions.setDocs)({
            docs: mapped,
            page: pagination.page,
            totalPages: pagination.totalPages,
          }),
        );
      } catch (err) {
        setError("Could not load documents. Try again later.");
      } finally {
        dispatch(docActions.setLoading(false));
      }
    },
    [dispatch],
  );

  return { fetchPage, error };
}
