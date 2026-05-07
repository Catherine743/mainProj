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

import { useNavigate } from "react-router-dom";
import { getUserApplicationsAPI } from "../../services/allAPI";
import PipelineColumn from "../components/PipelineColumn";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const stages = ["Applied", "Interview", "Offer", "Rejected"];

  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");

  const user =
    JSON.parse(sessionStorage.getItem("user")) || {};

  const username = user?.username || "User";



  useEffect(() => {
    if (token) {
      getJobs();
      generateNotifications();
      fetchApplications();
    }
  }, [token]);

  const getJobs = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const res = await getUserApplicationsAPI(reqHeader);

    if (res.status === 200) {
      setJobs(res.data);
    }
  };

  const generateNotifications = () => {
    setNotifications([
      { id: 1, message: "Interview scheduled with Google" },
      { id: 2, message: "New offer received" },
      { id: 3, message: "Application rejected" },
    ]);
  };

  const stats = {
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const filteredApplications =
  filter === "All"
    ? applications
    : applications.filter(app => app.status === filter);

  const fetchApplications = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getUserApplicationsAPI(headers);

      if (res.status === 200) {
        setApplications(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const interviews = applications
  .filter(app => app.status === "Interview")
  .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

  return (
    <div className="flex h-screen bg-gray-100">
      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">

          {/* CLICK → HOME */}
          <h2
            onClick={() => navigate("/home")}
            className="text-xl md:text-2xl font-bold cursor-pointer text-gray-800 hover:text-blue-500 transition"
          >
            Smart Pipeline Tracker
          </h2>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 relative">

            {/* NOTIFICATION */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
              >
                <FaBell />
              </button>

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}

              {/* DROPDOWN */}
              {showNotif && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 z-50">
                  <h4 className="font-bold mb-2">Notifications</h4>
                  <ul className="space-y-2 text-sm">
                    {notifications.map((n) => (
                      <li key={n.id} className="text-gray-600">
                        {n.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <img
              src={
                user?.image
                  ? user.image
                  : `https://ui-avatars.com/api/?name=${username}`
              }
              alt="profile"
              className="w-9 h-9 rounded-full border"
            />

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
          
          {/* PIPELINE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stages.map((stage) => (
              <PipelineColumn
                key={stage}
                title={stage}
                jobs={jobs.filter((j) => j.status === stage)}
              />
            ))}
          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* INTERVIEW REMINDERS */}
            <div className="bg-white rounded-xl shadow p-5 mt-6">

              <h2 className="text-xl font-bold mb-4">
                Upcoming Interviews
              </h2>

              {interviews.length > 0 ? (

                <div className="space-y-4">

                  {interviews.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.company}
                        </h3>

                        <p className="text-gray-600">
                          {item.designation}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Interview Date
                        </p>

                        <p className="font-semibold text-blue-600">
                          {item.interviewDate || "Not Scheduled"}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

              ) : (

                <p className="text-gray-500">
                  No interviews scheduled
                </p>

              )}

            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaHistory className="text-purple-500" />
                Recent Activity
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">
                {notifications.map((n) => (
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