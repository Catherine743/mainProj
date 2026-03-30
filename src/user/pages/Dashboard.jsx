import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Pipeline Tracker</h2>

        <ul className="space-y-4">
          <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-400 cursor-pointer">Applications</li>
          <li className="hover:text-blue-400 cursor-pointer">Interviews</li>
          <li className="hover:text-blue-400 cursor-pointer">Analytics</li>
          <li className="hover:text-blue-400 cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border px-4 py-2 rounded-lg w-1/3"
          />

          <div className="flex items-center gap-4">
            <button className="bg-gray-200 px-3 py-2 rounded-lg"><FaBell /></button>
            <FaUserCircle className="text-2xl" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto">

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Total Applied</h4>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Interviews</h4>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Offers</h4>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Rejected</h4>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>

          {/* Pipeline Board */}
          <div className="grid grid-cols-4 gap-6">

            {/* Column */}
            {["Applied", "Interview", "Offer", "Rejected"].map((stage) => (
              <div key={stage} className="bg-gray-200 p-4 rounded-xl">
                <h3 className="font-bold mb-3">{stage}</h3>

                {/* Card */}
                <div className="bg-white p-3 rounded-lg shadow mb-3">
                  <h4 className="font-semibold">Frontend Dev</h4>
                  <p className="text-sm text-gray-500">Google</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow mb-3">
                  <h4 className="font-semibold">Backend Dev</h4>
                  <p className="text-sm text-gray-500">Amazon</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            {/* Upcoming Interviews */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold mb-4">Upcoming Interviews</h3>

              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Google - UI Round</span>
                  <span>10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Amazon - HR Round</span>
                  <span>2:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Activity */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold mb-4">Recent Activity</h3>

              <ul className="space-y-3 text-sm">
                <li>Applied to Microsoft</li>
                <li>Interview scheduled with Google</li>
                <li>Offer received from TCS</li>
              </ul>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;