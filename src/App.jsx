import './App.css'
import { Routes, Route } from 'react-router-dom'
// COMMON
import Auth from './Pages/Auth'
import Pnf from './Pages/Pnf'

// USER
import Home from './user/pages/Home'
import Dashboard from './user/pages/Dashboard'
import Notifications from './user/pages/Notifications'
import Profile from './user/pages/Profile'
import AddApplication from './user/components/AddApplication'
import EditApplication from './user/components/EditApplication'

// ADMIN
import AdminHome from './Admin/Pages/AdminHome'
import AdminProfile from './Admin/Pages/AdminProfile'
import AdminApplications from './Admin/Pages/AdminApplications'
import AdminUsers from './Admin/Pages/AdminUsers'

import { useState } from 'react'

function App() {

  return (
    <>
      <Routes>

        {/* PUBLIC */}
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/' element={<Auth register />} />

        {/* USER MODULE */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/add-application' element={<AddApplication />} />
        <Route path='/edit-application/:id' element={<EditApplication />} />

        {/* ADMIN MODULE */}
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/admin/applications' element={<AdminApplications />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/profile' element={<AdminProfile />} />

        {/* NOT FOUND */}
        <Route path='*' element={<Pnf />} />

      </Routes>
    </>
  )
}

export default App