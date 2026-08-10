import { useState, useCallback } from "react";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationService";
import { useToast } from "./useToast";

export function useNotificationActions() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      if (response.data.messageType !== "Success") {
        throw new Error(
          response.data.message || "Failed to load notifications",
        );
      }
      setNotifications(response.data.data);
    } catch (err) {
      toast.error("Load failed", "Could not load notifications.");
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markReadHandler = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      // silent — marking read is low-stakes, no need to interrupt with a toast
    }
  };

  const markAllReadHandler = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      toast.error("Failed", "Could not mark all as read.");
    }
  };

  return {
    notifications,
    loading,
    fetchNotifications,
    markReadHandler,
    markAllReadHandler,
  };
}
