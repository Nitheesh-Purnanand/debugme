import User from "../models/user.model.js";


export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().select("fullname solvedProblems").lean();

    const formatted = users
      .map((u) => ({
        _id: u._id,
        fullname: u.fullname,
        solvedCount: u.solvedProblems?.length || 0,
      }))
      .sort((a, b) => b.solvedCount - a.solvedCount);

    res.json(formatted);
  } catch (err) {
    console.error("🔥 Leaderboard Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
