import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSingleApplicationAPI, editApplicationAPI } from "../../services/allAPI";
import { FaEdit, FaArrowLeft, FaSave, FaBriefcase, FaBuilding, FaCalendarAlt, FaUser, FaEnvelope } from "react-icons/fa";
import { toast } from 'react-toastify'

const EditApplication = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState("");
  const [existingResume, setExistingResume] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    designation: "",
    date: "",
    status: ""
  });

  useEffect(() => {
    getApplication();
  }, []);

  const getApplication = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getSingleApplicationAPI(id, reqHeader);

      if (res.status === 200) {
        const app = res.data;

        setFormData({
          user: app.user,
          email: app.email,
          designation: app.designation,
          date: app.date?.split("T")[0],
          status: app.status
        });

        setInterviewDate(app.interviewDate || "");
        setExistingResume(app.resume);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const token = sessionStorage.getItem("token");

      const reqBody = new FormData();

      reqBody.append("user", formData.user);
      reqBody.append("email", formData.email);
      reqBody.append("designation", formData.designation);
      reqBody.append("date", formData.date);


      if (formData.status === "Interview") {
        reqBody.append("interviewDate", interviewDate);
      }

      if (resume) {
        reqBody.append("resume", resume);
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const result = await editApplicationAPI(id, reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Application Updated Successfully");
        navigate("/home");
      }

    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FaEdit className="text-blue-500" />
          Edit Application
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="user"
              value={formData.user}
              disabled
              className="border pl-10 py-2 rounded-xl w-full"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              value={formData.email}
              disabled
              className="border pl-10 py-2 rounded-xl w-full"
            />
          </div>

          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border pl-10 py-2 rounded-xl w-full"
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              name="date"
              value={formData.date}
              disabled
              className="border pl-10 py-2 rounded-xl w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="border p-3 rounded-lg w-full"
          />

          {existingResume && (
            <a
              href={`http://localhost:4000/uploads/${existingResume}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm"
            >
              View Resume
            </a>
          )}

          <div className="flex justify-between pt-4">

            <Link
              to="/home"
              className="bg-gray-300 px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FaArrowLeft />
              Cancel
            </Link>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <FaSave />
              Update
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditApplication;