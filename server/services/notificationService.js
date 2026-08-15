const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");

function validateNotificationId(notifId) {
  if (!mongoose.Types.ObjectId.isValid(notifId)) {
    const error = new Error("Invalid notification ID");
    error.status = 400;
    throw error;
  }
}

async function listNotifications({ userId, page, limit }) {
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    Notification.find({ ownerId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Notification.countDocuments({ ownerId: userId }),
  ]);

  return {
    data: notifications,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getUnreadCount({ userId }) {
  const count = await Notification.countDocuments({
    ownerId: userId,
    read: false,
  });
  return { count };
}

async function markNotificationRead({ userId, notifId }) {
  validateNotificationId(notifId);

  const notification = await Notification.findOneAndUpdate(
    { _id: notifId, ownerId: userId },
    { read: true },
    { new: true },
  );

  if (!notification) {
    const error = new Error("Notification not found");
    error.status = 404;
    throw error;
  }

  return notification;
}

async function markAllNotificationsRead({ userId }) {
  await Notification.updateMany(
    { ownerId: userId, read: false },
    { read: true },
  );
  return true;
}

module.exports = {
  listNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
};
