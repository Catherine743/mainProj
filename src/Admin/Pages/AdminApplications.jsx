import React, { useState } from "react";
import { FaUser, FaSearch, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredData = applications.filter((app) => {
    return (
      (filter === "All" || app.status === filter) &&
      (app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.user.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getStatusStyle = (status) => {
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
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <FaUser className="text-blue-500" />
          Admin Applications
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage and monitor all job applications
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-5 text-left">User</th>
              <th className="p-5 text-left">Company</th>
              <th className="p-5 text-left">Role</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-left">Date</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((app) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* User */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {app.user}
                      </span>
                      <span className="text-sm text-gray-500">
                        {app.email}
                      </span>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="p-5 text-gray-700 font-medium">
                    {app.company}
                  </td>

                  {/* Role */}
                  <td className="p-5 text-gray-600">{app.role}</td>

                  {/* Status */}
                  <td className="p-5">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateStatus(app.id, e.target.value)
                      }
                      className={`px-7 py-1 rounded-full text-sm font-medium outline-none ${getStatusStyle(
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
                  <td className="p-5 text-gray-500 text-sm">
                    {app.date}
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex justify-center gap-4">

                      <button className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                        <FaRegEye className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        <MdDeleteOutline className="text-red-500" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">
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