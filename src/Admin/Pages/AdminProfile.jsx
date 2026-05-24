import React, { useEffect, useState } from "react";
import { FaUserEdit, FaSave, FaCamera } from "react-icons/fa";
import { updateProfileAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { server_url } from "../../services/server_url";

const AdminProfile = () => {

  const navigate = useNavigate();

  const { user, updateUser, token } = useAuth();

  // Local editable copy
  const [formData, setFormData] = useState(user || {});

  // Image preview
  const [preview, setPreview] = useState("");

  // Uploaded image file
  const [imageFile, setImageFile] = useState(null);

  // Load user into form
  useEffect(() => {
    if (user) {
      setFormData(user);
      setPreview(
        user.image
          ? `${server_url}/uploads/${user.image}`
          : ""
      );
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
  };

  // Handle image upload
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      const reqBody = new FormData();
      reqBody.append("username", formData.username || "");
      reqBody.append("email", formData.email || "");
      reqBody.append("location", formData.location || "");
      reqBody.append("bio", formData.bio || "");

      if (imageFile) {
        reqBody.append("image", imageFile);
      }

      const res = await updateProfileAPI(user._id, reqBody, reqHeader);

      if (res.status === 200) {
        const updatedUser = res.data;
        // update context
        updateUser(updatedUser);
        // update local UI
        setFormData(updatedUser);
        setPreview(
          updatedUser.image
            ? `${server_url}/uploads/${updatedUser.image}`
            : ""
        );
        toast.success("Profile Updated!");
        navigate("/admin/home");
      }
    }

    catch (err) {
      console.log(err);
      toast.error("Profile update failed");
    }
  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FaUserEdit className="text-blue-500" />
        Admin Profile
      </h2>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6 relative">
          <img
            src={preview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border" />

          <label className=" absolute bottom-0 right-[calc(50%-48px)] bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
            <FaCamera />
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </label>
        </div>

        {/* FORM */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-600">
              Username
            </label>
            <input name="username" value={formData.username || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg mt-1" />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>
            <input name="email" value={formData.email || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg mt-1" />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-600">
              Role
            </label>
            <input value={formData.role || ""} disabled className="w-full border px-4 py-2 rounded-lg mt-1 bg-gray-100" />
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm text-gray-600">
              Location
            </label>
            <input name="location" value={formData.location || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg mt-1" />
          </div>
        </div>

        {/* BIO */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">
            Bio
          </label>
          <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg mt-1 h-24" />
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-6">

          <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            <FaSave />
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;