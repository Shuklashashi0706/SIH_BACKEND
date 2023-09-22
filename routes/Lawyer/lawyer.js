//js
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

// notifications
router.get("/getAllRequests/:lawyerId", getAllRequests);
router.get("/getAcceptedRequests/:lawyerId", getAcceptedRequests);
router.patch("/acceptRequest/:lawyerId",acceptRequest)
router.delete("/deleteRequest",deleteRequest)
router.delete("/deleteAllRequest",deleteAllRequests)
export default router;
