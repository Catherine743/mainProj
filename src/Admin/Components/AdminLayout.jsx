import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return; // wait for load

    if (user?.role !== "admin") {
      navigate("/login");
    }
  }, [token, user]);

  if (!token) return null; // prevent flicker

  return (
    <div className="flex h-screen">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;