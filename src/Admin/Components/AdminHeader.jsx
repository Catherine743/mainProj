import React, { useState, useEffect } from "react";
import { FaBell, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getNotificationsAPI, getProfileAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";
import AdminNotifications from "../Pages/AdminNotifications";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();

  const { token, logout, profileRefresh } = useAuth();

  const getImageUrl = (img) => {
    if (!img) {
      return `https://ui-avatars.com/api/?name=${admin?.username || "Admin"}`;
    }

    // already full URL
    if (img.startsWith("http")) {
      return img;
    }

    // filename -> convert to backend URL
    return `http://localhost:4000/uploads/${img}`;
  };

  useEffect(() => {
    fetchProfile();
    fetchAdminNotifications();
  }, [token, profileRefresh]);

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

  const fetchAdminNotifications = async () => {

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getNotificationsAPI(reqHeader);

      if (res.status === 200) {

        setNotifications(res.data);


      }

    } catch (err) {
      console.log(err);
    }

  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-end">

      <div className="flex items-center gap-6 relative">

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() => setShowNotif(!showNotif)}
            className="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl relative"
          >

            <FaBell className="text-lg text-gray-700" />

            {notifications.filter((n) => !n.read).length > 0 && (

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

                {
                  notifications.filter(
                    (n) => !n.read
                  ).length
                }

              </span>

            )}

          </button>

          {/* DROPDOWN */}

          {showNotif && (

            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

              {/* HEADER */}

              <div className="p-4 border-b flex items-center justify-between">

                <h4 className="font-bold text-lg">
                  Notifications
                </h4>

                <span className="text-sm text-gray-500">
                  {
                    notifications.filter(
                      (n) => !n.read
                    ).length
                  } unread
                </span>

              </div>

              {/* LIST */}

              <div className="max-h-72 overflow-y-auto">

                {notifications.length > 0 ? (

                  notifications
                    .filter((n) => !n.read)
                    .slice()
                    .reverse()
                    .slice(0, 8)
                    .map((n) => (

                      <div
                        key={n._id}
                        className={`p-4 border-b transition ${n.read
                          ? "bg-white"
                          : "bg-blue-50 hover:bg-blue-100"
                          }`}
                      >

                        <p className="text-sm text-gray-700">
                          {n.message}
                        </p>

                        <small className="text-gray-400">
                          {new Date(
                            n.createdAt
                          ).toLocaleString()}
                        </small>

                      </div>

                    ))

                ) : (

                  <div className="p-5 text-center text-gray-500">

                    No notifications

                  </div>

                )}

              </div>

              {/* FOOTER */}

              <div className="p-3 bg-gray-50 text-center">

                <button
                  onClick={() => {
                    navigate("/admin/notify")
                    setShowNotif(false);
                  }}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View All Notifications
                </button>

              </div>

            </div>

          )}

        </div>

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