import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
export const useAuthStore = create((set)=>({
    authUser:null,
    issignup:false,
    isloggingin:false,
    isupdatingprofile:false,
    ischecking:true,
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
    }
}))