import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../services/notificationService";
import { useSidebar } from "../../hooks/useSidebar";

export default function AppLayout() {
  const { sidebarContent } = useSidebar();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    async function checkUnread() {
      try {
        const response = await getUnreadCount();
        setHasUnread(response.data.data.count > 0);
      } catch {
        // silent — not critical if this fails
      }
    }
    checkUnread();
  }, []);

  return (
    <div className="app-shell">
      <Sidebar hasUnreadNotifications={hasUnread}>{sidebarContent}</Sidebar>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
