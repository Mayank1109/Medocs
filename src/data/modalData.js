const ACCEPTED_TYPES = ["pdf", "doc", "docx", "jpg", "png"];
const MAX_SIZE_MB = 10;

const CATEGORIES = [
  { key: "lab", label: "Lab report" },
  { key: "rx", label: "Prescription" },
  { key: "invoice", label: "Invoice" },
  { key: "misc", label: "Other" },
];

export { ACCEPTED_TYPES, CATEGORIES, MAX_SIZE_MB };
