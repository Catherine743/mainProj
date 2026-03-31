import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Catherine",
    email: "catherine@email.com",
    role: "Frontend Developer",
    location: "India",
    skills: "React, Node.js, MongoDB",
    bio: "Passionate about building modern web applications.",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Updated User:", user);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex items-center gap-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="rounded-full w-24 h-24"
        />

        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Applied</p>
          <h3 className="text-xl font-bold">24</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Interviews</p>
          <h3 className="text-xl font-bold">8</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Offers</p>
          <h3 className="text-xl font-bold text-green-600">3</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-gray-500">Rejected</p>
          <h3 className="text-xl font-bold text-red-500">5</h3>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

        <div className="grid grid-cols-2 gap-6">

          <input
            type="text"
            name="name"
            value={user.name}
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

          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 rounded-lg"
          />

        </div>

        {/* Skills */}
        <div className="mt-4">
          <label className="block mb-2 font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={user.skills}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
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

        {/* Save Button */}
        <div className="flex justify-end mt-6">
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