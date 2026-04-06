import React, { useState } from "react";
import {
  FaBell,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
} from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "interview",
      message: "Interview scheduled with Google at 10:00 AM",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "offer",
      message: "You received an offer from Infosys",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "rejected",
      message: "Application rejected by Amazon",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "reminder",
      message: "Reminder: Apply to 3 jobs today",
      time: "3 days ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Icon mapping
  const getIcon = (type) => {
    switch (type) {
      case "interview":
        return <FaBriefcase className="text-blue-500" />;
      case "offer":
        return <FaCheckCircle className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      case "reminder":
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaBell className="text-blue-500" />
          Notifications
        </h2>

        <button
          onClick={clearAll}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaTrash />
          Clear All
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No notifications available
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-center p-4 rounded-xl border transition ${
                n.read ? "bg-gray-50" : "bg-blue-50"
              }`}
            >

              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="text-xl">
                  {getIcon(n.type)}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {n.message}
                  </p>
                  <span className="text-sm text-gray-500">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">

                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Mark as read
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Notifications;