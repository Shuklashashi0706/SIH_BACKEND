import express from "express";
import { login, register} from "../../controllers/superAdmin/loginController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login", login);

// router.get("/getAllsuperAdmins", getAllsuperAdmins);
// router.get("/getsuperAdminById/:superAdminId", getsuperAdminById);
// router.patch("/addProfile/:superAdminId", addProfile);
// router.get("/getProfile/:superAdminId",getProfile);
// router.delete("/deletesuperAdminById/:superAdminId",deletesuperAdminById);
// router.delete("/deleteAllsuperAdmins",deleteAllsuperAdmins);

export default router ;