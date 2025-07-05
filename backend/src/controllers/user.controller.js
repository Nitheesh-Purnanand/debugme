import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";

export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "fullname email profilepic solvedCount recentSubmissions createdAt"
    );

    const dashboardData = {
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
      joinedAt: user.createdAt,
      solvedCount: user.solvedCount,
      recentSubmissions: user.recentSubmissions || [],
    };

    res.json(dashboardData);
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// controllers/user.controller.js
export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("fullname github linkedin leetcode profilepic solvedProblems createdAt")
      .populate("solvedProblems", "_id") // optional if you want problem IDs
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const solvedCount = user.solvedProblems?.length || 0;

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      github: user.github,
      linkedin: user.linkedin,
      leetcode: user.leetcode,
      profilepic: user.profilepic,
      joinedAt: user.createdAt,
      solvedProblems: user.solvedProblems || [],
      solvedCount, // 💡 add this explicitly
    });
  } catch (err) {
    console.error("❌ Public Profile Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

