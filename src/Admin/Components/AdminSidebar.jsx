import React from "react";
import { FaHome, FaBriefcase, FaUsers, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/home", icon: <FaHome /> },
    { name: "Applications", path: "/admin/applications", icon: <FaBriefcase /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUserCircle /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <ul className="space-y-4">
        {menu.map((item, i) => (
          <Link key={i} to={item.path}>
            <li
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;