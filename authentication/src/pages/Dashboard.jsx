import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const TOTAL_PROBLEMS = 50;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  
  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get("/user/dashboard");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch dashboard", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!user) return null;

  const joinedDate = new Date(user.joinedAt);
  const daysSinceJoin = Math.floor(
    (Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const progressPercent = Math.round((user.solvedCount / TOTAL_PROBLEMS) * 100);
console.log(user)
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400"> DebugMe Dashboard</h1>

      {/* Top Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-10">
        {/* Card 1 - Profile Info */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-md flex items-center space-x-4">
          <img
            src={user.profilepic || "/default.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-cyan-400"
          />
          <div>
            <p className="text-xl font-semibold text-cyan-400">{user.fullname}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Card 2 - Solved Progress */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-md flex flex-col justify-center">
          <p className="text-lg font-semibold text-green-400 mb-1">
             {user.solvedCount} / {TOTAL_PROBLEMS} Problems Solved
          </p>
          <div className="bg-zinc-700 w-full h-3 rounded-full">
            <div
              className="bg-cyan-500 h-3 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-cyan-400 text-right mt-1">{progressPercent}%</p>
        </div>

        {/* Card 3 - Days Since Joined */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-md flex flex-col justify-center text-center">
          <p className="text-lg font-semibold text-yellow-400 mb-2">📅 Days Since Joined</p>
          <p className="text-3xl font-bold text-white">{daysSinceJoin} days</p>
        </div>
      </div>

      {/* Recent Submissions Section */}
      <div className="bg-zinc-900 rounded-xl p-6 shadow-md w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">📝 Recent Submissions</h2>
        {user.recentSubmissions.length === 0 ? (
          <p className="text-gray-400">No submissions yet</p>
        ) : (
          <ul className="space-y-3">
            {user.recentSubmissions.map((p, i) => (
              <li
                key={i}
                className={`p-4 rounded-md flex justify-between items-center border ${
                  p.success ? "bg-green-950 border-green-500" : "bg-red-950 border-red-500"
                }`}
              >
                <span className="text-white font-medium">{p.title}</span>
                <span
                  className={`font-semibold text-sm ${
                    p.success ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {p.success ? "✅ Passed" : "❌ Failed"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
