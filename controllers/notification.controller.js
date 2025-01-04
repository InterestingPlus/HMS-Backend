const Notification = require("../models/notification.model");

getAllNotifications = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (!recipientId) {
      return res.status(400).json({
        message: "Recipient ID is required.",
        status: false,
      });
    }

    const notifications = await Notification.find({ recipientId });
    notifications.reverse();

    return res.status(200).json({
      message: "Notifications fetched successfully.",
      status: true,
      data: notifications,
    });
  } catch (error) {
    console.log("Error fetching notifications!");

    return res.status(500).json({
      message: "An error occurred while fetching notifications.",
      status: false,
    });
  }
};

deleteNotification = async (req, res) => {
  try {
    const { id } = req.body;

    await Notification.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Notifications Deleted successfully.",
      status: true,
    });
  } catch (error) {
    console.log("Error deleting notifications!");

    return res.status(500).json({
      message: "An error occurred while deleting notifications.",
      status: false,
    });
  }
};

module.exports = { getAllNotifications, deleteNotification };
