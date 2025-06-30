import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes,Link } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <ul>
        <li><Link to="/dashboard">dashboard</Link></li>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
