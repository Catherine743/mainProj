import React from "react";
import {
  FaBell,
  FaUserCircle,
  FaTachometerAlt,
  FaBriefcase,
  FaUserTie,
  FaChartLine,
  FaCog,
  FaSearch,
  FaClock,
  FaHistory,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-10">Pipeline Tracker</h2>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaTachometerAlt /> Dashboard
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaBriefcase /> Applications
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaUserTie /> Interviews
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaChartLine /> Analytics
            </li>
            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaCog /> Settings
            </li>
          </ul>
        </div>

        {/* Bottom user */}
        <div className="flex items-center gap-3 mt-10">
          <FaUserCircle className="text-2xl" />
          <span>Admin</span>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">

          {/* Search */}
          <div className="relative w-1/3">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="border pl-10 pr-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button className="relative bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
              <FaBell />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>

            <FaUserCircle className="text-3xl text-gray-700 cursor-pointer" />
          </div>

        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-y-auto">

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { title: "Total Applied", value: "24" },
              { title: "Interviews", value: "8" },
              { title: "Offers", value: "3" },
              { title: "Rejected", value: "5" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-gray-500 text-sm">{card.title}</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Pipeline Board */}
          <div className="grid grid-cols-4 gap-6">

            {["Applied", "Interview", "Offer", "Rejected"].map((stage) => (
              <div
                key={stage}
                className="bg-gray-200 p-4 rounded-xl min-h-[250px]"
              >
                <h3 className="font-semibold mb-3 text-gray-700">
                  {stage}
                </h3>

                <div className="bg-white p-3 rounded-lg shadow mb-3 hover:shadow-md transition">
                  <h4 className="font-semibold text-sm">
                    Frontend Dev
                  </h4>
                  <p className="text-xs text-gray-500">Google</p>
                </div>

                <div className="bg-white p-3 rounded-lg shadow mb-3 hover:shadow-md transition">
                  <h4 className="font-semibold text-sm">
                    Backend Dev
                  </h4>
                  <p className="text-xs text-gray-500">Amazon</p>
                </div>
              </div>
            ))}

          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            {/* Upcoming Interviews */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaClock className="text-blue-500" /> Upcoming Interviews
              </h3>

              <ul className="space-y-3 text-sm">
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
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaHistory className="text-purple-500" /> Recent Activity
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">
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