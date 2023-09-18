import express from "express";
import  {register,login,getAllUsers, deleteAllUsers, getUserById, deleteUserById} from "../../controllers/Users/loginController.js";
import { getAllLawyers,getLawyerByCaseDomain,getLawyerByLocation } from "../../controllers/Users/searchLawyerController.js";
import { sendRequest } from "../../controllers/Users/sendRequestController.js";
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
router.post("/getLawyerByLocation",getLawyerByLocation);
router.post("/getLawyerByCaseDomain",getLawyerByCaseDomain);

//send Request
router.post("/sendRequest",sendRequest);

export default router ;
