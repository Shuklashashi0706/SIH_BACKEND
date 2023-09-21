import mongoose from "mongoose";
import "../Judge/judge.js"
import "../Users/user.js"
import "../lawyer/lawyer.js"
const caseSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, // Assuming user IDs are stored as ObjectIds
    ref: 'User', // Reference to the User model
    required: true,
  },
  lawyerid: {
    type: mongoose.Schema.Types.ObjectId, // Assuming lawyer IDs are stored as ObjectIds
    ref: 'Lawyer', // Reference to the Lawyer model
    required: true,
  },
  judgeid: {
    type: mongoose.Schema.Types.ObjectId, // Assuming judge IDs are stored as ObjectIds
    ref: 'Judge', // Reference to the Judge model (if applicable)
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const CaseModel = mongoose.model('Case', caseSchema);

module.exports = CaseModel;
