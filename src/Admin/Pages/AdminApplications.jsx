import React, { useEffect, useState } from "react";
import ApplicationTable from "../components/ApplicationTable";
import { getAllApplicationsAPI, updateStatusAPI, deleteAdminApplicationAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify'

const AdminApplications = () => {

  const { token } = useAuth();

  const [apps, setApps] = useState([]);

  const [search, setSearch] = useState("");

  // INTERVIEW MODAL STATES

  const [showModal, setShowModal] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  // FETCH APPLICATIONS

  const fetchApplications = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`
      };

      const res = await getAllApplicationsAPI(headers);

      if (res.status === 200) {

        setApps(res.data.data);
      }

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    if (token) {

      fetchApplications();
    }

  }, [token]);

  // DELETE APPLICATION

  const handleDelete = async (id) => {

    try {

      const headers = {
        Authorization: `Bearer ${token}`
      };

      await deleteAdminApplicationAPI(id, headers);

      fetchApplications();

    } catch (err) {

      console.log(err);
    }
  };

  // UPDATE STATUS

  const handleStatusChange = async (id, status) => {

    try {

      // OPEN DATE MODAL

      if (status === "Interview") {

        setSelectedId(id);

        setShowModal(true);

        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`
      };

      await updateStatusAPI(
        id,
        { status },
        headers
      );

      fetchApplications();

    } catch (err) {

      console.log(err);
    }
  };

  // SAVE INTERVIEW DATE

  const handleInterviewSave = async () => {

    try {

      if (!selectedDate) {

        toast.info("Please select interview date");

        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`
      };

      await updateStatusAPI(

        selectedId,

        {
          status: "Interview",
          interviewDate: selectedDate,
        },

        headers

      );

      setShowModal(false);

      setSelectedDate("");

      fetchApplications();

    } catch (err) {

      console.log(err);
    }
  };

  // SEARCH FILTER

  const filteredApps = apps.filter((app) => {

    const k = search.toLowerCase();

    return (

      app.user?.toLowerCase().includes(k) ||

      app.designation?.toLowerCase().includes(k)

    );
  });

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Applications
        </h1>

        <input
          className="border px-4 py-2 rounded-lg"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* TABLE */}

      <div className="bg-white p-4 rounded-xl shadow">

        <ApplicationTable
          data={filteredApps}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

      </div>

      {/* INTERVIEW DATE MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">

              Select Interview Date

            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="border w-full p-3 rounded-lg"
            />

            <div className="flex justify-end gap-4 mt-6">

              <button
                onClick={() => {

                  setShowModal(false);

                  setSelectedDate("");
                }}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
              >

                Cancel

              </button>

              <button
                onClick={handleInterviewSave}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >

                Save

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminApplications;