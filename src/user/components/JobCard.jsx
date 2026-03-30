import React from "react";

function JobCard({ job }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500 cursor-pointer">
      
      <h4 className="font-semibold text-slate-800">
        {job.role}
      </h4>

      <p className="text-sm text-gray-600">
        {job.company}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        {job.date}
      </p>
    </div>
  );
}

export default JobCard;