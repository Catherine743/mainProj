import React, { useState } from "react";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";

const AdminUsers = () => {
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
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const handleAddUser = () => {
    const newEntry = {
      ...newUser,
      id: Date.now(),
      status: "Active",
    };

    setUsers([...users, newEntry]);
    setShowModal(false);
    setNewUser({ name: "", email: "", role: "User" });
  };

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

  const changeRole = (id, role) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role } : user
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative w-80">

        {/* Icon */}
        <FaSearch className="absolute top-3 left-3 text-gray-400" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table Card */}
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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* User */}
                <td className="p-5 flex items-center gap-3">
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                </td>

                {/* Email */}
                <td className="p-5 text-gray-500">{user.email}</td>

                {/* Role */}
                <td className="p-5">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="pr-7 py-2 rounded-xl border bg-white text-gray-900 
               font-medium focus:ring-2 focus:ring-blue-400"
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </td>

                {/* Status */}
                <td className="p-5">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status}
                  </button>
                </td>

                {/* Actions */}
                <td className="p-5">
                  <div className="flex justify-center gap-5">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <FaEdit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Add User</h3>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className="w-full border p-2 rounded-lg mb-4"
            >
              <option>User</option>
              <option>Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminUsers;