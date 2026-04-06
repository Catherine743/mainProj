import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Catherine",
      email: "catherine@email.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "John",
      email: "john@email.com",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Arun",
      email: "arun@email.com",
      role: "User",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-500";
  };

  const getRoleColor = (role) => {
    return role === "Admin"
      ? "bg-purple-100 text-purple-600"
      : "bg-blue-100 text-blue-600";
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUsers className="text-blue-500" />
          Users
        </h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-5 text-left">User</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Role</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* User */}
                  <td className="p-5 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${user.id}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold text-gray-800">
                      {user.name}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="p-5 text-gray-500">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="p-5">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex justify-center items-center gap-5">

                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
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
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UserTable;