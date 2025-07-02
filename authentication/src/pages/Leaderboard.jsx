import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/leaderboard", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Leaderboard fetch error", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        🏆 DebugMe Leaderboard
      </h1>

      <div className="max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="w-full text-sm bg-gray-800">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Solved</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u._id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium text-white">{u.fullname}</td>
                <td className="p-3 text-center text-green-400 font-semibold">
                  {u.solvedCount}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => navigate(`/profile/${u._id}`)}
                    className="bg-cyan-400 hover:bg-cyan-600 text-black font-semibold px-3 py-1 rounded-lg"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
