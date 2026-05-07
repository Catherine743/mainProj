import React, { useEffect, useState } from "react";
import ApplicationTable from "../components/ApplicationTable";
import {
  getAllApplicationsAPI,
  updateStatusAPI,
  deleteAdminApplicationAPI,
} from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";

const AdminApplications = () => {
  const { token } = useAuth();
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");

  // =========================
  // FETCH APPLICATIONS
  // =========================
  const fetchApplications = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const res = await getAllApplicationsAPI(headers);

      if (res.status === 200) {
        setApps(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchApplications();
  }, [token]);

  // =========================
  // DELETE APPLICATION (ADMIN)
  // =========================
  const handleDelete = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      await deleteAdminApplicationAPI(id, headers);

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // UPDATE STATUS + INTERVIEW DATE
  // =========================
  const handleStatusChange = async (id, status, interviewDate = null) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const payload = { status };

      if (status === "Interview") {
        const date =
          interviewDate || prompt("Enter Interview Date (YYYY-MM-DD)");

        if (!date) return;

        payload.interviewDate = date;
      }

      await updateStatusAPI(id, payload, headers);

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredApps = apps.filter((app) => {
    const k = search.toLowerCase();

    return (
      app.user?.toLowerCase().includes(k) ||
      app.company?.toLowerCase().includes(k) ||
      app.designation?.toLowerCase().includes(k)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>

        <input
          className="border px-4 py-2 rounded-lg"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ApplicationTable
          data={filteredApps}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

    </div>
  );
};

export default AdminApplications;