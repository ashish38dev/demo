import express from "express";
import { AdminLogin, AdminSchedule, DashBoard } from "../controller/adminController.js";
import { authenticateToken } from "../middleWare/tokenValidator.js";
const router = express.Router()

//admin login
router.post("/login", AdminLogin)
router.post("/schedule", AdminSchedule)
router.get("/dashboard", authenticateToken ,DashBoard)


export default router