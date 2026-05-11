import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBell, FaBars, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";


function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false)
  const location = useLocation();
  const [notifications, setNotifications] = useState([])
  const [showNotif, setShowNotif] = useState(false)
  const { user, token, logout } = useAuth();

  const username = user?.username || "User";

  const dp =
    user?.image?.startsWith("http")
      ? user.image
      : user?.image
        ? `http://localhost:4000/uploads/${user.image}`
        : "";

  const handleLogout = () => {
    logout(); // from context
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600";

  return (
    <>
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl mb-6">
        {/* LEFT: LOGO */}
        <h1
          className="text-xl font-bold text-blue-600"
        >
          Smart Pipeline Tracker
        </h1>

        {/* CENTER: NAV LINKS - hidden on mobile */}
        <div className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 hover:text-blue-600 ${isActive(
              "/dashboard"
            )}`}
          >
            <FaHome />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/notifications")}
            className={`flex items-center gap-2 hover:text-blue-600 ${isActive(
              "/notifications"
            )}`}
          >
            <FaBell />
            Notifications
          </button>
        </div>

        {/* RIGHT: PROFILE DROPDOWN & HAMBURGER on mobile */}
        <div className="md:hidden flex items-center gap-4 relative">
          {!token ? (
            <Link to="/login">
              <button className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 flex items-center gap-2">
                <FaUser />Login
              </button>
            </Link>
          ) : (
            <div className="relative">

              {/* PROFILE BUTTON */}
              <div
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded-xl transition"
              >

                <img
                  src={
                    dp
                      ? dp
                      : `https://ui-avatars.com/api/?name=${username}`
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <FaChevronDown className="text-gray-500 text-xs" />

              </div>

              {/* DROPDOWN */}
              {dropDown && (

                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                  {/* PROFILE */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropDown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                  >

                    <FaUser className="text-blue-500" />

                    <span>Profile</span>

                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropDown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-red-600"
                  >

                    <FaSignOutAlt />

                    <span>Logout</span>

                  </button>

                </div>

              )}

            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            <FaBars size={24} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-5">

          {!token ? (

            <Link to="/login">
              <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 flex items-center gap-2">
                <FaUser />
                Login
              </button>
            </Link>

          ) : (

            <div className="relative">

              {/* PROFILE MENU */}
              <div
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition"
              >

                <img
                  src={
                    dp
                      ? dp
                      : `https://ui-avatars.com/api/?name=${username}`
                  }
                  alt="user"
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div className="hidden md:block">

                  <h4 className="font-semibold text-gray-800">
                    {username}
                  </h4>

                </div>

                <FaChevronDown className="text-gray-500 text-sm" />

              </div>

              {/* DROPDOWN */}
              {dropDown && (

                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                  {/* PROFILE */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropDown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                  >

                    <FaUser className="text-blue-500" />

                    <span>Profile</span>

                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropDown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-red-600"
                  >

                    <FaSignOutAlt />

                    <span>Logout</span>

                  </button>

                </div>

              )}

            </div>

          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 rounded-xl mb-6">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 hover:text-blue-600 ${isActive(
                "/dashboard"
              )}`}
            >
              <FaHome />
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/notifications");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 hover:text-blue-600 ${isActive(
                "/notifications"
              )}`}
            >
              <FaBell />
              Notifications
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;