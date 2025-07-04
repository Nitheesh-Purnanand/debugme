import jwt, { decode } from "jsonwebtoken"
import User from "../models/user.model.js"

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Unauthorized: No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userid).select("-password"); // fix here
    if (!user) return res.status(401).json({ error: "Unauthorized: Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


export const protectroute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      console.log("❌ No token found in cookies");
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userid) {
      console.log("❌ Invalid token structure");
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userid).select("-password");
    if (!user) {
      console.log("❌ User not found with ID:", decoded.userid);
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Attach to req
    req.user = user;
    req.userId = user._id; // ✅ This line is the key fix!

    console.log("✅ Authenticated user:", req.userId);

    next();
  } catch (error) {
    console.log("🔥 Error in auth middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};