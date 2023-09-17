//js
import express from "express";
import  {register,login,getAllUsers, deleteAllUsers, getUserById, deleteUserById} from "../../controllers/Users/loginController.js";

const router = express.Router();
// router.get("/register", registerView);


// Define the register API route
router.post("/register",register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.delete("/deleteAllUsers", deleteAllUsers);
router.delete("/deleteUserById/:id", deleteUserById);

export default router ;
