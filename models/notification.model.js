const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipientId: { type: String, required: true },
    recipientType: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    }, // Who the notification is for
    type: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
