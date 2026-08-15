// Date and number formatting utilities
export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatBytes(bytes) {
  if (!bytes) return "0 MB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function initialsOf(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
