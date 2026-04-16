import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("loggedUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="border px-4 py-2 rounded-lg w-1/3"
      />

      <div className="flex items-center gap-6 relative">

        <FaBell className="text-xl cursor-pointer" />

        <div onClick={() => setOpen(!open)} className="cursor-pointer">
          <img
            src={`https://ui-avatars.com/api/?name=${admin?.username}`}
            className="w-8 h-8 rounded-full"
          />
        </div>

        {open && (
          <div className="absolute right-0 top-12 bg-white shadow rounded-lg w-40">
            <button onClick={() => navigate("/admin/profile")} className="block w-full p-2 hover:bg-gray-100">Profile</button>
            <button onClick={handleLogout} className="block w-full p-2 text-red-500 hover:bg-red-100">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;