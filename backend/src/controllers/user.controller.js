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
      .select("fullname github linkedin leetcode solvedProblems createdAt")
      .populate("solvedProblems", "title difficulty");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      fullname: user.fullname,
      github: user.github,
      linkedin: user.linkedin,
      leetcode: user.leetcode,
      joinedAt: user.createdAt,
      solvedProblems: user.solvedProblems,
    });
  } catch (err) {
    console.error("Public Profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
