import { useContext, useState } from 'react'
import './App.scss'
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { AuthContext } from './context/AuthContext.jsx'

function App() {
const {currentUser} = useContext(AuthContext)

const ProtectedRoute = ({children})=>{
  if (!currentUser){
    return <Navigate to="/login" />
  }
  return children
}

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<ProtectedRoute>
      <Home />
      </ProtectedRoute>}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
