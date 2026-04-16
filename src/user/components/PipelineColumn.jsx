import JobCard from "./JobCard";

function PipelineColumn({ title, jobs, onSelect }) {
  return (
    <div className="bg-gray-100 p-3 rounded">

      <h2 className="font-bold mb-3">{title}</h2>

      {jobs.map(job => (
        <div key={job._id} onClick={() => onSelect(job)}>
          <JobCard job={job} />
        </div>
      ))}

    </div>
  );
}

export default PipelineColumn;