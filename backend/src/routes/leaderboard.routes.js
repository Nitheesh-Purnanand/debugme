// routes/leaderboard.route.js
import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "fullname email profilepic solvedProblems").lean(); // 🔁 FIXED FIELD

    const leaderboard = users.map((user) => ({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic || "/default.png",
      solvedCount: user.solvedProblems?.length || 0, // 🔁 FIXED HERE TOO
    }));

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Leaderboard route error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
