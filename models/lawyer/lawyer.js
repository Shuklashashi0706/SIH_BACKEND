import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default:"https://cdn3.vectorstock.com/i/1000x1000/50/27/lawyer-icon-male-user-person-profile-avatar-vector-20905027.jpg",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  achievements: {
    type: [String], // You can store multiple achievements as an array of strings
  },
  qualifications: {
    type: [String], // You can store multiple qualifications as an array of strings
  },
  caseDomain: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  yearOfJoining: {
    type: Number,
    required: true,
  },
});

export const LawyerModel = mongoose.model("Lawyer", lawyerSchema);
