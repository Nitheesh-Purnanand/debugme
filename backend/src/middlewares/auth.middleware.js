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


export const protectroute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorised - No Token Provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorised - No Token Provided"});
        }
        const user = await User.findById(decoded.userid).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user = user
        next()
    } catch (error){
        console.log("error in the auth middleware",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}