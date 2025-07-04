import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get(`/user/profile/${id}`);
      setProfile(data);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-xl text-white">Loading...</div>;
  if (!profile) return <div className="text-center mt-10 text-xl text-red-500">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/leaderboard")}
          className="mb-6 px-4 py-2  bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold mb-2 text-cyan-400">👤 {profile.fullname}</h1>
        <p className="text-gray-400 mb-4">Joined: {new Date(profile.joinedAt).toDateString()}</p>

        <div className="mb-6 space-x-6 text-lg">
          {profile.github && (
            <a href={profile.github} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {profile.leetcode && (
            <a href={profile.leetcode} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">
              LeetCode
            </a>
          )}
        </div>

        <div className="mt-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-semibold text-green-400 mb-2">✅ Solved Problems</h2>
          <p className="text-3xl font-bold text-white">{profile.solvedProblems.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
