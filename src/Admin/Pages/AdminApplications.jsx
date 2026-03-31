import React, { useState } from "react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      user: "Catherine",
      email: "catherine@email.com",
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
      date: "2026-03-20",
    },
    {
      id: 2,
      user: "John",
      email: "john@email.com",
      company: "Amazon",
      role: "Backend Developer",
      status: "Applied",
      date: "2026-03-18",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Delete application
  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  // Update status
  const updateStatus = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Filter + Search
  const filteredData = applications.filter((app) => {
    return (
      (filter === "All" || app.status === filter) &&
      (app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.user.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-600";
      case "Interview":
        return "bg-yellow-100 text-yellow-600";
      case "Offer":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🧑‍💼 Admin Applications</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by user or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-1/3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">

                  {/* User */}
                  <td className="p-4">
                    <p className="font-medium">{app.user}</p>
                    <span className="text-sm text-gray-500">
                      {app.email}
                    </span>
                  </td>

                  {/* Company */}
                  <td className="p-4">{app.company}</td>

                  {/* Role */}
                  <td className="p-4">{app.role}</td>

                  {/* Status */}
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateStatus(app.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        app.status
                      )}`}
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="p-4">{app.date}</td>

                  {/* Actions */}
                  <td className="p-4 flex justify-center gap-3">
                    <button className="text-blue-600">👁</button>

                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-500"
                    >
                      🗑
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
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
