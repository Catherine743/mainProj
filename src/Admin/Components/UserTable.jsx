import React, { useState } from "react";

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

  // Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Toggle status
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

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Status color
  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-500";
  };

  // Role color
  const getRoleColor = (role) => {
    return role === "Admin"
      ? "bg-purple-100 text-purple-600"
      : "bg-blue-100 text-blue-600";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">👥 Users</h2>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-1/3"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">

                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?u=${user.id}`}
                      alt="avatar"
                      className="rounded-full"
                    />
                    {user.name}
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex justify-center gap-3">
                    <button className="text-blue-600">✏️</button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500"
                    >
                      🗑
                    </button>
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
