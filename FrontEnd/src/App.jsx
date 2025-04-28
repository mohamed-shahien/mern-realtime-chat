import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import SignUpPage from './components/pages/SignUpPage'
import LogInPage from './components/pages/LogInPage'
import SettingsPage from './components/pages/SettingsPage'
import ProfilePage from './components/pages/ProfilePage'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LogInPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App
