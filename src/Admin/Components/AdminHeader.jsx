import React, { useState, useEffect } from "react";
import { FaBell, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfileAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";


const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  const { token, logout } = useAuth();

  const getImageUrl = (img) => {
    if (!img) {
      return `https://ui-avatars.com/api/?name=${admin?.username || "Admin"}`;
    }

    // already full URL
    if (img.startsWith("http")) {
      return img;
    }

    // filename → convert to backend URL
    return `http://localhost:4000/uploads/${img}`;
  };

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

        {/* PROFILE MENU */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition"
          >

            <img
              src={getImageUrl(admin?.image)}
              alt="admin"
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
            />

            <div className="hidden md:block">

              <h4 className="font-semibold text-gray-800">
                {admin?.username || "Admin"}
              </h4>

            </div>

            <FaChevronDown className="text-gray-500 text-sm" />

          </div>

          {/* DROPDOWN */}
          {open && (

            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

              {/* PROFILE */}
              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
              >

                <FaUser className="text-blue-500" />

                <span>Profile</span>

              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-red-600"
              >

                <FaSignOutAlt />

                <span>Logout</span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
};

export default AdminHeader;