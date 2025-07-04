import express from "express";
import { getPublicProfile, getUserDashboard } from "../controllers/user.controller.js";
import {requireAuth} from "../middlewares/auth.middleware.js"

const router = express.Router();

// DASHBOARD route
// routes/user.route.js
router.get("/profile/:id", getPublicProfile);

router.get("/dashboard", requireAuth, getUserDashboard);

export default router;
