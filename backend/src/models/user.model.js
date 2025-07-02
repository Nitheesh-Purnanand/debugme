import mongoose, { mongo } from "mongoose";
// models/user.model.js
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  profilepic: String,
  github: String,
  linkedin: String,
  leetcode: String,
  solved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

const User = mongoose.model("User",userSchema)
export default User