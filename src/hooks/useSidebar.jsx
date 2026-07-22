import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(null);

const COLLAPSE_BREAKPOINT = 1100;
const MOBILE_BREAKPOINT = 768;

export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    () => window.innerWidth < COLLAPSE_BREAKPOINT,
  );
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setCollapsed(true); // mobile bottom bar is always icon-only
        return;
      }
      if (manualOverride) return;
      setCollapsed(width < COLLAPSE_BREAKPOINT);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // run once on mount too, in case the app starts at mobile width
    return () => window.removeEventListener("resize", handleResize);
  }, [manualOverride]);

  function toggleCollapsed() {
    if (window.innerWidth < MOBILE_BREAKPOINT) return; // no-op on mobile
    setManualOverride(true);
    setCollapsed((c) => !c);
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
  return ctx;
}
