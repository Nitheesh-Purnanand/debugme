import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Pencil, Github, Linkedin, Code } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const ProfilePage = () => {
  const { authUser, logout,setAuthUser } = useAuthStore();
  const navigate = useNavigate();

  const [github, setGithub] = useState(authUser?.github || "");
  const [linkedin, setLinkedin] = useState(authUser?.linkedin || "");
  const [leetcode, setLeetcode] = useState(authUser?.leetcode || "");
  const [profilePic, setProfilePic] = useState(authUser?.profilepic || "/default.png");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
const handleProfileUpdate = async () => {
  try {
    const res = await axiosInstance.post("/auth/update-profile", {
      github,
      linkedin,
      leetcode,
      profilepic: profilePic,
    });

    toast.success("Profile updated successfully!");
    setAuthUser({
      ...authUser,
      github,
      linkedin,
      leetcode,
      profilepic: profilePic,
    });

  } catch (err) {
    console.error("Update Error", err);
    toast.error("Failed to update profile.");
  }
};


  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-cyan-400 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400">
              {authUser?.fullname}
            </h2>
            <p className="text-zinc-400 text-sm">{authUser?.email}</p>
            <button
              className="mt-2 text-xs text-cyan-500 hover:underline flex items-center gap-1"
              onClick={() => {
                const newIndex = Math.floor(Math.random() * 6) + 1;
                setProfilePic(`/src/icons/${newIndex}.png`);
              }}
            >
              <Pencil size={14} /> Change Profile Picture
            </button>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="mt-8 space-y-6">
          {/* GitHub */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Github size={16} /> GitHub
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="https://github.com/your-username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="https://linkedin.com/in/your-profile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          {/* LeetCode */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Code size={16} /> LeetCode
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              placeholder="https://leetcode.com/your-username"
              value={leetcode}
              onChange={(e) => setLeetcode(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 items-center">
          <button
            onClick={handleProfileUpdate}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 px-6 rounded-lg shadow transition-all"
          >
             Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all"
          >
             Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
