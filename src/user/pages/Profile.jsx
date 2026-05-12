import React, { useEffect, useState } from "react";
import { getProfileAPI, userUpdateProfileAPI, getUserApplicationsAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { toast } from 'react-toastify'

const Profile = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNo: "",
    bio: "",
    location: "",
    image: "",
  });

  const [dp, setDp] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [stats, setStats] = useState({
    applied: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const navigate = useNavigate();

  // GET PROFILE DATA

  const getProfile = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await getProfileAPI(reqHeader);

      if (result.status === 200) {

        const data = result.data;

        setUser({
          username: data.username,
          email: data.email,
          phoneNo: data.phoneNo || "",
          bio: data.bio || "",
          location: data.location || "",
          image: data.image || "",
        });

        setDp(data.image || "");

        // SAVE UPDATED USER IN SESSION
        sessionStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

    } catch (err) {
      console.log(err);
    }
  };

  // GET APPLICATION STATS

  const getStats = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getUserApplicationsAPI(reqHeader);

      if (res.status === 200) {

        const apps = res.data;

        setStats({
          applied: apps.length,

          interviews: apps.filter(
            a => a.status === "Interview"
          ).length,

          offers: apps.filter(
            a => a.status === "Offer"
          ).length,

          rejected: apps.filter(
            a => a.status === "Rejected"
          ).length,
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

  // HANDLE IMAGE

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImageFile(file);

      // PREVIEW IMAGE
      setDp(URL.createObjectURL(file));
    }
  };

  // UPDATE PROFILE

  const handleSave = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const formData = new FormData();

      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("phoneNo", user.phoneNo);
      formData.append("bio", user.bio);
      formData.append("location", user.location);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await userUpdateProfileAPI(
        formData,
        reqHeader
      );

      if (result.status === 200) {

        toast.success("Profile Updated Successfully!");

        const updatedUser = result.data;

        setUser(updatedUser);

        setDp(updatedUser.image);

        // UPDATE SESSION
        sessionStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        navigate("/home");
      }

    } catch (err) {

      console.log(err);

      toast.error("Update failed!");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="bg-white p-6 rounded-2xl shadow mb-6 flex items-center gap-6 justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {user.username}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        {/* PROFILE IMAGE */}

        <div className="relative">

          <img
            className="w-20 h-20 rounded-full object-cover border aspect-square"
            src={
              dp
                ? dp
                : "https://ui-avatars.com/api/?name=" + user.username
            }
            alt="user"
          />

          {/* CAMERA BUTTON */}

          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">

            <FaCamera />

            <input
              type="file"
              hidden
              onChange={handleImage}
            />

          </label>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500">
            Applied
          </p>

          <h3 className="text-xl font-bold">
            {stats.applied}
          </h3>

        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500">
            Interviews
          </p>

          <h3 className="text-xl font-bold">
            {stats.interviews}
          </h3>

        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500">
            Offers
          </p>

          <h3 className="text-xl font-bold text-green-600">
            {stats.offers}
          </h3>

        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">

          <p className="text-gray-500">
            Rejected
          </p>

          <h3 className="text-xl font-bold text-red-500">
            {stats.rejected}
          </h3>

        </div>

      </div>

      {/* FORM */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <h3 className="text-xl font-bold mb-4">
          Edit Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* USERNAME */}

          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-lg"
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          {/* PHONE */}

          <input
            type="text"
            name="phoneNo"
            value={user.phoneNo}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-3 rounded-lg"
          />

          {/* LOCATION */}

          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 rounded-lg"
          />

        </div>

        {/* BIO */}

        <div className="mt-4">

          <label className="block mb-2 font-medium">
            Bio
          </label>

          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full h-28"
          ></textarea>

        </div>

        {/* BUTTONS */}

        <div className="flex justify-between mt-6">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* SAVE BUTTON */}

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