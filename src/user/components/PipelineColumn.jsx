import React from "react";
import JobCard from "./JobCard";

function PipelineColumn({ title, jobs }) {
  return (
    <div className="min-w-[260px] bg-white rounded-xl shadow p-3">
      
      {/* Column Title */}
      <h3 className="text-center font-semibold text-slate-700 mb-3 border-b pb-2">
        {title}
      </h3>

      {/* Cards */}
      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No data
          </p>
        )}
      </div>
    </div>
  );
}

export default PipelineColumn;