import React from "react";
import JobCard from "./JobCard";


const PipelineColumn = ({ title, jobs = [], onSelect }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-xl min-h-[250px]">

      {/* TITLE */}
      <h2 className="font-semibold mb-3 text-gray-700">
        {title}
      </h2>

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <p className="text-sm text-gray-500">
          No jobs here
        </p>
      ) : (jobs.map(job => (
        <div key={job._id} className="bg-white p-3 rounded shadow mb-3">

          <h3 className="font-bold">{job.company}</h3>

          <p className="text-sm text-gray-600">
            {job.designation}
          </p>

          {/* STATUS */}
          <span className="text-xs px-2 py-1 bg-gray-200 rounded">
            {job.status}
          </span>

          {/* INTERVIEW DATE (ONLY WHEN STATUS = INTERVIEW) */}
          {job.status === "Interview" && (
            <p className="text-blue-600 text-sm mt-2">
              Interview Date: {job.interviewDate || "Not Scheduled"}
            </p>
          )}

        </div>
      )))}

    </div>
  );
};

export default PipelineColumn;