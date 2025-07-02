import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "fullname email github linkedin leetcode profilepic solvedCount"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching public profile", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
