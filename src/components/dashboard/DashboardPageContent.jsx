const AI_SUMMARY_ITEMS = [
  { text: "Blood pressure is stable", tone: "good" },
  { text: "Blood sugar is within range", tone: "good" },
  { text: "LDL cholesterol improved by 9%", tone: "good" },
  { text: "1 recommendation available", tone: "warn" },
];

const TIMELINE = [
  {
    date: "Jun 7\n2026",
    dot: "green",
    name: "Blood test — full panel",
    sub: "Haemoglobin, lipid, thyroid and more",
    badge: { text: "✓ All values improved", tone: "success" },
    docTone: "success",
  },
  {
    date: "Apr 28\n2026",
    dot: "blue",
    name: "Prescription — Dr. Sharma",
    sub: "Metformin 500mg, Vitamin D3",
    badge: { text: "◷ Active medication", tone: "blue" },
    docTone: "info",
  },
  {
    date: "Feb 15\n2026",
    dot: "amber",
    name: "Blood pressure check",
    sub: "Reading: 130/84 mmHg",
    badge: { text: "⚠ Was elevated — now improved", tone: "amber" },
    docTone: "warn",
  },
];

export { AI_SUMMARY_ITEMS, TIMELINE };
