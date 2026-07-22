/*=============== ICONS ===============*/
/* Small inline icons so this component has zero extra dependencies.
   Swap for lucide-react (or whatever you're using elsewhere) if you'd
   rather keep icons consistent with the rest of the app. */

function BaseIcon({ children, strokeWidth = 2, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function DocumentBase({ children, strokeWidth = 1.8 }) {
  return (
    <BaseIcon strokeWidth={strokeWidth}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      {children}
    </BaseIcon>
  );
}

function IconDocs() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconDevices() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="14" height="10" rx="1" />
      <path d="M8 21h4" />
      <rect x="17" y="8" width="6" height="12" rx="1" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
      <circle cx="18" cy="9" r="2.5" />
      <path d="M16 21v-1a5 5 0 0 0-1.3-3.4" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04z" />
    </svg>
  );
}

function Logo({
  width = 28,
  height = 28,
  marginLeft,
  stroke = "transparent",
  fill = "white",
  className,
  ...props
}) {
  return (
    <svg
      className={className}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 387 371"
      enableBackground="new 0 0 387 371"
      style={{ marginLeft: marginLeft || "0" }}
      {...props}
    >
      <path
        fill={stroke}
        opacity="1.000000"
        stroke="none"
        d="
M182.000000,372.000000 
	C121.333344,372.000000 61.166687,372.000000 1.000024,372.000000 
	C1.000016,248.333359 1.000016,124.666733 1.000008,1.000074 
	C129.999939,1.000049 258.999878,1.000049 387.999878,1.000025 
	C387.999908,124.666588 387.999908,248.333176 387.999939,371.999878 
	C319.500000,372.000000 251.000000,372.000000 182.000000,372.000000 
M198.712158,218.219208 
	C190.401535,224.602264 182.447083,231.536041 173.676636,237.208130 
	C165.475357,242.512146 161.946152,248.667709 162.851868,258.745270 
	C163.929749,270.738556 163.105667,282.902740 163.105667,295.053162 
	C184.981628,295.053162 206.350586,295.053162 227.664307,295.053162 
	C227.664307,262.015442 227.664307,229.314224 227.664307,195.915802 
	C217.876328,203.459412 208.578018,210.625610 198.712158,218.219208 
M81.077705,181.499985 
	C81.077705,192.433746 81.077705,203.367523 81.077705,214.434311 
	C114.339874,214.434311 147.113983,214.434311 180.556656,214.434311 
	C178.863754,212.204895 177.587311,210.502731 176.288956,208.817444 
	C164.615234,193.664688 152.233597,178.992554 141.514404,163.192474 
	C134.628662,153.042923 127.037117,147.988724 114.666954,149.899445 
	C108.815247,150.803314 102.708176,150.053848 96.716805,150.053665 
	C91.614098,150.053497 86.511391,150.053635 81.077705,150.053635 
	C81.077705,160.593979 81.077705,170.546967 81.077705,181.499985 
M309.922516,176.500000 
	C309.922516,167.746170 309.922516,158.992355 309.922516,150.401703 
	C276.519897,150.401703 243.842361,150.401703 210.699234,150.401703 
	C211.440445,151.523682 211.841614,152.223190 212.329391,152.855911 
	C227.374969,172.371841 242.484497,191.839005 257.414642,211.442780 
	C259.377655,214.020294 261.415924,214.834869 264.520844,214.801819 
	C278.347260,214.654526 292.176117,214.748505 306.004059,214.725296 
	C307.261902,214.723190 308.519409,214.507690 309.919220,214.378143 
	C309.919220,201.812302 309.919220,189.656158 309.922516,176.500000 
M192.375336,143.863998 
	C203.183716,135.540878 213.927521,127.131447 224.850128,118.961029 
	C227.295166,117.132095 228.020538,115.208710 227.970474,112.294830 
	C227.801773,102.475105 227.906921,92.650673 227.907196,82.828041 
	C227.907349,77.549416 227.907227,72.270790 227.907227,66.929192 
	C206.082214,66.929192 184.833054,66.929192 163.368698,66.929192 
	C163.368698,99.958656 163.368698,132.767151 163.368698,166.211700 
	C173.172943,158.649078 182.486465,151.464996 192.375336,143.863998 
z"
      />
      <path
        fill={fill}
        opacity="1.000000"
        stroke="none"
        d="
M198.995941,218.005508 
	C208.578018,210.625610 217.876328,203.459412 227.664307,195.915802 
	C227.664307,229.314224 227.664307,262.015442 227.664307,295.053162 
	C206.350586,295.053162 184.981628,295.053162 163.105667,295.053162 
	C163.105667,282.902740 163.929749,270.738556 162.851868,258.745270 
	C161.946152,248.667709 165.475357,242.512146 173.676636,237.208130 
	C182.447083,231.536041 190.401535,224.602264 198.995941,218.005508 
z"
      />
      <path
        fill={fill}
        opacity="1.000000"
        stroke="none"
        d="
M81.077705,180.999969 
	C81.077705,170.546967 81.077705,160.593979 81.077705,150.053635 
	C86.511391,150.053635 91.614098,150.053497 96.716805,150.053665 
	C102.708176,150.053848 108.815247,150.803314 114.666954,149.899445 
	C127.037117,147.988724 134.628662,153.042923 141.514404,163.192474 
	C152.233597,178.992554 164.615234,193.664688 176.288956,208.817444 
	C177.587311,210.502731 178.863754,212.204895 180.556656,214.434311 
	C147.113983,214.434311 114.339874,214.434311 81.077705,214.434311 
	C81.077705,203.367523 81.077705,192.433746 81.077705,180.999969 
z"
      />
      <path
        fill={fill}
        opacity="1.000000"
        stroke="none"
        d="
M309.920868,177.000000 
	C309.919220,189.656158 309.919220,201.812302 309.919220,214.378143 
	C308.519409,214.507690 307.261902,214.723190 306.004059,214.725296 
	C292.176117,214.748505 278.347260,214.654526 264.520844,214.801819 
	C261.415924,214.834869 259.377655,214.020294 257.414642,211.442780 
	C242.484497,191.839005 227.374969,172.371841 212.329391,152.855911 
	C211.841614,152.223190 211.440445,151.523682 210.699234,150.401703 
	C243.842361,150.401703 276.519897,150.401703 309.922516,150.401703 
	C309.922516,158.992355 309.922516,167.746170 309.920868,177.000000 
z"
      />
      <path
        fill={fill}
        opacity="1.000000"
        stroke="none"
        d="
M192.087662,144.072449 
	C182.486465,151.464996 173.172943,158.649078 163.368698,166.211700 
	C163.368698,132.767151 163.368698,99.958656 163.368698,66.929192 
	C184.833054,66.929192 206.082214,66.929192 227.907227,66.929192 
	C227.907227,72.270790 227.907349,77.549416 227.907196,82.828041 
	C227.906921,92.650673 227.801773,102.475105 227.970474,112.294830 
	C228.020538,115.208710 227.295166,117.132095 224.850128,118.961029 
	C213.927521,127.131447 203.183716,135.540878 192.087662,144.072449 
z"
      />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconUpload() {
  return (
    <BaseIcon>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </BaseIcon>
  );
}

function IconArrowRight() {
  return (
    <BaseIcon>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </BaseIcon>
  );
}

function IconSend() {
  return (
    <BaseIcon>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </BaseIcon>
  );
}

function IconBell() {
  return (
    <BaseIcon>
      <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </BaseIcon>
  );
}

function IconSun() {
  return (
    <BaseIcon>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </BaseIcon>
  );
}

function IconChevronDown() {
  return (
    <BaseIcon>
      <path d="M6 9l6 6 6-6" />
    </BaseIcon>
  );
}

function IconChevronRight() {
  return (
    <BaseIcon>
      <path d="M9 6l6 6-6 6" />
    </BaseIcon>
  );
}

function IconChevronLeft() {
  return (
    <BaseIcon>
      <path d="M15 6l-6 6 6 6" />
    </BaseIcon>
  );
}

function IconCalendar() {
  return (
    <BaseIcon>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </BaseIcon>
  );
}

function IconTrendUp() {
  return (
    <BaseIcon>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 6h6v6" />
    </BaseIcon>
  );
}

function IconFolder() {
  return (
    <BaseIcon>
      <path d="M3 6.5a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </BaseIcon>
  );
}

function IconFilePdf() {
  return <DocumentBase strokeWidth={1.8} />;
}

function IconFileImage() {
  return (
    <DocumentBase strokeWidth={1.8}>
      <circle cx="10.5" cy="13.5" r="1.4" />
      <path d="M8 18l2.5-2.8 2 2 2.5-3.2 2 4" />
    </DocumentBase>
  );
}

function IconCheckCircle() {
  return (
    <BaseIcon>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.2 12.3l2.5 2.5 5.1-5.6" />
    </BaseIcon>
  );
}

function IconClockDot() {
  return (
    <BaseIcon>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

function IconAlertTriangle() {
  return (
    <BaseIcon>
      <path d="M12 3.2 L21.5 20 H2.5 Z" />
      <path d="M12 9.5v4.5" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

function UploadIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 7.5L12 4L15.5 7.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 16.5V18.5C4.5 19.6046 5.39543 20.5 6.5 20.5H17.5C18.6046 20.5 19.5 19.6046 19.5 18.5V16.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLogOut() {
  return (
    <BaseIcon>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </BaseIcon>
  );
}

export {
  Logo,
  IconDocs,
  IconChat,
  IconSparkle,
  IconPeople,
  IconGrid,
  IconGear,
  IconActivity,
  IconUpload,
  IconArrowRight,
  IconSend,
  IconBell,
  IconSun,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconCalendar,
  IconTrend,
  IconTrendUp,
  IconShare,
  IconLock,
  IconDevices,
  IconShield,
  IconFolder,
  IconFilePdf,
  IconFileImage,
  IconCheckCircle,
  IconClockDot,
  IconAlertTriangle,
  UploadIcon,
  IconLogOut,
};
