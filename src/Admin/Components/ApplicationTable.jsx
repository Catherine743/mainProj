import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const ApplicationTable = ({ data, onDelete, onStatusChange }) => {

  const statusStyle = (status) => {
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
    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((app) => (
              <tr key={app.id} className="border-t hover:bg-gray-50">

                {/* USER */}
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {app.user || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {app.email}
                    </p>
                  </div>
                </td>

                {/* COMPANY */}
                <td className="p-4 font-medium text-gray-700">
                  {app.company}
                </td>

                {/* ROLE */}
                <td className="p-4 text-gray-600">
                  {app.role}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      onStatusChange(app.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium outline-none ${statusStyle(
                      app.status
                    )}`}
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>

                {/* DATE */}
                <td className="p-4 text-gray-500">
                  {app.date}
                </td>

                {/* DELETE */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => onDelete(app.id)}
                    className="p-2 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500">
                No applications found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
};

export default ApplicationTable;