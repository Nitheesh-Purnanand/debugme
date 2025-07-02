import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

import toast from "react-hot-toast";
export const useAuthStore = create((set)=>({
    authUser:null,
    issignup:false,
    isloggingin:false,
    isupdatingprofile:false,
    ischecking:true,
    setAuthUser: (user) => set({ authUser: user }),
    checkauth: async() =>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in CheckAuth:",error)
            set({authUser:null})
        }finally{
            set({ischecking:false})
        }
    },
    signup: async (formData) => {
    set({ issignup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ issignup: false });
    }
  },
  login: async (formData) => {
    set({ isloggingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Login successful!");
      window.location.href = "/"; // or "/dashboard" if you prefer
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isloggingin: false });
    }
  },
logout: async () => {
  try {
    await axiosInstance.post("/auth/logout");
    set({ authUser: null });
  } catch (error) {
    console.log("Logout Error:", error);
  }
}

}))