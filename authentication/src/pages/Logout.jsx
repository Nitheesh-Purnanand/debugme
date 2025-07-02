// src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axiosInstance.post("/auth/logout"); // backend clears the cookie
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setAuthUser(null); // clear zustand state
        navigate("/login");
      }
    };

    logoutUser();
  }, []);

  return <div className="text-white p-6">Logging out...</div>;
};

export default Logout;