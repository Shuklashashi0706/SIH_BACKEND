import express from "express";
import  {register,login,getAllUsers, deleteAllUsers, getUserById, deleteUserById} from "../../controllers/Users/loginController.js";
import { getAllLawyers,getLawyerByCaseDomain,getCaseDomain,getLocation,getLawyerByLocation, getLawyerById, getLawyerByName } from "../../controllers/Users/searchLawyerController.js";
import { getAcceptedRequests, getAllRequests, sendRequest } from "../../controllers/Users/sendRequestController.js";
const router = express.Router();

// Register and login 
router.post("/register",register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.delete("/deleteAllUsers", deleteAllUsers);
router.delete("/deleteUserById/:id", deleteUserById);

// search
router.get("/getAllLawyers",getAllLawyers);
router.post("/getLawyerById",getLawyerById);
router.post("/getLawyerByName",getLawyerByName);
router.post("/getLawyerByLocation",getLawyerByLocation);
router.post("/getLawyerByCaseDomain",getLawyerByCaseDomain);
router.get("/getCaseDomain",getCaseDomain);
router.get("/getLocation",getLocation);

//send Request
router.post("/sendRequest",sendRequest);
router.get("/getAllRequests/:userId",getAllRequests);
router.get("/getAcceptedRequests/:userId",getAcceptedRequests);

export default router ;
