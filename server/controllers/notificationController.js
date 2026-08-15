const notificationService = require("../services/notificationService");

async function listNotifications(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);

    const result = await notificationService.listNotifications({
      userId: req.user._id,
      page,
      limit,
    });

    res.json({
      messageType: "Success",
      message: "Notifications fetched successfully!",
      ...result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to fetch notifications",
    });
  }
}

async function getUnreadCount(req, res) {
  try {
    const data = await notificationService.getUnreadCount({
      userId: req.user._id,
    });
    res.json({
      messageType: "Success",
      message: "Unread count fetched successfully!",
      data,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to fetch unread count",
    });
  }
}

async function markNotificationRead(req, res) {
  try {
    const notification = await notificationService.markNotificationRead({
      userId: req.user._id,
      notifId: req.params.id,
    });

    res.json({
      messageType: "Success",
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to update notification",
    });
  }
}

async function markAllNotificationsRead(req, res) {
  try {
    await notificationService.markAllNotificationsRead({
      userId: req.user._id,
    });

    res.json({
      messageType: "Success",
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to update notifications",
    });
  }
}

module.exports = {
  listNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
};
