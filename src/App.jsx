import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './Books'
import { AuthContextProvider, Login } from './Login'
import Register from './Register'
import Nav from './Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthContextProvider>
      <Nav/>
      
     <Books/>
    </AuthContextProvider>
  )
}

export default App
