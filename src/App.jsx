import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import AdminNotifications from './Admin/Pages/AdminNotifications'

function App() {
  return (
    <div>
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

        {/* ADMIN MODULE */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="notify" element={<AdminNotifications />} />
        </Route>

        {/* NOT FOUND */}
        <Route path='/*' element={<Pnf />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  )
}

export default App