import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, issignup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4 -mt-[60px]">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-zinc-400 text-sm">
            Get started with your free account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-cyan-400 size-5" />
              <input
                type="text"
                className="w-full bg-black text-white border border-zinc-700 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-cyan-400 size-5" />
              <input
                type="email"
                className="w-full bg-black text-white border border-zinc-700 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-cyan-400 size-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-black text-white border border-zinc-700 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-cyan-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-md transition"
            disabled={issignup}
          >
            {issignup ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
