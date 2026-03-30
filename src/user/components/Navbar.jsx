import React from 'react'

function Navbar() {
  return (
    <div>
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-md px-6 py-3 rounded-2xl mb-6">

        <h2 className="text-xl font-bold text-indigo-600">
          Smart Tracker
        </h2>

        <div className="flex gap-3">
          <button className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300">
            Profile
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg">
            Logout
          </button>
        </div>

      </div>
    </div>
  )
}

export default Navbar
