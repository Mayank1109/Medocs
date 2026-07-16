import {
  IconActivity,
  IconChat,
  IconDevices,
  IconDocs,
  IconGear,
  IconLock,
  IconPeople,
  IconShare,
  IconSparkle,
  IconTrend,
  IconGrid,
} from "../icons/HeroIcons";

const TOP_NAV_LINKS = [
  { id: "nav-features", label: "Features", href: "#features" },
  { id: "nav-steps", label: "How it works", href: "#steps" },
  { id: "nav-security", label: "Security", href: "#features" },
  { id: "nav-pricing", label: "Pricing", href: "#pricing" },
];

const TOP_NAV_CTA = {
  id: "nav-get-started",
  label: "Get started",
  to: "/login",
};

const FOOTER_LINKS = [
  { id: "footer-features", label: "Features", href: "#features" },
  { id: "footer-signin", label: "Sign in", to: "/login" },
];

const SIDEBAR_ITEMS = [
  {
    id: "sidebar-dashboard",
    label: "Dashboard",
    icon: <IconGrid />,
    active: true,
  },
  {
    id: "sidebar-documents",
    label: "Documents",
    icon: <IconDocs />,
    active: false,
  },
  {
    id: "sidebar-vitals",
    label: "Vitals",
    icon: <IconActivity />,
    active: false,
  },
  {
    id: "sidebar-ai-assistant",
    label: "AI Assistant",
    icon: <IconChat />,
    active: false,
  },
  {
    id: "sidebar-share",
    label: "Share Profile",
    icon: <IconShare />,
    active: false,
  },
  {
    id: "sidebar-settings",
    label: "Settings",
    icon: <IconGear />,
    active: false,
  },
];

const HERO_STATS = [
  {
    id: "hero-stat-blood-pressure",
    label: "Blood pressure",
    value: "118/76",
    delta: "↓ Improved from 130/84",
  },
  {
    id: "hero-stat-blood-sugar",
    label: "Blood sugar",
    value: (
      <>
        98 <span>mg/dL</span>
      </>
    ),
    delta: "↓ Down from 112",
  },
  {
    id: "hero-stat-documents",
    label: "Documents",
    value: (
      <>
        14 <span>files</span>
      </>
    ),
    delta: "+ 2 this month",
  },
];

const HERO_MOCKUP_STATS = [
  {
    id: "mockup-stat-blood-pressure",
    label: "Blood pressure",
    value: (
      <>
        118<span>/76</span>
      </>
    ),
    delta: "↓ Improved from 130/84",
    deltaClass: "",
  },
  {
    id: "mockup-stat-blood-sugar",
    label: "Blood sugar",
    value: (
      <>
        98<span> mg/dL</span>
      </>
    ),
    delta: "↓ Down from 112",
    deltaClass: "",
  },
  {
    id: "mockup-stat-weight",
    label: "Weight",
    value: (
      <>
        72<span> kg</span>
      </>
    ),
    delta: "— No change",
    deltaClass: "hero__mockup-stat-delta--neutral",
  },
  {
    id: "mockup-stat-documents",
    label: "Documents",
    value: (
      <>
        14<span> files</span>
      </>
    ),
    delta: "+ 2 added this month",
    deltaClass: "hero__mockup-stat-delta--warn",
  },
];

const HERO_TIMELINE = [
  {
    id: "timeline-jun-2026",
    date: "Jun 2026",
    dotClass: "hero__mockup-timeline-dot--green",
    name: "Blood test — full panel",
    sub: "HbA1c, lipid, thyroid",
    badgeText: "All values improved",
    badgeClass: "hero__mockup-badge--green",
  },
  {
    id: "timeline-apr-2026",
    date: "Apr 2026",
    dotClass: "hero__mockup-timeline-dot--blue",
    name: "Prescription — Dr. Sharma",
    sub: "Metformin 500mg, Vit D3",
    badgeText: "Active medication",
    badgeClass: "hero__mockup-badge--blue",
  },
  {
    id: "timeline-feb-2026",
    date: "Feb 2026",
    dotClass: "hero__mockup-timeline-dot--amber",
    name: "Blood pressure check",
    sub: "Reading: 130/84 mmHg",
    badgeText: "Was elevated — now improved",
    badgeClass: "hero__mockup-badge--amber",
  },
];

const HERO_SUGGESTIONS = [
  {
    id: "suggestion-blood-report",
    text: "Summarise my latest blood report",
  },
  {
    id: "suggestion-vitals",
    text: "Are my vitals improving?",
  },
  {
    id: "suggestion-prescription",
    text: "What does my prescription mean?",
  },
];

const TRUSTBAR_ITEMS = [
  {
    id: "trustbar-secure-private",
    icon: <IconLock />,
    text: "Secure & Private",
  },
  {
    id: "trustbar-ai-insights",
    icon: <IconSparkle />,
    text: "AI-Powered Insights",
  },
  {
    id: "trustbar-share-doctors",
    icon: <IconPeople />,
    text: "Share with Doctors",
  },
  {
    id: "trustbar-access-anywhere",
    icon: <IconDevices />,
    text: "Access Anywhere",
  },
];

const LANDING_COPY = {
  heroKicker: "AI-powered health records",
  heroTitleBefore: "Your health, ",
  heroTitleAccent: "understood.",
  heroSubtitle:
    "Store, analyse and share your medical records — with an AI that actually reads them for you.",
  heroInsightStrong: "AI insight:",
  heroInsightText:
    "Your LDL improved 9% since January. Dietary changes are working — keep it up.",
  heroInsightLink: "Ask AI →",
  heroCtaPrimary: "Get started for free →",
  heroCtaNote: "No credit card required",
  heroFineprint: "End-to-end encrypted · HIPAA compliant",
  heroUsername: "User",
  heroGreeting: "Good morning, User",
  heroSubgreeting: "Here's your health summary for today · Jun 7, 2026",
  heroUpload: "↑ Upload document",
  timelineTitle: "Health timeline",
  timelineLink: "View all",
  askAiTitle: "Ask AI",
  askAiLink: "Full chat",
  askAnything: "Ask anything…",
  trustbarTitle: "Trusted by patients. Loved by doctors.",
  featuresEyebrow: "What Medocs does",
  featuresTitle: "Everything your health records need",
  featuresSubtitle:
    "One place for all your documents, vitals, and AI-powered insights.",
  stepsTitle: "Up and running in 3 steps",
  ctaBannerTitle: "Your health, finally organised.",
  ctaBannerSubtitle:
    "Join thousands of people who've stopped losing track of their medical records.",
  ctaBannerPrimary: "Get started free",
  ctaBannerSecondary: "Sign in",
  ctaBannerFineprint: "🔒 End-to-end encrypted · No credit card required",
  footerCopy: "© 2026 Medocs Health · HIPAA compliant · End-to-end encrypted",
};

const FEATURES = [
  {
    id: "feature-store-organise",
    icon: <IconDocs />,
    tone: "teal",
    title: "Store & organise",
    desc: "Upload lab reports, prescriptions, invoices and certificates — all in one secure place.",
  },
  {
    id: "feature-ai-reads",
    icon: <IconChat />,
    tone: "blue",
    title: "AI reads your reports",
    desc: "Ask plain-English questions about any report. Medocs explains what your values mean.",
  },
  {
    id: "feature-track-vitals",
    icon: <IconTrend />,
    tone: "teal",
    title: "Track vitals over time",
    desc: "See if your blood pressure, sugar, or cholesterol is improving — with clear trend indicators.",
  },
  {
    id: "feature-share-doctors",
    icon: <IconShare />,
    tone: "amber",
    title: "Share with doctors",
    desc: "Generate a secure share link for any doctor, anywhere. No app required on their end.",
  },
  {
    id: "feature-encrypted",
    icon: <IconLock />,
    tone: "blue",
    title: "End-to-end encrypted",
    desc: "Your medical data is encrypted at rest and in transit. HIPAA-compliant by design.",
  },
  {
    id: "feature-works-everywhere",
    icon: <IconDevices />,
    tone: "teal",
    title: "Works everywhere",
    desc: "Access your records from any device. Mobile app coming soon.",
  },
];

const STEPS = [
  {
    id: "step-create-account",
    title: "Create your account",
    desc: "Sign up in 30 seconds. No credit card required. Your data is encrypted from day one.",
  },
  {
    id: "step-upload-documents",
    title: "Upload your documents",
    desc: "Drag and drop your lab reports, prescriptions, or scans. Medocs organises them automatically.",
  },
  {
    id: "step-ask-ai-anything",
    title: "Ask AI anything",
    desc: "Chat with your health records. Get plain-English explanations, trend analysis, and insights.",
  },
];

export {
  HERO_STATS,
  HERO_MOCKUP_STATS,
  HERO_TIMELINE,
  HERO_SUGGESTIONS,
  TRUSTBAR_ITEMS,
  TOP_NAV_LINKS,
  TOP_NAV_CTA,
  FOOTER_LINKS,
  SIDEBAR_ITEMS,
  LANDING_COPY,
  FEATURES,
  STEPS,
};
