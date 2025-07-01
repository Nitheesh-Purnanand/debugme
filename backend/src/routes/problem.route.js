import express from "express";
import {
  getAllProblems,
  getProblemById,
  submitCode
} from "../controllers/problem.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.post("/submit/:id", protectroute, submitCode);
router.get("/dashboard", protectroute, getUserDashboard);

export default router;
