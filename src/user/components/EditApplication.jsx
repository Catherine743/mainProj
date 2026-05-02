import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEdit, FaArrowLeft, FaSave, FaFileAlt } from "react-icons/fa";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    designation: "",
    status: "",
    date: "",
    location: "",
    salary: "",
    link: "",
    notes: "",
  });

  // ✅ LOAD DATA FROM LOCALSTORAGE
  useEffect(() => {
    const apps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const selectedApp = apps.find(
      (app) => app.id === Number(id)
    );

    if (selectedApp) {
      setFormData(selectedApp);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE DATA IN LOCALSTORAGE
  const handleSubmit = (e) => {
    e.preventDefault();

    let apps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApps = apps.map((app) =>
      app.id === Number(id) ? formData : app
    );

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApps)
    );

    alert("Application Updated Successfully!");
    navigate("/home", { replace: true }); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
          <FaEdit className="text-blue-500" />
          Edit Application
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company & Role */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Expected Salary"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Job Link */}
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Job Link"
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes..."
            className="border p-3 rounded-lg w-full h-28 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">

            <Link
              to="/home"
              className="flex items-center gap-2 bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              <FaArrowLeft />
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FaSave />
              Update Application
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditApplication;