import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* Left - Title / Search */}
      <div className="flex items-center gap-6 w-full max-w-xl">

        <h2 className="text-xl font-bold hidden md:block">
          Smart Pipeline Tracker
        </h2>

        <input
          type="text"
          placeholder="Search applications..."
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-6 relative">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <span className="text-2xl"><FaBell /></span>

          {/* Badge */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="rounded-full"
          />
          <span className="hidden md:block">Admin</span>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 bg-white shadow-lg rounded-xl w-44 p-2 z-50">

            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Profile
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Settings
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 rounded-lg">
              Logout
            </button>

          </div>
        )}

      </div>
    </header>
  );
};

export default AdminHeader;


