import React from "react";

const UserTable = ({ users = [] }) => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full bg-white shadow rounded-xl text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone Number</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-medium text-gray-800">
                  {u.username || "Unknown"}
                </td>

                <td className="p-4 text-gray-600">
                  {u.email || "-"}
                </td>

                <td className="p-4 text-gray-600">
                  {u.phoneNo || "-"}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                className="text-center p-6 text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
};

export default UserTable;