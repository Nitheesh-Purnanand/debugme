import express from "express";
import { getAllProblems, getProblemById, submitCode } from "../controllers/problem.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.post("/:id/submit", protectroute, submitCode);

export default router;
