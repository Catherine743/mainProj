import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    applications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const calculateStats = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setStats({
      users: users.length,
      applications: applications.length,
      interviews: applications.filter(
        (a) => a.status === "Interview"
      ).length,
      offers: applications.filter((a) => a.status === "Offer").length,
      rejected: applications.filter(
        (a) => a.status === "Rejected"
      ).length,
    });
  };

  useEffect(() => {
    // initial load
    calculateStats();

    // update when localStorage changes in other tabs
    const handleStorageChange = () => {
      calculateStats();
    };

    window.addEventListener("storage", handleStorageChange);

    // fallback auto refresh (same tab updates)
    const interval = setInterval(() => {
      calculateStats();
    }, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* USERS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.users}
            </p>
          </div>

          {/* APPLICATIONS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Total Applications</h2>
            <p className="text-3xl font-bold text-black">
              {stats.applications}
            </p>
          </div>

          {/* INTERVIEWS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Interviews</h2>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.interviews}
            </p>
          </div>

          {/* OFFERS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Offers</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.offers}
            </p>
          </div>

          {/* REJECTED */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Rejected</h2>
            <p className="text-3xl font-bold text-red-500">
              {stats.rejected}
            </p>
          </div>

        </div>

        {/* QUICK INSIGHT SECTION */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            Platform Insights
          </h2>

          <ul className="text-gray-600 space-y-2">
            <li>
              📌 Active Users: {stats.users} registered users
            </li>
            <li>
              📌 Total Job Applications: {stats.applications}
            </li>
            <li>
              📌 Success Rate:
              {stats.applications > 0
                ? (
                    (stats.offers / stats.applications) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </li>
          </ul>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminHome;