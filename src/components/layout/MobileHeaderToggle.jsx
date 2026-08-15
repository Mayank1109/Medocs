import { useSidebar } from "../../context/SidebarProvider";
import { IconMenu } from "../../icons/AppIcons"; // add this icon if missing, see below

export default function MobileHeaderToggle() {
  const { toggleCollapsed } = useSidebar();

  return (
    <button
      type="button"
      className="mobile-header-toggle"
      onClick={toggleCollapsed}
      aria-label="Toggle sidebar"
    >
      <IconMenu />
    </button>
  );
}
