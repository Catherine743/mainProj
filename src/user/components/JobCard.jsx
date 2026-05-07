import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">

      <h4 className="font-semibold text-sm">
        {job.designation}
      </h4>

      <p className="text-xs text-gray-500">
        {job.company}
      </p>

      <p className="text-xs mt-1 text-gray-400">
        {job.status}
      </p>

    </div>
  );
};

export default JobCard;