import React, { useEffect, useState } from "react";
import { getAllUsersAPI } from "../../services/allAPI";
import { useAuth } from '../../context/AuthContext'
import UserTable from "../Components/UserTable";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // LOAD USERS
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getAllUsersAPI(headers);

      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((u) => {
    const keyword = search.toLowerCase();

    return (
      u.username?.toLowerCase().includes(keyword) ||
      u.email?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          All Users
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <UserTable users={filteredUsers} />
      </div>

    </div>
  );
};

export default AdminUsers;