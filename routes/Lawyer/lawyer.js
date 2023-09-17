//js
import express from "express";
import  {registerView,loginView } from "../../controllers/Lawyer/loginController.js";

const router = express.Router();
router.get("/register", registerView);
router.get("/login", loginView);

export default router ;
