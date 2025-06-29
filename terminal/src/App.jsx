import { useState } from 'react'
import Codeditor from './components/Codeditor'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1><Codeditor></Codeditor></h1>
    </>
  )
}

export default App
