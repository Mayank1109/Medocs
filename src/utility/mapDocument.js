const MONTH_FORMAT = { month: "long", year: "numeric" };
const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" };

const MIME_TO_EXT = {
  "application/pdf": "PDF",
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
};

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

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
    aiStatus: null, // no per-doc AI-analysis tracking yet — every doc shows "No AI analysis" until wired
  };
}
