import mongoose from "mongoose";
import "../Users/user.js"
import "../lawyer/lawyer.js"

const notificationSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  lawyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer', // Reference to the Lawyer model
    required: true,
  },
  acceptStatus: {
    type: Boolean,
    default: false, // Default value can be changed based on your requirements
  },
});

export const NotificationModel = mongoose.model('Notification', notificationSchema);

