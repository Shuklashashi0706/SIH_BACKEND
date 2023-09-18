import { NotificationModel } from "../../models/Notification/notification.js";

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
