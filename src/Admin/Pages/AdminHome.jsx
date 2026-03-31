import React from "react";

const AdminHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🧑‍💼 Admin Dashboard</h1>
        <p className="text-gray-500">
          Monitor users and applications across the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500">Total Users</h4>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500">Applications</h4>
          <p className="text-2xl font-bold">340</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500">Interviews</h4>
          <p className="text-2xl font-bold text-yellow-600">85</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500">Offers</h4>
          <p className="text-2xl font-bold text-green-600">40</p>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">👥 Recent Users</h3>

          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span>Catherine</span>
              <span className="text-gray-500">Joined today</span>
            </li>

            <li className="flex justify-between border-b pb-2">
              <span>John</span>
              <span className="text-gray-500">Joined yesterday</span>
            </li>

            <li className="flex justify-between">
              <span>Arun</span>
              <span className="text-gray-500">2 days ago</span>
            </li>
          </ul>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">📄 Recent Applications</h3>

          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span>Google - Frontend Dev</span>
              <span className="text-blue-500">Applied</span>
            </li>

            <li className="flex justify-between border-b pb-2">
              <span>Amazon - Backend Dev</span>
              <span className="text-yellow-500">Interview</span>
            </li>

            <li className="flex justify-between">
              <span>Infosys - Fullstack</span>
              <span className="text-green-500">Offer</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        {/* Quick Actions */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">⚡ Quick Actions</h3>

          <div className="flex flex-col gap-3">
            <button className="bg-blue-500 text-white py-2 rounded-lg">
              Manage Users
            </button>

            <button className="bg-green-500 text-white py-2 rounded-lg">
              View Applications
            </button>

            <button className="bg-purple-500 text-white py-2 rounded-lg">
              View Reports
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4">🖥 System Status</h3>

          <ul className="space-y-2 text-sm">
            <li>Server: 🟢 Online</li>
            <li>Database: 🟢 Connected</li>
            <li>API: 🟢 Running</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-3">💡 Admin Tip</h3>
          <p>
            Monitor user activity regularly and ensure applications are updated
            to maintain platform efficiency 🚀
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminHome;
