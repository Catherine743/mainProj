import React, { useEffect, useState } from "react";
import { FaUserEdit, FaSave, FaCamera } from "react-icons/fa";
import { updateProfileAPI } from "../../services/allAPI";

const AdminProfile = () => {
  const storedUser =
    JSON.parse(sessionStorage.getItem("user")) || {};

  const token = sessionStorage.getItem("token");

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    location: "",
    bio: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  // LOAD USER FROM SESSION
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
      setPreview(storedUser.image);
    }
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setUser({ ...user, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  // SAVE (API)
  const handleSave = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await updateProfileAPI(user, reqHeader);

      if (res.status === 200) {
        alert("✅ Profile Updated!");

        // update sessionStorage
        sessionStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (

      <div className="p-6 bg-gray-100 min-h-screen">

        {/* Title */}
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <FaUserEdit className="text-blue-500" />
          Admin Profile
        </h2>

        {/* Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 relative">

            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <label className="absolute bottom-0 right-[calc(50%-48px)] bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
              <FaCamera />
              <input type="file" hidden onChange={handleImage} />
            </label>

            <h3 className="mt-3 font-semibold">
              {user.username}
            </h3>
            <p className="text-sm text-gray-500">
              {user.role}
            </p>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                Username
              </label>
              <input
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Role
              </label>
              <input
                value={user.role}
                disabled
                className="w-full border px-4 py-2 rounded-lg mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Location
              </label>
              <input
                name="location"
                value={user.location || ""}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg mt-1"
              />
            </div>

          </div>

          {/* BIO */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={user.bio || ""}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg mt-1 h-24"
            />
          </div>

          {/* SAVE */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              <FaSave />
              Save Changes
            </button>
          </div>

        </div>
      </div>
  );
};

export default AdminProfile;