import express from "express"
import { checkauth, login, logout, signup,updateprofile } from "../controllers/auth.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/signup",signup)

router.get("/login",login)

router.get("/logout",logout)

router.put("/update-profile",protectroute,updateprofile)

router.get("/check",protectroute,checkauth)

export default router