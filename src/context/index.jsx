/**
 * Compound Provider Component
 * Centralized location for all app-level context providers
 * Replaces scattered provider imports and makes App.jsx cleaner
 */

import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { SidebarProvider } from "./SidebarProvider";
import { OptionsProvider } from "./OptionsProvider";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SidebarProvider>
          <OptionsProvider>{children}</OptionsProvider>
        </SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

// Also export individual providers for tree-shaking and modularity
export { ThemeProvider, useTheme } from "./ThemeProvider";
export { ToastProvider, ToastContext } from "./ToastProvider";
export { SidebarProvider, useSidebar } from "./SidebarProvider";
export { OptionsProvider, useOptions } from "./OptionsProvider";
