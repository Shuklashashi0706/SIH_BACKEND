//js
import express from "express";
import  {register,login,getAllLawyers,getLawyerById,deleteAllLawyers,deleteLawyerById} from "../../controllers/Lawyer/loginController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/getAllLawyers", getAllLawyers);
router.get("/getLawyerById/:id", getLawyerById);
router.delete("/deleteAllLawyers", deleteAllLawyers);
router.delete("/deleteLawyerById/:id", deleteLawyerById);

export default router ;
