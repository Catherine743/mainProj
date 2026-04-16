import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onSelect }) => {
  const navigate = useNavigate();

  // SAFE ID HANDLING
  const jobId = job?.id || job?._id;

  const handleClick = () => {
    if (onSelect) {
      onSelect(job);
    } else if (jobId) {
      navigate(`/edit-application/${jobId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer border"
    >

      {/* COMPANY + ROLE */}
      <h3 className="font-semibold text-gray-800">
        {job?.role || job?.title || "No Title"}
      </h3>

      <p className="text-sm text-gray-500">
        {job?.company || "Unknown Company"}
      </p>

      {/* STATUS BADGE */}
      <div className="mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            job?.status === "Applied"
              ? "bg-blue-100 text-blue-600"
              : job?.status === "Interview"
              ? "bg-yellow-100 text-yellow-600"
              : job?.status === "Offer"
              ? "bg-green-100 text-green-600"
              : job?.status === "Rejected"
              ? "bg-red-100 text-red-500"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {job?.status || "Unknown"}
        </span>
      </div>

    </div>
  );
};

export default JobCard;