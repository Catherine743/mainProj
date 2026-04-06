import React, { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { FaEdit, FaUserLock, FaUserShield } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@email.com",
    role: "Super Admin",
    location: "India",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Updated Admin:", admin);
    alert("Profile Updated Successfully!");
  };

  const handlePasswordChange = () => {
    if (!admin.password || !admin.newPassword) {
      alert("Please fill both fields");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex items-center gap-6">

        <div>
          <h2 className="text-2xl font-bold">{admin.name}</h2>
          <p className="text-gray-500">{admin.role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Total Users</p>
          <h3 className="text-xl font-bold">120</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Applications</p>
          <h3 className="text-xl font-bold">340</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Reports</p>
          <h3 className="text-xl font-bold">15</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Active Users</p>
          <h3 className="text-xl font-bold text-green-600">98</h3>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* Left - Profile */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-4">
            <FaEdit className="text-blue-500" /> Edit Profile
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full focus:outline-blue-500"
            />

            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-lg w-full focus:outline-blue-500"
            />

            <input
              type="text"
              name="role"
              value={admin.role}
              disabled
              className="border p-3 rounded-lg w-full bg-gray-100"
            />

            <input
              type="text"
              name="location"
              value={admin.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-3 rounded-lg w-full focus:outline-blue-500"
            />

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Change Password */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-4">
              <FaUserLock className="text-red-500" /> Change Password
            </h3>

            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              placeholder="Current Password"
              className="border p-3 rounded-lg w-full mb-3 focus:outline-red-400"
            />

            <input
              type="password"
              name="newPassword"
              value={admin.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="border p-3 rounded-lg w-full mb-3 focus:outline-red-400"
            />

            <button
              onClick={handlePasswordChange}
              className="bg-red-500 text-white px-5 py-2 rounded-lg w-full hover:bg-red-600 transition"
            >
              Update Password
            </button>
          </div>

          {/* Permissions */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 mb-4">
              <FaUserShield className="text-purple-500" /> Permissions
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <TiTickOutline className="text-green-500" /> Manage Users
              </li>
              <li className="flex items-center gap-2">
                <TiTickOutline className="text-green-500" /> View Applications
              </li>
              <li className="flex items-center gap-2">
                <TiTickOutline className="text-green-500" /> Edit Applications
              </li>
              <li className="flex items-center gap-2">
                <TiTickOutline className="text-green-500" /> Access Reports
              </li>
              <li className="flex items-center gap-2">
                <TiTickOutline className="text-green-500" /> System Settings
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;