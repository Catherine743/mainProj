import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const UpdateResume = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [resume, setResume] = useState("")

  const handleUpdate = async () => {

    const token = sessionStorage.getItem("token")

    const reqBody = new FormData()

    reqBody.append("resume", resume)

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }

    await axios.put(
      `http://localhost:4000/update-resume/${id}`,
      reqBody,
      { headers }
    )

    alert("Resume Updated")

    navigate("/home")

  }

  return (

    <div className="p-10">

      <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-4">
          Update Resume
        </h2>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          className="border p-2 w-full rounded-lg"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Update
        </button>

      </div>

    </div>

  )
}

export default UpdateResume