import express from "express";
import {
  register,
  login,
  getAllLawyers,
  addProfile,
  getLawyerById,
  deleteAllLawyers,
  deleteLawyerById,
  getProfile,
} from "../../controllers/Lawyer/loginController.js";
import { acceptRequest,getAllRequests,deleteRequest,deleteAllRequests, getAcceptedRequests } from "../../controllers/Lawyer/acceptRequestController.js";
import { sendNotification } from "../../controllers/Lawyer/sendNotification.js";
const router = express.Router();
//register and login
router.post("/register", register);
router.post("/login", login);
router.post("/addProfile",addProfile);
router.get("/getProfile/:lawyerId",getProfile);
router.get("/getAllLawyers", getAllLawyers);
router.get("/getLawyerById/:id", getLawyerById);
router.delete("/deleteAllLawyers", deleteAllLawyers);
router.delete("/deleteLawyerById/:id", deleteLawyerById);

// requests
router.get("/getAllRequests/:lawyerId", getAllRequests);
router.get("/getAcceptedRequests/:lawyerId", getAcceptedRequests);
router.patch("/acceptRequest/:lawyerId",acceptRequest)
router.delete("/deleteRequest",deleteRequest)
router.delete("/deleteAllRequest",deleteAllRequests)

//notification
router.post("/sendNotification/:lawyerId",sendNotification)

//upload doc 
// router.post("/uploadDoc/:lawyerId",uploadDoc);

export default router;
