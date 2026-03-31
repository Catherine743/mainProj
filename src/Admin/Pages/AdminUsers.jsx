import React, { useState } from "react";

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

  // Add user
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

  // Change role
  const changeRole = (id, role) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role } : user
      )
    );
  };

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🧑‍💼 Manage Users</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add User
        </button>
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
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                {/* User */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${user.id}`}
                    alt=""
                    className="rounded-full"
                  />
                  {user.name}
                </td>

                {/* Email */}
                <td className="p-4">{user.email}</td>

                {/* Role */}
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded-lg"
                  >
                    <option>User</option>
                    <option>Admin</option>
                  </select>
                </td>

                {/* Status */}
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
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
            ))}
          </tbody>

        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold mb-4">➕ Add User</h3>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="border p-2 rounded-lg w-full mb-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 rounded-lg w-full mb-3"
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className="border p-2 rounded-lg w-full mb-4"
            >
              <option>User</option>
              <option>Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
