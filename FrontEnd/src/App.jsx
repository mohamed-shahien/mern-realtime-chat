import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './components/pages/SignUpPage'
import LogInPage from './components/pages/LogInPage'
import SettingsPage from './components/pages/SettingsPage'
import ProfilePage from './components/pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/NavBar'
import HomePage from './components/pages/HomePage'
import { useThemeUser } from './store/useThemeUser'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeUser();
  useEffect(()=> {
    checkAuth()
  }, [checkAuth])
  if(authUser && isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Loader className='size-10 animate-spin'></Loader>
    </div>
    
  )
  return (
    <div  data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        
      </Routes>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}

export default App
