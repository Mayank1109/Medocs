import {
  IconFolderColored,
  IconFlask,
  IconPill,
  IconReceipt,
  IconAward,
  IconArchive,
} from "../icons/AppIcons";

export const DOCUMENT_CATEGORIES = [
  { key: "all", label: "All files", count: 14, icon: IconFolderColored },
  { key: "lab", label: "Lab reports", count: 6, icon: IconFlask },
  { key: "rx", label: "Prescriptions", count: 4, icon: IconPill },
  { key: "invoice", label: "Invoices", count: 2, icon: IconReceipt },
  { key: "cert", label: "Certificates", count: 1, icon: IconAward },
  { key: "misc", label: "Miscellaneous", count: 1, icon: IconArchive },
];
