import React, { useEffect, useState } from "react";
import {
  FaLightbulb,
  FaHandPaper,
  FaPlus,
  FaTasks,
  FaBolt,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const location = useLocation();

  const user =
    JSON.parse(localStorage.getItem("loggedUser")) || {};

  const name = user.username || "User";

  const [applications, setApplications] = useState([]);

  // LOAD DATA SAFELY
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, [location]);

  const today = new Date().toISOString().split("T")[0];

  // TODAY TASKS
  const todaysTasks = applications.filter(
    (app) => app.date === today
  );

  // UPCOMING (next 2 days)
  const upcoming = applications.filter((app) => {
    if (!app.date) return false;

    const appDate = new Date(app.date);
    const now = new Date();

    const diffDays =
      (appDate - now) / (1000 * 60 * 60 * 24);

    return diffDays > 0 && diffDays <= 2;
  });

  // PENDING APPLICATIONS
  const pending = applications.filter(
    (app) => app.status === "Applied"
  );

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      < Navbar />
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Welcome back, {name}!
            <FaHandPaper className="text-yellow-400" />
          </h1>

          <p className="text-gray-500">
            Track your progress and stay focused
          </p>
        </div>

        <Link
          to="/add-application"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <FaPlus />
          Add Application
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500 text-sm">Total</h4>
          <p className="text-2xl font-bold">
            {applications.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500 text-sm">Interviews</h4>
          <p className="text-2xl font-bold">
            {
              applications.filter(
                (a) => a.status === "Interview"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500 text-sm">Offers</h4>
          <p className="text-2xl font-bold text-green-600">
            {
              applications.filter(
                (a) => a.status === "Offer"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h4 className="text-gray-500 text-sm">Rejected</h4>
          <p className="text-2xl font-bold text-red-500">
            {
              applications.filter(
                (a) => a.status === "Rejected"
              ).length
            }
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TODAY FOCUS */}
        <div className="bg-white p-5 rounded-xl shadow md:col-span-2">

          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaTasks className="text-blue-500" />
            Today's Focus
          </h3>

          <ul className="space-y-3">

            {todaysTasks.length === 0 && (
              <p className="text-gray-500 text-sm">
                No tasks for today
              </p>
            )}

            {todaysTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between bg-blue-100 p-3 rounded-lg"
              >
                <span>
                  {task.role} @ {task.company}
                </span>
                <span className="text-blue-600">Today</span>
              </li>
            ))}

            {upcoming.map((task) => (
              <li
                key={task.id}
                className="flex justify-between bg-yellow-100 p-3 rounded-lg"
              >
                <span>
                  {task.role} @ {task.company}
                </span>
                <span className="text-yellow-600">
                  Upcoming
                </span>
              </li>
            ))}

            {pending.slice(0, 2).map((task) => (
              <li
                key={task.id}
                className="flex justify-between bg-green-100 p-3 rounded-lg"
              >
                <span>
                  Follow-up: {task.company}
                </span>
                <span className="text-green-600">
                  Pending
                </span>
              </li>
            ))}

          </ul>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaBolt className="text-yellow-500" />
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">

            <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              <FaBriefcase />
              Schedule Interview
            </button>

            <button className="flex items-center justify-center gap-2 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
              <FaTasks />
              Update Resume
            </button>

          </div>
        </div>
      </div>

      {/* RECENT + MOTIVATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* RECENT */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaBriefcase className="text-blue-500" />
            Recent Applications
          </h3>

          <ul className="space-y-3">

            {applications.length === 0 ? (
              <p className="text-gray-500">
                No applications yet
              </p>
            ) : (
              applications.slice(0, 5).map((app) => (
                <li
                  key={app.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {app.role} - {app.company}
                  </span>

                  <span>
                    <Link
                      to={`/edit-application/${app.id}`}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </Link>
                  </span>
                </li>
              ))
            )}

          </ul>
        </div>

        {/* TIP */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-xl shadow">

          <h3 className="font-bold mb-3 flex items-center gap-2">
            <FaLightbulb />
            Tip of the Day
          </h3>

          <p className="text-sm">
            Consistency is key. Apply daily and improve your skills.
            Every rejection brings you closer to success.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Home;