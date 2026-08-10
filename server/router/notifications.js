const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const Notification = require("../models/notificationModel");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find({ ownerId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments({ ownerId: req.user._id }),
    ]);

    res.json({
      messageType: "Success",
      message: "Notifications fetched successfully!",
      data: notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "Failed to fetch notifications",
    });
  }
});

router.get("/unread-count", async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      ownerId: req.user._id,
      read: false,
    });
    res.json({
      messageType: "Success",
      message: "Unread count fetched successfully!",
      data: { count },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "Failed to fetch unread count",
    });
  }
});

router.patch("/:id/read", async (req, res) => {
  try {
    const notifId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(notifId)) {
      return res.status(400).json({
        messageType: "Error",
        message: "Invalid notification ID",
      });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: notifId, ownerId: req.user._id },
      { read: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({
        messageType: "Error",
        message: "Notification not found",
      });
    }

    res.json({
      messageType: "Success",
      message: "Notification marked as read",
      data: notification,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "Failed to update notification",
    });
  }
});

router.patch("/read-all", async (req, res) => {
  try {
    await Notification.updateMany(
      { ownerId: req.user._id, read: false },
      { read: true },
    );

    res.json({
      messageType: "Success",
      message: "All notifications marked as read",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "Failed to update notifications",
    });
  }
});

module.exports = router;
