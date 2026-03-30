import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditApplication = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    date: "",
    location: "",
    salary: "",
    link: "",
    notes: "",
  });

  // Fetch existing data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // 🔗 Replace with your API
        const response = await fetch(`/api/applications/${id}`);
        const data = await response.json();

        setFormData(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔗 Replace with your API
      await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Application Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          ✏️ Edit Application
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company & Role */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Job Role"
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
              className="border p-3 rounded-lg"
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
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Expected Salary"
              className="border p-3 rounded-lg"
            />
          </div>

          {/* Job Link */}
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Job Link"
            className="border p-3 rounded-lg w-full"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes..."
            className="border p-3 rounded-lg w-full h-28"
          />

          {/* Buttons */}
          <div className="flex justify-between items-center">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Application
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditApplication;
