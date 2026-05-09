import React, { useEffect, useState } from "react"

import {
  getNotificationsAPI,
  markNotificationAPI,
  clearNotificationsAPI,
  deleteNotificationAPI,
} from "../../services/allAPI"

import { useAuth } from "../../context/AuthContext"

import { useNavigate } from "react-router-dom"

import {
  FaTrash,
  FaCheck
} from "react-icons/fa"

const Notifications = () => {

  const { token } = useAuth()

  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([])

  // FETCH NOTIFICATIONS

  const fetchNotifications = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const res = await getNotificationsAPI(headers)

      if (res.status === 200) {

        setNotifications(res.data)
      }

    } catch (err) {

      console.log(err)
    }
  }

  // LOAD

  useEffect(() => {

    fetchNotifications()

  }, [])

  // MARK AS READ

  const handleRead = async (id) => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      await markNotificationAPI(id, headers)

      fetchNotifications()

    } catch (err) {

      console.log(err)
    }
  }

  // DELETE SINGLE

  const handleDelete = async (id) => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      await deleteNotificationAPI(id, headers)

      fetchNotifications()

    } catch (err) {

      console.log(err)
    }
  }

  // CLEAR ALL

  const handleClear = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      await clearNotificationsAPI(headers)

      setNotifications([])

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TOP BAR */}

      <div className="flex justify-between items-center mb-6">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            Back
          </button>

          <h1 className="text-2xl font-bold">
            Notifications
          </h1>

        </div>

        {/* RIGHT */}

        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Clear All
        </button>

      </div>

      {/* NOTIFICATIONS */}

      <div className="bg-white rounded-xl shadow">

        {unreadNotifications.length > 0 ? (

          unreadNotifications.map((n) => (

              <div
                key={n._id}
                className={`p-4 border-b flex justify-between items-start ${n.read
                    ? "bg-white"
                    : "bg-blue-50"
                  }`}
              >

                {/* LEFT SIDE */}

                <div className="flex-1">

                  <p className="text-gray-800">
                    {n.message}
                  </p>

                  <small className="text-gray-500">
                    {
                      new Date(n.createdAt)
                        .toLocaleString()
                    }
                  </small>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-2 ml-4">

                  {/* MARK AS READ */}

                  {!n.read && (

                    <button
                      onClick={() => handleRead(n._id)}
                      className="bg-green-100 hover:bg-green-200 p-2 rounded-lg transition"
                    >

                      <FaCheck className="text-green-600" />

                    </button>

                  )}

                  {/* DELETE */}

                  <button
                    onClick={() => {

                      const confirmDelete = window.confirm(
                        "Delete this notification?"
                      )

                      if (confirmDelete) {

                        handleDelete(n._id)
                      }

                    }}
                    className="bg-red-100 hover:bg-red-200 p-2 rounded-lg transition"
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

  )
}

export default Notifications