import mongoose from "mongoose";

// models/user.model.js

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  profilepic: String,
  github: String,
  linkedin: String,
  leetcode: String,
  solvedProblems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
    default: [],
  },
  solvedCount: {
    type: Number,
    default: 0,
  },
  recentSubmissions: [
    {
      title: String,
      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
      success: Boolean,
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });



const User = mongoose.model("User", userSchema);
export default User;
