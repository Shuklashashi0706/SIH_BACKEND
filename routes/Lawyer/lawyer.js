//js
import express from "express";
import {
  register,
  login,
  getAllLawyers,
  getLawyerById,
  deleteAllLawyers,
  deleteLawyerById,
} from "../../controllers/Lawyer/loginController.js";
import { acceptRequest, getAllRequests,deleteRequest,deleteAllRequests } from "../../controllers/Lawyer/acceptRequestController.js";
const router = express.Router();
//register and login
router.post("/register", register);
router.post("/login", login);
router.get("/getAllLawyers", getAllLawyers);
router.get("/getLawyerById/:id", getLawyerById);
router.delete("/deleteAllLawyers", deleteAllLawyers);
router.delete("/deleteLawyerById/:id", deleteLawyerById);

// notifications
router.get("/getAllRequests", getAllRequests);
router.patch("/acceptRequest",acceptRequest)
router.delete("/deleteRequest",deleteRequest)
router.delete("/deleteAllRequest",deleteAllRequests)
export default router;
