import { NotificationModel } from "../../models/Notification/notification.js";
import { LawyerModel } from "../../models/lawyer/lawyer.js";

export const sendRequest = async (req, res) => {
  try {
    // Extract the userid and lawyerid from the request body
    const { userid, lawyerid } = req.body;
    // Check if a similar request already exists in the database
    const existingRequest = await NotificationModel.findOne({
      userid,
      lawyerid,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    // Create a new Notification document and save it to the database
    const notification = new NotificationModel({ userid, lawyerid });
    await notification.save();
    res.status(201).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

export const getAcceptedRequests = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you get the user ID from request parameters

    // Find notifications where the user ID matches and acceptStatus is true
    const acceptedNotifications = await NotificationModel.find({
      userid: userId,
      acceptStatus: true,
    });

    if (acceptedNotifications.length === 0) {
      // No lawyers have accepted the user's requests
      return res
        .status(404)
        .json({ message: "No lawyers have accepted your requests" });
    }

    // Extract lawyer IDs from accepted notifications
    const lawyerIds = acceptedNotifications.map(
      (notification) => notification.lawyerid
    );

    // Find the corresponding lawyers' profiles
    const acceptedLawyers = await LawyerModel.find({ _id: { $in: lawyerIds } });

    if (acceptedLawyers.length === 0) {
      // No lawyers found for the accepted requests (unexpected scenario)
      return res
        .status(404)
        .json({ message: "No lawyers found for the accepted requests" });
    }

    // Return the profiles of accepted lawyers
    res.status(200).json({ acceptedLawyers });
  } catch (error) {
    console.error("Error while fetching accepted requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
