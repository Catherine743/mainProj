import React, { useState } from "react";

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
      message: "You received an offer from Infosys 🎉",
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

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Clear all
  const clearAll = () => {
    setNotifications([]);
  };

  // Icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "interview":
        return "🎤";
      case "offer":
        return "🎉";
      case "rejected":
        return "❌";
      case "reminder":
        return "⏰";
      default:
        return "🔔";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🔔 Notifications</h2>

        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Clear All
        </button>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">
            No notifications available
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-center p-4 rounded-xl border ${
                n.read ? "bg-gray-50" : "bg-blue-50"
              }`}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <span className="text-2xl">{getIcon(n.type)}</span>

                <div>
                  <p className="font-medium">{n.message}</p>
                  <span className="text-sm text-gray-500">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">

                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-600 text-sm"
                  >
                    Mark as read
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
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