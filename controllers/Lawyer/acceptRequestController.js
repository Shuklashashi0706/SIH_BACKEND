import { NotificationModel } from "../../models/Notification/notification.js";
import { UserModel } from "../../models/Users/user.js";

export const getAllRequests = async (req, res) => {
  try {
    const { lawyerId } = req.params;

    // Find accepted notifications for the given lawyer
    const acceptedNotifications = await NotificationModel.find({
      lawyerid: lawyerId,
    });

    if (acceptedNotifications.length === 0) {
      // No accepted notifications found for the lawyer
      return res.status(404).json({ message: 'No requests found' });
    }

    // Extract user IDs from accepted notifications
    const userIds = acceptedNotifications.map((notification) => notification.userid);

    // Find the corresponding users from the User model
    const acceptedUsers = await UserModel.find({ _id: { $in: userIds } });

    if (acceptedUsers.length === 0) {
      // No users found with acceptStatus true
      return res.status(404).json({ message: 'No users requests found' });
    }

    // Create an array to store the results with notification IDs, status, and lawyer ID
    const results = acceptedNotifications.map((notification) => ({
      notificationId: notification._id,
      lawyerId: notification.lawyerid, // Include lawyer ID
      notificationStatus: notification.acceptStatus, // Include notification status
      user: acceptedUsers.find((user) => user._id.equals(notification.userid)),
    }));

    res.status(200).json({ Requests: results });
  } catch (error) {
    console.error('Error while fetching accepted requests:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const acceptRequest = async (req, res) => {
  try {
    // Extract the authenticated lawyer's ID from the session or token
    const {lawyerId} = req.params; // Adjust this according to your authentication setup

    // Extract the notificationId from the request body
    const { notificationId } = req.body;

    // Find the notification by ID
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Check if the authenticated user is a lawyer and has the authority to accept the request
    if (notification.lawyerid.toString() !== lawyerId) {
      return res.status(401).json({ error: "Unauthorized to accept this request" });
    }

    if (notification.acceptStatus) {
      return res.status(400).json({ error: "Request already accepted" });
    }

    // Update the acceptStatus to true
    notification.acceptStatus = true;
    await notification.save();

    // You can optionally fetch the associated user's data
    const user = await UserModel.findById(notification.userid);

    res.status(200).json({ message: "Request accepted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

export const getAcceptedRequests = async (req, res) => {
  try {
    const { lawyerId } = req.params;

    // Find accepted notifications for the given lawyer
    const acceptedNotifications = await NotificationModel.find({
      lawyerid: lawyerId,
      acceptStatus: true,
    });

    if (acceptedNotifications.length === 0) {
      // No accepted notifications found for the lawyer
      return res
        .status(404)
        .json({ message: "No accepted notifications found" });
    }

    // Extract user IDs from accepted notifications
    const userIds = acceptedNotifications.map(
      (notification) => notification.userid
    );

    // Find the corresponding users from the User model
    const acceptedUsers = await UserModel.find({ _id: { $in: userIds } });

    if (acceptedUsers.length === 0) {
      // No users found with acceptStatus true
      return res.status(404).json({ message: "No accepted users found" });
    }

    res.status(200).json({ acceptedUsers });
  } catch (error) {
    console.error("Error while fetching accepted requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Find the notification by its ID and delete it
    const deletedNotification = await NotificationModel.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Request is declined" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

export const deleteAllRequests = async (req, res) => {
  try {
    // Check if there are any notifications
    const count = await NotificationModel.countDocuments();

    if (count === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    // Delete all notifications from the Notification model
    await NotificationModel.deleteMany({});

    res.status(200).json({ message: "All requests are deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};
