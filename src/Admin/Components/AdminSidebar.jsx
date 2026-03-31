import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Users", path: "/admin/users", icon: "👤" },
    { name: "Applications", path: "/admin/applications", icon: "📄" },
    { name: "Analytics", path: "/admin/analytics", icon: "📈" },
    { name: "Notifications", path: "/admin/notifications", icon: "🔔" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>

      {/* Toggle Button */}
      <div className="flex justify-between items-center p-4">
        {isOpen && <h2 className="text-xl font-bold">Admin</h2>}

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "⬅️" : "➡️"}
        </button>
      </div>

      {/* Menu */}
      <ul className="mt-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 mx-2 rounded-lg hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full p-4">
        <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
          {isOpen ? "Logout" : "🚪"}
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;
