// Document-related constants
export const DOCUMENT_PAGE_LIMIT = 20;

// MIME type to extension mapping
export const MIME_TO_EXT = {
  "application/pdf": "PDF",
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
};

export const MONTH_FORMAT = { month: "long", year: "numeric" };
export const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" };

// Upload modal configuration
export const ACCEPTED_TYPES = ["pdf", "doc", "docx", "jpg", "png"];
export const MAX_SIZE_MB = 10;

export const CATEGORIES = [
  { key: "lab", label: "Lab report" },
  { key: "rx", label: "Prescription" },
  { key: "invoice", label: "Invoice" },
  { key: "misc", label: "Other" },
];
