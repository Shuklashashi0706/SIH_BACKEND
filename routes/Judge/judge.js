import express from "express";
import { register,login, getAllJudges, getJudgeById, addProfile, getProfile, deleteJudgeById, deleteAllJudges } from "../../controllers/Judge/loginController.js";
const router = express.Router();
router.post("/register",register);
router.post("/login", login);
router.get("/getAllJudges", getAllJudges);
router.get("/getJudgeById/:judgeId", getJudgeById);
router.patch("/addProfile/:judgeId", addProfile);
router.get("/getProfile/:judgeId",getProfile);
router.delete("/deleteJudgeById/:judgeId",deleteJudgeById);
router.delete("/deleteAllJudges",deleteAllJudges);

export default router ;
