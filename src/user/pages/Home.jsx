import React, { useEffect, useState } from "react";
import { FaLightbulb, FaPlus, FaTasks, FaBolt, FaBriefcase, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserApplicationsAPI, deleteApplicationAPI } from "../../services/allAPI";
import { useAuth } from '../../context/AuthContext'
import { server_url } from "../../services/server_url";

const Home = () => {

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const { user, token, logout } = useAuth();

  const name = user?.username || "User";

  // PROTECT PAGE
  useEffect(() => {

    if (token) {

      getApplications();

    } else {

      setApplications([]);

    }

  }, [token]);

  // LOAD APPLICATIONS
  const getApplications = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getUserApplicationsAPI(reqHeader);

      if (res.status === 200) {
        setApplications(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      await deleteApplicationAPI(id, reqHeader);
      getApplications();

    } catch (err) {
      console.log(err);
    }
  };

  // DATE LOGIC
  const today = new Date().toISOString().split("T")[0];

  const todayApps = applications.filter((app) => {
    return new Date(app.createdAt).toDateString() === new Date().toDateString();
  });

  const upcomingInterviews = applications.filter((a) => {
    if (!a.interviewDate) return false;

    const diff =
      (new Date(a.interviewDate) - new Date()) /
      (1000 * 60 * 60 * 24);

    return diff > 0 && diff <= 2;
  });;

  const pending = applications.filter(
    (a) => a.status === "Applied"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <Navbar />

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Welcome, {name}
          </h1>

          <p className="text-gray-500">
            Track your progress and stay focused
          </p>
        </div>

        <Link
          to="/add-application"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          <FaPlus />
          Add Application
        </Link>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <Stat title="Applied" value={applications.length} />

        <Stat
          title="Interviews"
          value={applications.filter(a => a.status === "Interview").length}
        />

        <Stat
          title="Offers"
          value={applications.filter(a => a.status === "Offer").length}
          color="text-green-600"
        />

        <Stat
          title="Rejected"
          value={applications.filter(a => a.status === "Rejected").length}
          color="text-red-500"
        />

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6">

        {/* TODAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {todayApps.length === 0 ? (
            <p className="text-gray-500">No applications added today</p>
          ) : (
            todayApps.map((app) => (
              <div
                key={app._id}
                className="bg-blue-50 p-4 rounded-xl hover:shadow-md transition flex flex-col gap-3"
              >
                <div>
                  <p className="font-semibold text-lg">{app.designation}</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {app.status || "Applied"}
                  </span>

                  <span className="text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}

        </div>

      </div>

      {/* RECENT */}
      <div className="grid grid-cols-1 gap-6 mt-6">

        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaBriefcase className="text-blue-500" />
            Applications
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              applications
                .sort(
                  (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                )
                .map((a) => (
                  <li key={a._id} className="flex justify-between border-b pb-2">

                    <div>

                      <p className="font-medium">
                        {a.designation}
                      </p>

                      {a.resume && (
                        <a
                          href={`${server_url}/uploads/${a.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                        >
                          View Resume
                        </a>
                      )}

                    </div>

                    <span className="flex gap-2">

                      <Link
                        to={`/edit-application/${a._id}`}
                        className="flex items-center justify-center bg-yellow-100 w-9 h-9 rounded-lg hover:bg-yellow-200 transition"
                      >
                        <FaEdit className="text-yellow-600" />
                      </Link>

                      <button
                        className="flex items-center justify-center bg-red-100 w-9 h-9 rounded-lg hover:bg-red-200 transition cursor-pointer"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this application?"
                          )

                          if (confirmDelete) {
                            handleDelete(a._id)
                          }
                        }}
                      >
                        <FaTrash className="text-red-600" />
                      </button>

                    </span>

                  </li>
                ))
            )}

          </ul>

        </div>

      </div>

    </div>
  );
};

// REUSABLE
const Stat = ({ title, value, color }) => (
  <div className="bg-white p-5 rounded-xl shadow text-center">
    <h4 className="text-gray-500">{title}</h4>
    <p className={`text-2xl font-bold ${color || ""}`}>
      {value}
    </p>
  </div>
);

export default Home;