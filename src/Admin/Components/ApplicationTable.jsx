import React from "react";
import { MdDeleteOutline, MdPictureAsPdf } from "react-icons/md";
import { server_url } from "../../services/server_url";

const ApplicationTable = ({ data = [], onDelete, onStatusChange }) => {

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm table-fixed border-collapse">

        {/* HEADER */}
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3 text-left w-[18%]">User</th>
            <th className="p-3 text-left w-[15%]">Company</th>
            <th className="p-3 text-left w-[15%]">Role</th>
            <th className="p-3 text-left w-[15%]">Status</th>
            <th className="p-3 text-left w-[15%]">Interview Date</th>
            <th className="p-3 text-left w-[10%]">Resume</th>
            <th className="p-3 text-left w-[12%]">Date</th>
            <th className="p-3 text-center w-[10%]">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length > 0 ? (
            data.map((app) => (
              <tr key={app._id} className="border-t hover:bg-gray-50">

                {/* USER */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{app.user}</span>
                    <span className="text-xs text-gray-500 truncate">{app.email}</span>
                  </div>
                </td>

                {/* COMPANY */}
                <td className="p-3 truncate">{app.company}</td>

                {/* ROLE */}
                <td className="p-3 truncate">{app.designation}</td>

                {/* STATUS */}
                <td className="p-3">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      onStatusChange(app._id, e.target.value, app.interviewDate)
                    }
                    className="border px-2 py-1 rounded text-xs w-full"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>

                {/* INTERVIEW DATE */}
                <td className="p-3">
                  {app.status === "Interview" ? (
                    <input
                      type="date"
                      value={
                        app.interviewDate
                          ? app.interviewDate.substring(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        onStatusChange(
                          app._id,
                          "Interview",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 rounded text-xs w-full"
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>

                {/* RESUME */}

                <td className="p-3">

                  {app.resume ? (

                    <a
                      href={`${server_url}/uploads/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >

                      <MdPictureAsPdf size={20} />

                      <span className="text-xs font-medium">
                        View Resume
                      </span>

                    </a>

                  ) : (

                    <span className="text-gray-400 text-xs">
                      No Resume
                    </span>

                  )}

                </td>

                {/* DATE */}
                <td className="p-3 text-gray-500">
                  {formatDate(app.date)}
                </td>

                {/* DELETE */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => onDelete(app._id)}
                    className="p-2 bg-red-50 rounded hover:bg-red-100"
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-6 text-gray-500">
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