import { httpService } from "../api/httpService";
import { NOTIFICATION_URI } from "../api/uriConfig";

const getNotifications = (page = 1, limit = 30) => {
  return httpService.get(NOTIFICATION_URI.LIST, { params: { page, limit } });
};

const getUnreadCount = () => {
  return httpService.get(NOTIFICATION_URI.UNREAD_COUNT);
};

const markNotificationRead = (id) => {
  return httpService.patch(NOTIFICATION_URI.MARK_READ(id));
};

const markAllNotificationsRead = () => {
  return httpService.patch(NOTIFICATION_URI.MARK_ALL_READ);
};

export {
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
};
