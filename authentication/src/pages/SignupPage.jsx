import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
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
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-zinc-400 text-sm">
              Get started with your free account
            </p>
          </div>
        </div>
        {/* Form */}
        <div className="w-full max-w-md bg-[#111827] p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="text-cyan-400 size-5" />
              </span>
              <input
                type="text"
                className="input input-bordered w-full pl-10 bg-black border-zinc-700 text-white"
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
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="text-cyan-400 size-5" />
              </span>
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-black border-zinc-700 text-white"
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
                className="input input-bordered w-full pl-10 bg-black border-zinc-700 text-white"
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
            className="btn w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
            disabled={issignup}
          >
            {issignup ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
</div>  
        {/* Footer */}
        <p className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
