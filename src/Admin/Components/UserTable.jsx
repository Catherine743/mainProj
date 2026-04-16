import React from "react";

const UserTable = ({ users }) => {
  return (
    <table className="w-full bg-white shadow rounded-xl">

      <thead className="bg-gray-100">
        <tr>
          <th className="p-4">Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u, i) => (
          <tr key={i} className="border-t text-center">
            <td>{u.username}</td>
            <td>{u.email}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default UserTable;