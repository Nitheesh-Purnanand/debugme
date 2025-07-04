import express from "express";
import { checkauth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/update-profile", protectroute, updateProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectroute, checkauth);

export default router;
