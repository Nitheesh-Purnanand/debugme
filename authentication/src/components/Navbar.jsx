import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black text-white relative shadow-sm">
      {/* Left - Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-xl font-bold tracking-wide group-hover:text-cyan-400 transition">
          DebugMe
        </span>
      </Link>

      {/* Center - Authenticated Navigation Links */}
      {authUser && (
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-10 text-sm font-semibold">
          <Link
            to="/dashboard"
            className="hover:text-cyan-400 transition duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/problems"
            className="hover:text-cyan-400 transition duration-200"
          >
            Problems
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-cyan-400 transition duration-200"
          >
            Leaderboard
          </Link>
          <Link
            to="/discuss"
            className="hover:text-cyan-400 transition duration-200"
          >
            Discuss
          </Link>
        </div>
      )}

      {/* Right - Profile if logged in, else Login & Signup */}
      <div className="flex items-center gap-4">
        {authUser ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 text-sm font-semibold hover:text-cyan-400 transition"
          >
            <img
              src={authUser?.profilepic || "/default.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-cyan-400"
            />
            <span>{authUser.fullname.split(" ")[0]}</span>
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-sm font-semibold hover:text-cyan-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
