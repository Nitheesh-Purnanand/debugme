import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await axiosInstance.get("/user/dashboard");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
        <p className="text-lg font-semibold">👤 Name: {user.fullname}</p>
        <p className="text-lg">✅ Solved Problems: {user.solvedCount}</p>
        <p className="text-lg">
          📅 Joined: {new Date(user.joinedAt).toDateString()}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          📝 Recent Submissions
        </h2>

        {user.recentSubmissions.length === 0 ? (
          <p className="text-gray-500">No submissions yet</p>
        ) : (
          <ul className="space-y-3">
            {user.recentSubmissions.map((p, i) => (
              <li
                key={i}
                className={`p-4 rounded shadow-md border ${
                  p.success
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                }`}
              >
                <p className="font-semibold text-lg">{p.title}</p>
                <p
                  className={`text-sm mt-1 font-medium ${
                    p.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {p.success ? "✅ Passed" : "❌ Failed"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
