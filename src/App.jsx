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
import AdminLayout from './Admin/Components/AdminLayout'
import AdminHome from './Admin/Pages/AdminHome'
import AdminProfile from './Admin/Pages/AdminProfile'
import AdminApplications from './Admin/Pages/AdminApplications'
import AdminUsers from './Admin/Pages/AdminUsers'
import UpdateResume from './user/pages/UpdateResume'

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path='/home' element={<Home />} />
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Auth register />} />
      

      {/* USER MODULE */}
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/add-application' element={<AddApplication />} />
      <Route path='/edit-application/:id' element={<EditApplication />} />
      <Route path='/update-resume/:id' element={<UpdateResume />} />

      {/* ADMIN MODULE */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* NOT FOUND */}
      <Route path='/*' element={<Pnf />} />

    </Routes>
  )
}

export default App