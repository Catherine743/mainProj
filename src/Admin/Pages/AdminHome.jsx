import React from "react";
import { FaUser, FaUserFriends, FaCircle } from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { AiOutlineThunderbolt, AiOutlineBulb } from "react-icons/ai";
import { SiRocket } from "react-icons/si";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";

const AdminHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
          <FaUser className="text-blue-500 text-2xl" />
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor users and applications across the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {[
          { title: "Total Users", value: "120", icon: <FaUser />, color: "text-blue-500" },
          { title: "Applications", value: "340", icon: <BsFileEarmarkText />, color: "text-purple-500" },
          { title: "Interviews", value: "85", icon: <AiOutlineThunderbolt />, color: "text-yellow-500" },
          { title: "Offers", value: "40", icon: <SiRocket />, color: "text-green-500" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </h2>
            </div>

            <div className={`text-3xl ${card.color} opacity-80`}>
              {card.icon}
            </div>
          </div>
        ))}

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-700">
            <FaUserFriends className="text-blue-500" />
            Recent Users
          </h3>

          <ul className="space-y-4">
            {[
              { name: "Catherine", time: "Joined today" },
              { name: "John", time: "Joined yesterday" },
              { name: "Arun", time: "2 days ago" },
            ].map((user, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="font-medium text-gray-800">{user.name}</span>
                <span className="text-sm text-gray-500">{user.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-700">
            <BsFileEarmarkText className="text-purple-500" />
            Recent Applications
          </h3>

          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-800">Google - Frontend Dev</span>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                Applied
              </span>
            </li>

            <li className="flex justify-between items-center border-b pb-2">
              <span>Amazon - Backend Dev</span>
              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium">
                Interview
              </span>
            </li>

            <li className="flex justify-between items-center">
              <span>Infosys - Fullstack</span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                Offer
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-700">
            <AiOutlineThunderbolt className="text-yellow-500" />
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow hover:scale-105 transition">
              Manage Users
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg shadow hover:scale-105 transition">
              View Applications
            </button>

            <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg shadow hover:scale-105 transition">
              View Reports
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-700">
            <MdOutlineSystemSecurityUpdateGood className="text-green-500" />
            System Status
          </h3>

          <ul className="space-y-3">
            {["Server Online", "Database Connected", "API Running"].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaCircle className="text-green-500 text-xs" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AiOutlineBulb />
              Admin Tip
            </h3>

            <p className="text-sm leading-relaxed opacity-90">
              Monitor user activity regularly and ensure applications are updated
              to maintain platform efficiency.
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <SiRocket className="text-2xl opacity-80" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminHome;