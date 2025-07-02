import { json } from "express"
import { generateToken } from "../lib/utlis.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req,res)=>{
    const {fullname,email,password} = req.body
    try{
        if(!fullname || !email || !password)return res.status(400).json({message:"All fields are required"})
        
        if(password.length <6 )return res.status(400).json({message:"Password must be atleast 6 characters"})

        const user = await User.findOne({email})
        if(user)return res.status(400).json({message:"User already exists"})
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newuser = new User({
    fullname,
    email,
    password: hashedPassword,
    profilepic: `/icons/${Math.floor(Math.random() * 6 + 1)}.png`,
})

        if(newuser){
            //generates jwt token
            generateToken(newuser._id,res)
            await newuser.save();
            res.status(200).json({_id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.email,
                password:newuser.password})
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    }catch(error){
        console.log("Error in the Signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user)return res.status(400).json({message:"Invalid Credentials"})
        const ispasswordcorrect = await bcrypt.compare(password,user.password)
    if(!ispasswordcorrect){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    generateToken(user._id,res)
    res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilepic:user.profilepic,
    })
    } catch (error) {
        console.log("Error in login Controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // protectroute must set req.userId
    if (!user) return res.status(404).json({ message: "User not found" });

    const { github, linkedin, leetcode, profilepic } = req.body;

    user.github = github;
    user.linkedin = linkedin;
    user.leetcode = leetcode;
    user.profilepic = profilepic;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error in updateProfile:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkauth = async (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in logged out controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}