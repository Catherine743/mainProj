import React, { useEffect, useState } from "react";
import { FaBell, FaHistory, FaFilter, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserApplicationsAPI, getNotificationsAPI } from "../../services/allAPI";
import PipelineColumn from "../components/PipelineColumn";
import { useAuth } from "../../context/AuthContext";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { server_url } from "../../services/server_url";

const Dashboard = () => {

  const navigate = useNavigate();

  const stages = ["Applied", "Interview", "Offer", "Rejected"];

  const [jobs, setJobs] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [showNotif, setShowNotif] = useState(false);

  const [applications, setApplications] = useState([]);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { user, token, logout } = useAuth();

  const username = user?.username || "User";

  const profileImage = user?.image
    ? user.image.startsWith("http")
      ? user.image
      : `${server_url}/uploads/${user.image}`
    : "";

  // LOAD DATA

  useEffect(() => {

    if (token) {

      getJobs();

      fetchApplications();

      fetchNotifications();

    } else {

      setJobs([]);

      setApplications([]);

      setNotifications([]);

    }

  }, []);

  // GET JOBS

  const getJobs = async () => {

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getUserApplicationsAPI(reqHeader);

      if (res.status === 200) {
        setJobs(res.data);
      }

    } catch (err) {
      console.log(err);
    }

  };

  // GET APPLICATIONS

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

  // GET NOTIFICATIONS

  const fetchNotifications = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getNotificationsAPI(headers);

      if (res.status === 200) {
        setNotifications(res.data);
      }

    } catch (err) {
      console.log(err);
    }

  };

  // FILTER INTERVIEWS
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const interviews = applications
    .filter((app) => app.status === "Interview")
    .filter((app) => {

      if (!app.interviewDate) return false;

      const interview = new Date(app.interviewDate);

      if (interview < today) return false;

      const from = fromDate
        ? new Date(fromDate)
        : null;

      const to = toDate
        ? new Date(toDate)
        : null;

      if (from && interview < from) {
        return false;
      }

      if (to && interview > to) {
        return false;
      }

      return true;

    })
    .sort(
      (a, b) =>
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
    );

  return (

    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}

      <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">

        {/* LEFT */}
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer"
        >

          <h2 className="text-2xl font-bold text-blue-600">
            Smart Pipeline Tracker
          </h2>

          <p className="text-sm text-gray-500">
            Track your career journey
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* NOTIFICATION */}
          <div className="relative">

            <button
              onClick={() => setShowNotif(!showNotif)}
              className="bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl relative"
            >

              <FaBell className="text-lg text-gray-700" />

              {/* UNREAD BADGE */}

              {notifications.filter((n) => !n.read).length > 0 && (

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">

                  {
                    notifications.filter(
                      (n) => !n.read
                    ).length
                  }

                </span>

              )}

            </button>

            {/* DROPDOWN */}

            {showNotif && (

              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

                {/* HEADER */}

                <div className="p-4 border-b flex items-center justify-between">

                  <h4 className="font-bold text-lg">
                    Notifications
                  </h4>

                  <span className="text-sm text-gray-500">
                    {
                      notifications.filter(
                        (n) => !n.read
                      ).length
                    } unread
                  </span>

                </div>

                {/* UNREAD LIST */}

                <div className="max-h-72 overflow-y-auto">

                  {notifications.filter((n) => !n.read).length > 0 ? (

                    notifications
                      .filter((n) => !n.read)
                      .slice(0, 5)
                      .map((n) => (

                        <div
                          key={n._id}
                          className="p-4 border-b bg-blue-50 hover:bg-blue-100 transition"
                        >

                          <p className="text-sm text-gray-700">
                            {n.message}
                          </p>

                          <small className="text-gray-400">
                            {new Date(
                              n.createdAt
                            ).toLocaleString()}
                          </small>

                        </div>

                      ))

                  ) : (

                    <div className="p-5 text-center text-gray-500">

                      No unread notifications

                    </div>

                  )}

                </div>

                {/* FOOTER */}

                <div className="p-3 bg-gray-50 text-center">

                  <button
                    onClick={() => {
                      navigate("/notifications");
                      setShowNotif(false);
                    }}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View All Notifications
                  </button>

                </div>

              </div>

            )}

          </div>

          {/* PROFILE MENU */}

          <div className="relative">

            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition"
            >

              <img
                src={profileImage}
                alt="profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
              />

              <div className="hidden md:block">

                <h4 className="font-semibold text-gray-800">
                  {username}
                </h4>

              </div>

              <FaChevronDown className="text-gray-500 text-sm" />

            </div>

            {/* DROPDOWN */}

            {showProfileMenu && (

              <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                {/* PROFILE */}

                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                >

                  <FaUser className="text-blue-500" />

                  <span>Profile</span>

                </button>

                {/* LOGOUT */}

                <button
                  onClick={() => {

                    logout();

                    navigate("/");

                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-red-600"
                >

                  <FaSignOutAlt />

                  <span>Logout</span>

                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* MAIN CONTENT */}

      <main className="p-6">



        {/* PIPELINE */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {stages.map((stage) => (

            <PipelineColumn
              key={stage}
              title={stage}
              jobs={jobs.filter(
                (j) => j.status === stage
              )}
            />

          ))}

        </div>

        {/* BOTTOM SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* UPCOMING INTERVIEWS */}

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-bold flex items-center gap-2">

                <FaCalendarAlt className="text-blue-500" />

                Upcoming Interviews

              </h2>

            </div>

            {/* FILTERS */}

            <div className="flex flex-col md:flex-row gap-4 mb-5">

              <div className="flex flex-col w-full">

                <label className="text-sm text-gray-500 mb-1">
                  From Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) =>
                    setFromDate(e.target.value)
                  }
                  className="border rounded-lg p-2"
                />

              </div>

              <div className="flex flex-col w-full">

                <label className="text-sm text-gray-500 mb-1">
                  To Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) =>
                    setToDate(e.target.value)
                  }
                  className="border rounded-lg p-2"
                />

              </div>

            </div>

            {/* INTERVIEW LIST */}

            {interviews.length > 0 ? (

              <div className="space-y-4">

                {interviews.map((item) => (

                  <div
                    key={item._id}
                    className="border rounded-xl p-4 hover:shadow-md transition"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-lg">
                          {item.designation}
                        </h3>


                      </div>

                      <div className="text-right">

                        <p className="text-sm text-gray-400">
                          Interview Date
                        </p>

                        <p className="font-bold text-blue-600">
                          {item.interviewDate}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="text-center py-10 text-gray-500">

                No interviews found

              </div>

            )}

          </div>

          {/* RECENT ACTIVITY */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="font-bold text-xl mb-5 flex items-center gap-2">

              <FaHistory className="text-purple-500" />

              Recent Activity

            </h3>

            {applications.length > 0 ? (

              <div className="space-y-4">

                {applications
                  .slice()
                  .reverse()
                  .slice(0, 6)
                  .map((app) => (

                    <div
                      key={app._id}
                      className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
                    >

                      <div>

                        <h4 className="font-semibold">
                          {app.designation}
                        </h4>


                      </div>

                      <div className="text-right">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === "Applied"
                            ? "bg-blue-100 text-blue-600"
                            : app.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "Offer"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          {app.status}
                        </span>

                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(
                            app.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  ))}

              </div>

            ) : (

              <div className="text-center text-gray-500 py-10">

                No recent activity

              </div>

            )}

          </div>

        </div>

      </main>

    </div>

  );
};

export default Dashboard;