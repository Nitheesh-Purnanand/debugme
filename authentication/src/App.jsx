import React, { useEffect } from 'react'
import "./index.css"
import Navbar from './components/Navbar.jsx'
import { Routes,Route,Navigate } from 'react-router-dom'
import HomePage from './pages/homePage.jsx'
import SignupPage from './pages/signupPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader}from "lucide-react"
import Logout from "./pages/Logout";
import Leaderboard from './pages/Leaderboard.jsx'
import PublicProfile from './pages/PublicProfile.jsx'
const App = () => {
  const {authUser,checkauth,ischecking} = useAuthStore()
  useEffect(()=>{
    checkauth()
  },[checkauth])
  console.log({authUser});

  if(ischecking && authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  )
  return (
    <div className='text-red-500'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={authUser?<HomePage/> : <Navigate to="/login"/>}>home</Route>
        <Route path="/logout" element={<Logout />} />
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>}></Route>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}></Route>
        <Route path='/leaderboard' element={<Leaderboard/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
      </Routes>
    </div>
  )
}

export default App