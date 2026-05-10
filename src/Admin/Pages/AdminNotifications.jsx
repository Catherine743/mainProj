import React, { useEffect, useState } from "react";

import {
  getAdminNotificationsAPI,
  markAdminNotificationAPI,
  clearAdminNotificationsAPI,
  deleteAdminNotificationAPI,
} from "../../services/allAPI";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { FaTrash, FaCheck } from "react-icons/fa";

const AdminNotifications = () => {

  const { token } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  // =========================
  // FETCH NOTIFICATIONS
  // =========================
  const fetchNotifications = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getAdminNotificationsAPI(headers);

      if (res.status === 200) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOAD
  useEffect(() => {
    if (token) fetchNotifications();
  }, [token]);

  // =========================
  // MARK AS READ
  // =========================
  const handleRead = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await markAdminNotificationAPI(id, headers);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE SINGLE
  // =========================
  const handleDelete = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await deleteAdminNotificationAPI(id, headers);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // CLEAR ALL
  // =========================
  const handleClear = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await clearAdminNotificationsAPI(headers);

      setNotifications([]);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <h1 className="text-2xl font-bold">
            Admin Notifications
          </h1>

        </div>

        {/* RIGHT */}
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Clear All
        </button>

      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {notifications.length > 0 ? (

          notifications.map((n) => (

            <div
              key={n._id}
              className={`p-4 border-b flex justify-between items-start transition ${
                n.read ? "bg-white" : "bg-blue-50"
              }`}
            >

              {/* LEFT SIDE */}
              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <p className="text-gray-800">
                    {n.message}
                  </p>

                  {!n.read && (
                    <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}

                </div>

                <small className="text-gray-500 block mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </small>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 ml-4">

                {/* MARK AS READ */}
                {!n.read && (
                  <button
                    onClick={() => handleRead(n._id)}
                    className="bg-green-100 hover:bg-green-200 p-2 rounded-lg transition"
                    title="Mark as Read"
                  >
                    <FaCheck className="text-green-600" />
                  </button>
                )}

                {/* DELETE */}
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "Delete this notification?"
                    );

                    if (confirmDelete) {
                      handleDelete(n._id);
                    }
                  }}
                  className="bg-red-100 hover:bg-red-200 p-2 rounded-lg transition"
                  title="Delete Notification"
                >
                  <FaTrash className="text-red-600" />
                </button>

              </div>

            </div>

          ))

        ) : (
          <div className="p-6 text-center text-gray-500">
            No notifications
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminNotifications;