import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

const AddApplication = () => {
  const navigate = useNavigate();

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser")) || {};

  const [form, setForm] = useState({
    designation: "",
    status: "Applied",
    date: "",
  });

  const [error, setError] = useState("");

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.designation || !form.date) {
      setError("Please fill all fields");
      return;
    }

    const newApplication = {
      id: Date.now(),
      user: loggedUser.username || "Unknown",
      email: loggedUser.email || "",
      designation: form.designation,
      status: form.status,
      date: form.date,
    };

    // GET EXISTING APPLICATIONS
    const existing =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApps = [newApplication, ...existing];

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApps)
    );

    // ✅ CREATE NOTIFICATION
    const newNotification = {
      id: Date.now(),
      type: "application",
      message: `New application added: ${form.designation}`,
      time: new Date().toLocaleString(),
      read: false,
    };

    const existingNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    localStorage.setItem(
      "notifications",
      JSON.stringify([
        newNotification,
        ...existingNotifications,
      ])
    );

    // RESET FORM
    setForm({
      designation: "",
      status: "Applied",
      date: "",
    });

    setError("");

    // NAVIGATE
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Job Application
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* DESIGNATION */}
          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full pl-10 py-2 border rounded-xl"
            />
          </div>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          {/* DATE */}
          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-xl"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Save Application
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full bg-gray-300 text-black py-2 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddApplication;