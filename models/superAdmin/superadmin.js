import mongoose from "mongoose";
const superAdminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accounttype: {
    type: String,
    required: true,
  },
});

export const SuperAdminModel = mongoose.model("SuperAdmin", superAdminSchema);
