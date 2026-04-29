import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminApplications = () => {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");

  // LOAD DATA FROM LOCALSTORAGE
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("applications")) || [];
    setApps(data);
  }, []);

  // UPDATE STATUS
  const updateStatus = (id, status) => {
    const updated = apps.map((app) =>
      app.id === id ? { ...app, status } : app
    );

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    setApps(updated);
  };

  // DELETE APPLICATION
  const deleteApp = (id) => {
    const updated = apps.filter((app) => app.id !== id);

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    setApps(updated);
  };

  // SEARCH FILTER
  const filtered = apps.filter((app) => {
    const keyword = search.toLowerCase();

    return (
      app.company?.toLowerCase().includes(keyword) ||
      app.role?.toLowerCase().includes(keyword) ||
      app.user?.toLowerCase().includes(keyword)
    );
  });

  return (

      <div className="min-h-screen bg-gray-100 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Applications Management
          </h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by user, company, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-72"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {filtered.length > 0 ? (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* USER */}
                    <td className="p-3">
                      <p className="font-medium">
                        {app.user || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {app.email}
                      </p>
                    </td>

                    {/* COMPANY */}
                    <td className="p-3">{app.company}</td>

                    {/* ROLE */}
                    <td className="p-3">{app.role}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateStatus(app.id, e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                      </select>
                    </td>

                    {/* DATE */}
                    <td className="p-3 text-gray-600">
                      {app.date}
                    </td>

                    {/* ACTION */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteApp(app.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>


  );
};

export default AdminApplications;