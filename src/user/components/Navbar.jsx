import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaUser, FaBell, FaBars } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("")
  const [dp, setDp] = useState("")
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user.image)
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    sessionStorage.clear();
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
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Smart Pipeline
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
            <div className="relative inline-block text-left">
              <button onClick={() => setDropDown(!dropDown)} className="w-full px-3 py-2 hover:bg-gray-50 rounded-full border border-gray-200">
                <img width={40} height={40} className="rounded-full" src={dp ? dp : "http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"} alt="user" />
              </button>
              {dropDown && (
                <div className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                  <div className="py-1">
                    <button onClick={() => { navigate('/profile'); setDropDown(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                    <button onClick={() => { handleLogout(); setDropDown(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
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

        <div className="hidden md:flex items-center gap-4">
          {!token ? (
            <Link to="/login">
              <button className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 flex items-center gap-2">
                <FaUser />Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button onClick={() => setDropDown(!dropDown)} className="w-full px-3 py-2 hover:bg-gray-50 rounded">
                <img width={'40px'} height={'40px'} style={{ borderRadius: '50%' }} src={dp ? dp : "http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"} alt="user" />
              </button>
              {dropDown && <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                <div className="py-1">
                  <button onClick={() => { navigate('/profile'); setDropDown(false) }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Profile </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Logout</button>
                </div>
              </div>}
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