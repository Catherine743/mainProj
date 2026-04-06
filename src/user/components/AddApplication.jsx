import React, { useState } from "react";
import {
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaLink,
  FaStickyNote,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const AddApplication = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    location: "",
    salary: "",
    link: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Data:", formData);
    alert("Application Added Successfully!");

    setFormData({
      company: "",
      role: "",
      status: "Applied",
      date: "",
      location: "",
      salary: "",
      link: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Application
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company & Role */}
          <div className="grid grid-cols-2 gap-4">

            <div className="relative">
              <FaBuilding className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="role"
                placeholder="Job Role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">

            <div className="relative">
              <MdWork className="absolute top-3 left-3 text-gray-400" />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-400"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="relative">
              <FiCalendar className="absolute top-3 left-3 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-2 gap-4">

            <div className="relative">
              <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <FaMoneyBillWave className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="salary"
                placeholder="Expected Salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

          </div>

          {/* Job Link */}
          <div className="relative">
            <FaLink className="absolute top-3 left-3 text-gray-400" />
            <input
              type="url"
              name="link"
              placeholder="Job Link"
              value={formData.link}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Notes */}
          <div className="relative">
            <FaStickyNote className="absolute top-3 left-3 text-gray-400" />
            <textarea
              name="notes"
              placeholder="Additional Notes..."
              value={formData.notes}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">

            <button
              type="reset"
              className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              <FaSave />
              Save Application
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddApplication;