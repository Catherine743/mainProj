import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaTachometerAlt,
  FaBriefcase,
  FaUserTie,
  FaChartLine,
  FaCog,
  FaSearch,
  FaClock,
  FaHistory,
} from "react-icons/fa";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    loadData();

    // auto refresh when storage changes (multi-tab sync)
    const handleStorage = () => loadData();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loadData = () => {
    const storedJobs =
      JSON.parse(localStorage.getItem("applications")) || [];

    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setJobs(storedJobs);
    setNotifications(storedNotifications);
  };

  // REAL-TIME STATS
  const stats = {
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const stages = ["Applied", "Interview", "Offer", "Rejected"];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-10">
            Pipeline Tracker
          </h2>

          <ul className="space-y-4 text-sm">

            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaTachometerAlt /> Dashboard
            </li>

            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaBriefcase /> Applications
            </li>

            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaUserTie /> Interviews
            </li>

            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaChartLine /> Analytics
            </li>

            <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
              <FaCog /> Settings
            </li>

          </ul>
        </div>

        {/* USER */}
        <div className="flex items-center gap-3 mt-10">
          <FaUserCircle className="text-2xl" />
          <span>
            {JSON.parse(localStorage.getItem("loggedUser"))
              ?.username || "User"}
          </span>
        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="flex justify-between items-center bg-white p-4 shadow">

          {/* SEARCH */}
          <div className="relative w-1/3">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="border pl-10 pr-4 py-2 rounded-lg w-full"
            />
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">

            {/* NOTIFICATION */}
            <button className="relative bg-gray-100 p-2 rounded-lg">
              <FaBell />

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            <FaUserCircle className="text-3xl text-gray-700" />

          </div>

        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-y-auto">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Total Applied</h4>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Interviews</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.interview}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Offers</h4>
              <p className="text-2xl font-bold text-green-600">
                {stats.offer}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h4>Rejected</h4>
              <p className="text-2xl font-bold text-red-500">
                {stats.rejected}
              </p>
            </div>

          </div>

          {/* PIPELINE BOARD */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {stages.map((stage) => (
              <div
                key={stage}
                className="bg-gray-200 p-4 rounded-xl min-h-[250px]"
              >

                <h3 className="font-semibold mb-3 text-gray-700">
                  {stage}
                </h3>

                {jobs
                  .filter((job) => job.status === stage)
                  .map((job) => (
                    <div
                      key={job.id}
                      className="bg-white p-3 rounded-lg shadow mb-3"
                    >
                      <h4 className="font-semibold text-sm">
                        {job.role}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {job.company}
                      </p>
                    </div>
                  ))}

              </div>
            ))}

          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* UPCOMING INTERVIEWS */}
            <div className="bg-white p-5 rounded-xl shadow">

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaClock className="text-blue-500" />
                Upcoming Interviews
              </h3>

              <ul className="space-y-3 text-sm">

                {jobs
                  .filter((j) => j.status === "Interview")
                  .slice(0, 3)
                  .map((j) => (
                    <li
                      key={j.id}
                      className="flex justify-between"
                    >
                      <span>
                        {j.company} - {j.role}
                      </span>
                      <span>Scheduled</span>
                    </li>
                  ))}

              </ul>

            </div>

            {/* ACTIVITY */}
            <div className="bg-white p-5 rounded-xl shadow">

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaHistory className="text-purple-500" />
                Recent Activity
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">

                {notifications.slice(0, 5).map((n) => (
                  <li key={n.id}>{n.message}</li>
                ))}

              </ul>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;