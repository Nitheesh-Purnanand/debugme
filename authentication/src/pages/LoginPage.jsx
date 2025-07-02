import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isloggingin } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid === true) login(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white items-center -mt-[60px]">
      {/* Left section */}
      <div className="flex flex-col justify-center items-center px-6 py-10 space-y-6 bg-zinc-950">
        <h1 className="text-3xl font-bold text-cyan-400">Welcome to DebugMe</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          {[
            { title: "Fix & Debug", desc: "Spot and fix bugs in real code snippets." },
            { title: "Live Code", desc: "Code directly inside the Monaco editor and run test cases." },
            { title: "Real-Time", desc: "Play in real-time with friends." },
            { title: "Compete", desc: "Track your leaderboard rank and improve your streak." },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 p-5 rounded-xl shadow hover:shadow-cyan-500/20 transition"
            >
              <h3 className="text-cyan-400 font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-zinc-400 mt-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-[#111827] rounded-xl p-8 shadow-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Sign In to DebugMe</h2>
            <p className="text-sm text-zinc-400">Start debugging smarter</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="text-cyan-400 size-5" />
                </span>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="text-cyan-400 size-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-cyan-400 size-5" />
                  ) : (
                    <Eye className="text-cyan-400 size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
  type="submit"
  className="btn w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg transition"
  disabled={isloggingin}
>
  {isloggingin ? (
    <span className="flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>Signing in...</span>
    </span>
  ) : (
    "Sign In"
  )}
</button>

          </form>

          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
