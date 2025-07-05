import React, { useEffect } from 'react'
import "./index.css"
import Navbar from './components/Navbar.jsx'
import { Routes,Route,Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader}from "lucide-react"
import Logout from "./pages/Logout";
import Leaderboard from './pages/Leaderboard.jsx'
import PublicProfile from './pages/PublicProfile.jsx'
import DiscussPage from './pages/DiscussPage.jsx'
import Problems from './pages/Problems.jsx'
import ProblemDetail from './pages/ProblemDetail.jsx'
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
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>}></Route>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}></Route>
        <Route path='/leaderboard' element={<Leaderboard/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discuss" element={<DiscussPage />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
      </Routes>
    </div>
  )
}

export default App