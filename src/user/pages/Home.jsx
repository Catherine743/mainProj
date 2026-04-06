import React from "react";
import {
  FaLightbulb,
  FaHandPaper,
  FaPlus,
  FaTasks,
  FaBolt,
  FaBriefcase,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Welcome back, Catherine
            <FaHandPaper className="text-yellow-400" />
          </h1>
          <p className="text-gray-500">
            Track your progress and stay focused
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
          <FaPlus />
          Add Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {[
          { title: "Applied", value: "24" },
          { title: "Interviews", value: "8" },
          { title: "Offers", value: "3", color: "text-green-600" },
          { title: "Rejected", value: "5", color: "text-red-500" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 className="text-gray-500 text-sm">{card.title}</h4>
            <p className={`text-2xl font-bold ${card.color || ""}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6">

        {/* Today Focus */}
        <div className="bg-white p-5 rounded-xl shadow col-span-2">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaTasks className="text-blue-500" />
            Today's Focus
          </h3>

          <ul className="space-y-3">
            <li className="flex justify-between bg-gray-100 p-3 rounded-lg">
              <span>Prepare for Google Interview</span>
              <span className="text-blue-500">10:00 AM</span>
            </li>

            <li className="flex justify-between bg-gray-100 p-3 rounded-lg">
              <span>Apply to 3 new jobs</span>
              <span className="text-green-500">Pending</span>
            </li>

            <li className="flex justify-between bg-gray-100 p-3 rounded-lg">
              <span>Update Resume</span>
              <span className="text-yellow-500">In Progress</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaBolt className="text-yellow-500" />
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              <FaPlus />
              Add Application
            </button>

            <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              <FaBriefcase />
              Schedule Interview
            </button>

            <button className="flex items-center justify-center gap-2 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
              <FaTasks />
              Update Resume
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* Recent Applications */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FaBriefcase className="text-blue-500" />
            Recent Applications
          </h3>

          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span>Frontend Developer - Google</span>
              <span className="text-blue-500">Applied</span>
            </li>

            <li className="flex justify-between border-b pb-2">
              <span>Backend Developer - Amazon</span>
              <span className="text-yellow-500">Interview</span>
            </li>

            <li className="flex justify-between">
              <span>Fullstack Dev - Infosys</span>
              <span className="text-green-500">Offer</span>
            </li>
          </ul>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <FaLightbulb />
            Tip of the Day
          </h3>

          <p className="text-sm leading-relaxed">
            Consistency is key. Apply daily and keep improving your skills.
            Every rejection is one step closer to success.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;