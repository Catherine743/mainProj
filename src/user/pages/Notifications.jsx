import React, { useEffect, useState } from "react";
import {
  getNotificationsAPI,
  markNotificationAPI,
  clearNotificationsAPI,
} from "../../services/allAPI";

import { useAuth } from "../../context/AuthContext";

const Notifications = () => {
  const { token } = useAuth();

  const [notifications, setNotifications] = useState([]);

  // FETCH NOTIFICATIONS
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

  // LOAD
  useEffect(() => {
    fetchNotifications();
  }, []);

  // MARK AS READ
  const handleRead = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await markNotificationAPI(id, headers);

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  // CLEAR ALL
  const handleClear = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await clearNotificationsAPI(headers);

      setNotifications([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Notifications
        </h1>

        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Clear All
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white rounded-xl shadow">

        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleRead(n._id)}
              className={`p-4 border-b cursor-pointer transition ${
                n.read
                  ? "bg-white"
                  : "bg-blue-50"
              }`}
            >
              <p className="text-gray-800">
                {n.message}
              </p>

              <small className="text-gray-500">
                {n.time}
              </small>
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

export default Notifications;