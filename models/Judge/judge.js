import mongoose from "mongoose";
const judgeSchema = new mongoose.Schema({
  profileImage: {
    type: String,
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
  location: {
    type: String,
  },
  caseDomain: {
    type: String,
    required: true,
  },
  yearOfJoining: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
  },
});

export const JudgeModel = mongoose.model("Judge", judgeSchema);
