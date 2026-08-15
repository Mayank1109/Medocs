/* Document utilities and constants */

export const DOCUMENTS = [
  {
    id: "doc-1",
    name: "Blood Test — June 2026",
    fileType: "PDF",
    size: "1.2 MB",
    date: "Jun 3, 2026",
    sortDate: Date.parse("2026-06-03"),
    monthGroup: "June 2026",
    category: "lab",
    aiStatus: null,
  },
  {
    id: "doc-2",
    name: "Metformin prescription — Dr. Sharma",
    fileType: "PDF",
    size: "0.4 MB",
    date: "May 28, 2026",
    sortDate: Date.parse("2026-05-28"),
    monthGroup: "June 2026",
    category: "rx",
    aiStatus: "available",
  },
  {
    id: "doc-3",
    name: "Apollo hospital invoice — Feb 2026",
    fileType: "PDF",
    size: "0.8 MB",
    date: "Feb 3, 2026",
    sortDate: Date.parse("2026-02-03"),
    monthGroup: "February 2026",
    category: "invoice",
    aiStatus: null,
  },
  {
    id: "doc-4",
    name: "Blood Test — January 2026",
    fileType: "JPG",
    size: "1.1 MB",
    date: "Jan 8, 2026",
    sortDate: Date.parse("2026-01-08"),
    monthGroup: "January 2026",
    category: "lab",
    aiStatus: "available",
  },
  {
    id: "doc-5",
    name: "Fitness certificate — Annual checkup",
    fileType: "PDF",
    size: "0.3 MB",
    date: "Jan 15, 2026",
    sortDate: Date.parse("2026-01-15"),
    monthGroup: "January 2026",
    category: "cert",
    aiStatus: null,
  },
];

export function getAccent(doc) {
  if (doc.fileType === "JPG" || doc.fileType === "PNG") return "green";
  if (doc.category === "rx") return "violet";
  if (doc.category === "cert") return "blue";
  return "red";
}
