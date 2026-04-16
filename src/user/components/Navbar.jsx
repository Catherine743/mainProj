import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-4 bg-white shadow">

      <h1
        className="font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Pipeline Tracker
      </h1>

      <div className="flex gap-4">

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/profile")}>
          Profile
        </button>

        <button onClick={() => navigate("/notifications")}>
          Notifications
        </button>

      </div>
    </div>
  );
}

export default Navbar;