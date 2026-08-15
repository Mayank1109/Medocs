// Document utilities (mapping, formatting)
import { MIME_TO_EXT, MONTH_FORMAT, DATE_FORMAT } from "../constants/document";
import { formatSize } from "./formatting";

export function mapDocument(doc) {
  const date = new Date(doc.documentDate);
  return {
    id: doc._id,
    name: doc.fileName,
    category: doc.category,
    sortDate: date.getTime(),
    monthGroup: date.toLocaleDateString("en-US", MONTH_FORMAT),
    date: date.toLocaleDateString("en-US", DATE_FORMAT),
    fileType:
      MIME_TO_EXT[doc.fileType] ||
      doc.fileType?.split("/").pop().toUpperCase() ||
      "FILE",
    size: formatSize(doc.fileSize),
    description: doc.fileDescription,
    storagePath: doc.storagePath,
    favorite: !!doc.favorite,
    aiStatus: null, // no per-doc AI-analysis tracking yet — every doc shows "No AI analysis" until wired
  };
}
