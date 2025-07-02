import User from "../models/user.model.js";

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("fullname email solved profilepic")
      .lean();

    const leaderboard = users
      .map(user => ({
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic || "",
        solvedCount: user.solved.length
      }))
      .sort((a, b) => b.solvedCount - a.solvedCount);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error generating leaderboard:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
