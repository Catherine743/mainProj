import React, { useState } from "react";

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

    // TODO: connect API here
    alert("Application Added Successfully!");

    // Reset form
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
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Application
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company & Role */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={formData.role}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="salary"
              placeholder="Expected Salary"
              value={formData.salary}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>

          {/* Job Link */}
          <input
            type="url"
            name="link"
            placeholder="Job Link"
            value={formData.link}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Additional Notes..."
            value={formData.notes}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full h-28"
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddApplication;