import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfileAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  const { token, logout, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getProfileAPI(reqHeader);

      if (res.status === 200) {
        setAdmin(res.data);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-end">

      <div className="flex items-center gap-6 relative">

        {/* NOTIFICATION */}
        <FaBell className="text-xl cursor-pointer" />

        {/* PROFILE */}
        <div onClick={() => setOpen(!open)} className="cursor-pointer">
          <img
            src={
              admin?.image ||
              `https://ui-avatars.com/api/?name=${admin?.username || "Admin"}`
            }
            className="w-8 h-8 rounded-full"
            alt="admin"
          />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 bg-white shadow rounded-lg w-40">
            <button
              onClick={() => navigate("/admin/profile")}
              className="block w-full p-2 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="block w-full p-2 text-red-500 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}

      </div>

    </header>
  );
};

export default AdminHeader;