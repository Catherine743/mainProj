import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-4">

        <h2 className="font-bold mb-6">Admin Panel</h2>

        <p onClick={() => navigate("/admin")} className="cursor-pointer">
          Dashboard
        </p>

        <p onClick={() => navigate("/admin/users")} className="cursor-pointer">
          Users
        </p>

        <p onClick={() => navigate("/admin/applications")} className="cursor-pointer">
          Applications
        </p>

        <p onClick={() => navigate("/admin/profile")} className="cursor-pointer">
          Profile
        </p>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;