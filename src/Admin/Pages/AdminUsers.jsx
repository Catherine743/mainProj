import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  return (

      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          All Users
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

  );
};

export default AdminUsers;