import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/users/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white p-4">Loading...</div>;

  if (!user)
    return <div className="text-red-400 text-center p-4">User not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={user.profilepic || "/default.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">{user.fullname}</h2>
            <p className="text-zinc-400 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {user.github && (
            <div>
              <a
                href={user.github}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </div>
          )}
          {user.linkedin && (
            <div>
              <a
                href={user.linkedin}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {user.leetcode && (
            <div>
              <a
                href={user.leetcode}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                LeetCode
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 text-green-400 font-semibold">
          ✅ Problems Solved: {user.solvedCount || 0}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
