import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addApplicationAPI } from "../../services/allAPI";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import {toast, ToastContainer} from 'react-toastify'

const AddApplication = () => {

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [resume, setResume] = useState("");

  const loggedUser =
    JSON.parse(sessionStorage.getItem("user")) || {};

  const token = sessionStorage.getItem("token");

  const [form, setForm] = useState({
    user: loggedUser?.username || "",
    email: loggedUser?.email || "",
    designation: "",
    company: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {

      if (!form.designation || !form.company || !form.date) {
        setError("Please fill all fields");
        return;
      }

      const reqBody = new FormData();

      reqBody.append("userId", loggedUser._id);
      reqBody.append("user", form.user);
      reqBody.append("email", form.email);
      reqBody.append("designation", form.designation);
      reqBody.append("company", form.company);
      reqBody.append("date", form.date);

      // STATUS ALWAYS HANDLED IN BACKEND (Applied default)
      // NO STATUS FIELD HERE

      if (resume) {
        reqBody.append("resume", resume);
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const result = await addApplicationAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Application added successfully");
        navigate("/home");
      }

    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Application adding failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Job Application
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >

          <input
            name="user"
            value={form.user}
            readOnly
            className="w-full px-4 py-2 border rounded-xl bg-gray-100"
          />

          <input
            name="email"
            value={form.email}
            readOnly
            className="w-full px-4 py-2 border rounded-xl bg-gray-100"
          />

          <div className="relative">
            <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full pl-10 py-2 border rounded-xl"
            />
          </div>

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-4 py-2 border rounded-xl"
          />

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

          <div>
            <label className="block mb-2 font-medium">
              Upload Resume
            </label>

            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Save Application
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="w-full bg-gray-300 py-2 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
    </div>
  );
};

export default AddApplication;