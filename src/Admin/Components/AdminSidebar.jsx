import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Applications", path: "/admin/applications", icon: <FaFileAlt /> },
    { name: "Analytics", path: "/admin/analytics", icon: <FaChartLine /> },
    { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h2 className="text-xl font-bold tracking-wide">Admin</h2>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white text-lg"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 p-3 mx-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-600 shadow-md"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {/* Icon */}
                  <span className="text-lg">{item.icon}</span>

                  {/* Text */}
                  {isOpen && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <button className="flex items-center justify-center gap-2 w-full bg-red-500 py-2 rounded-xl hover:bg-red-600 transition">
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;