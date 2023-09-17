//js
import express from "express";
import  {register,getLawyerByCaseDomain,login,getAllUsers,getAllLawyers, deleteAllUsers, getUserById, deleteUserById,getLawyerByLocation} from "../../controllers/Users/loginController.js";


const router = express.Router();
// router.get("/register", registerView);


// Define the register API route
router.post("/register",register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.delete("/deleteAllUsers", deleteAllUsers);
router.delete("/deleteUserById/:id", deleteUserById);
router.get("/getAllLawyers",getAllLawyers);
router.get("/getLawyerByLocation",getLawyerByLocation);
router.get("/getLawyerByCaseDomain",getLawyerByCaseDomain);

export default router ;
