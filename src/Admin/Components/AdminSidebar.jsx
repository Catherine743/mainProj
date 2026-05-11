import React, { useEffect } from "react";
import { FaHome, FaBriefcase, FaUsers, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      navigate("/login");
    }
  }, [token, user]);

  const menu = [
    { name: "Dashboard", path: "/admin/home", icon: <FaHome /> },
    { name: "Applications", path: "/admin/applications", icon: <FaBriefcase /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Notifications", path: "/admin/notify", icon: <FaUserCircle /> }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-10">Smart Pipeline Tracker</h2>

      <ul className="space-y-4">
        {menu.map((item, i) => (
          <Link key={i} to={item.path}>
            <li
              className={`flex items-center gap-3 p-3 rounded-lg ${location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;