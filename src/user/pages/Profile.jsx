import React, { useEffect, useState } from "react";
import { getProfileAPI, updateProfileAPI, getUserApplicationsAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
const Profile = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    bio: "",
  });

  const [dp, setDp] = useState("");
  const [stats, setStats] = useState({
    applied: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const navigate = useNavigate();
  // ✅ GET PROFILE DATA FROM BACKEND
  const getProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await getProfileAPI(reqHeader);

      if (result.status === 200) {
        const data = result.data;

        setUser({
          username: data.username,
          email: data.email,
          role: data.role,
          bio: data.bio || "",
        });

        setDp(data.image || "");
      }

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ GET APPLICATION STATS
  const getStats = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const res = await getUserApplicationsAPI(reqHeader)

      if (res.status === 200) {
        const apps = res.data;

        setStats({
          applied: apps.length,
          interviews: apps.filter(a => a.status === "Interview").length,
          offers: apps.filter(a => a.status === "Offer").length,
          rejected: apps.filter(a => a.status === "Rejected").length,
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
    getStats();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE PROFILE API
  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
        bio: user.bio,
      }
      const result = await updateProfileAPI(payload, reqHeader);

      if (result.status === 200) {
        alert("Profile Updated Successfully!");
        navigate("/home");
      }

    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex items-center gap-6 justify-between">
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>

        <img
          width={80}
          height={80}
          className="rounded-full"
          src={
            dp
              ? dp
              : "http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"
          }
          alt="user"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Applied</p>
          <h3 className="text-xl font-bold">{stats.applied}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Interviews</p>
          <h3 className="text-xl font-bold">{stats.interviews}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Offers</p>
          <h3 className="text-xl font-bold text-green-600">
            {stats.offers}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Rejected</p>
          <h3 className="text-xl font-bold text-red-500">
            {stats.rejected}
          </h3>
        </div>

      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

        <div className="grid grid-cols-3 gap-6">

          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            placeholder="Job Role"
            className="border p-3 rounded-lg"
          />

        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="block mb-2 font-medium">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full h-28"
          ></textarea>
        </div>

        {/* SAVE + BACK */}
        <div className="flex justify-between mt-6">

          {/* BACK BUTTON (LEFT) */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            ← Back
          </button>

          {/* SAVE BUTTON (RIGHT) */}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;