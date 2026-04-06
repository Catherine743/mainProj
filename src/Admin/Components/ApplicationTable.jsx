import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const ApplicationTable = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
      date: "2026-03-20",
    },
    {
      id: 2,
      company: "Amazon",
      role: "Backend Developer",
      status: "Applied",
      date: "2026-03-18",
    },
    {
      id: 3,
      company: "Infosys",
      role: "Fullstack Developer",
      status: "Offer",
      date: "2026-03-15",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const filteredData = applications.filter((app) => {
    return (
      (filter === "All" || app.status === filter) &&
      app.company.toLowerCase().includes(search.toLowerCase())
    );
  });

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
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Applications
        </h2>

        <button
          onClick={() => navigate("/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <FaPlus />
          Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">

        {/* Search */}
        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search by company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
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
                  {/* Company */}
                  <td className="p-5 font-medium text-gray-800">
                    {app.company}
                  </td>

                  {/* Role */}
                  <td className="p-5 text-gray-600">
                    {app.role}
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-5 text-gray-500">
                    {app.date}
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex justify-center items-center gap-5">

                      <button
                        onClick={() => navigate(`/edit/${app.id}`)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <MdDeleteOutline size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
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

export default ApplicationTable;