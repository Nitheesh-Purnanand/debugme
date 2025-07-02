import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { CheckCircle, Flame, Clock, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const { authUser } = useAuthStore();

  // Dummy data
  const totalProblems = 100;
  const solvedCount = authUser?.solvedProblems?.length || 23;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);
  const streak = authUser?.streak || 5;
  const recentSubmissions = authUser?.recentSubmissions || [
    { id: 1, title: "Two Sum", status: "Accepted", date: "2025-07-01" },
    { id: 2, title: "Reverse LL", status: "Wrong Answer", date: "2025-06-30" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">

        {/* Card 1 - User Info (2 columns) */}
        <div className="bg-zinc-900 col-span-2 rounded-xl p-5 shadow-md flex items-center space-x-4">
          <img
            src={authUser?.profilepic || "/default.png"}
            className="w-14 h-14 rounded-full border border-cyan-400 object-cover"
            alt="Profile"
          />
          <div>
            <h2 className="text-lg font-semibold text-cyan-400">
              {authUser?.fullname}
            </h2>
            <p className="text-sm text-zinc-400">{authUser?.email}</p>
            <Link to="/profile" className="text-xs text-cyan-500 underline">
              View Profile
            </Link>
          </div>
        </div>

        {/* Card 2 - Progress (3 columns) */}
        <div className="bg-zinc-900 col-span-3 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Progress</h3>
            <BarChart2 className="text-cyan-400" size={20} />
          </div>
          <p className="text-sm text-zinc-400 mt-1 mb-2">
            {solvedCount} / {totalProblems} problems solved
          </p>
          <div className="bg-zinc-700 h-3 w-full rounded-full">
            <div
              className="bg-cyan-500 h-3 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-right text-cyan-400 text-xs mt-1">
            {progressPercent}%
          </p>
        </div>

        {/* Card 3 - Streak (1 column) */}
        <div className="bg-zinc-900 col-span-1 rounded-xl p-5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Daily Streak</h3>
            <Flame className="text-orange-400" size={20} />
          </div>
          <p className="text-3xl text-orange-400 font-bold mt-2">{streak}🔥</p>
          <p className="text-sm text-zinc-400">Keep going strong!</p>
        </div>

        {/* Card 4 - Submission Status (all 6 columns if full-width) */}
        <div className="bg-zinc-900 col-span-6 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Submissions</h3>
            <Clock className="text-cyan-400" size={20} />
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {recentSubmissions.slice(0, 5).map((s) => (
              <li key={s.id} className="flex justify-between">
                <span>{s.title}</span>
                    <span className={`${s.status === "Accepted"?"text-green-400":"text-red-400"}`}>
                        {s.status}
                    </span>
              </li>
            ))}
          </ul>
          <Link to="/submissions" className="text-cyan-500 text-xs underline mt-2 block">View all</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
