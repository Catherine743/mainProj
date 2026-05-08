import React, { useEffect, useState } from "react";

import {
  getAllApplicationsAPI,
  getAllUsersAPI
} from "../../services/allAPI";

const AdminHome = () => {

  const [stats, setStats] = useState({
    users: 0,
    applications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  // LOAD DATA
  const loadData = async () => {

    try {

      const token = sessionStorage.getItem("token");

      if (!token) return;

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      // API CALLS
      const usersRes = await getAllUsersAPI(reqHeader);

      const appsRes = await getAllApplicationsAPI(reqHeader);

      console.log("USERS:", usersRes);
      console.log("APPS:", appsRes);

      // SAFE DATA
      const users = usersRes?.data || [];

      const applications = appsRes?.data?.data || [];

      // UPDATE STATE
      setStats({
        users: users.length,
        applications: applications.length,
        interviews: applications.filter(
          a => a.status === "Interview"
        ).length,

        offers: applications.filter(
          a => a.status === "Offer"
        ).length,

        rejected: applications.filter(
          a => a.status === "Rejected"
        ).length,
      });

    } catch (err) {

      console.log("ADMIN HOME ERROR:", err);

    }
  };

  // INITIAL LOAD
  useEffect(() => {

    loadData();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Total Users"
          value={stats.users}
          color="text-blue-600"
        />

        <Card
          title="Total Applications"
          value={stats.applications}
        />

        <Card
          title="Interviews"
          value={stats.interviews}
          color="text-yellow-600"
        />

        <Card
          title="Offers"
          value={stats.offers}
          color="text-green-600"
        />

        <Card
          title="Rejected"
          value={stats.rejected}
          color="text-red-500"
        />

      </div>

      {/* INSIGHTS */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-2">
          Platform Insights
        </h2>

        <ul className="text-gray-600 space-y-2">

          <li>
            📌 Active Users: {stats.users}
          </li>

          <li>
            📌 Total Applications: {stats.applications}
          </li>

          <li>
            📌 Success Rate:
            {
              stats.applications > 0
                ? (
                  (stats.offers / stats.applications) * 100
                ).toFixed(1)
                : 0
            }%
          </li>

        </ul>

      </div>

    </div>
  );
};

// CARD
const Card = ({ title, value, color }) => (

  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-gray-500">
      {title}
    </h2>

    <p className={`text-3xl font-bold ${color || ""}`}>
      {value}
    </p>

  </div>

);

export default AdminHome;