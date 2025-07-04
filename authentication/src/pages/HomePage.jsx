import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Bug, Code2, Users } from "lucide-react";
import { axiosInstance } from "../lib/axios";

const HomePage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosInstance.get("/problems");
        setProblems(data);
      } catch (err) {
        console.error("Failed to load problems", err);
      }
    };
    fetchProblems();
  }, []);

  const handleCardClick = (type) => {
    if (type === "solve") {
      navigate("/problems");
    } else if (type === "debug") {
      if (problems.length > 0) {
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        navigate(`/problems/${randomProblem._id}`);
      } else {
        alert("No problems available yet.");
      }
    } else if (type === "community") {
      navigate("/leaderboard");
    }
  };

  const cards = [
    {
      title: "Start Solving",
      description: "Practice curated coding problems.",
      icon: <Code2 size={36} className="text-cyan-400" />,
      type: "solve",
    },
    {
      title: "Fix & Debug",
      description: "Debug buggy code to level up.(Generat random problem)",
      icon: <Bug size={36} className="text-orange-400" />,
      type: "debug",
    },
    {
      title: "Compete & Connect",
      description: "Join contests and discussions.",
      icon: <Users size={36} className="text-purple-400" />,
      type: "community",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        Welcome, {authUser?.fullname?.split(" ")[0]} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.type)}
            className="bg-zinc-900 rounded-xl p-6 flex flex-col items-start transition transform shadow-lg hover:shadow-cyan-500/30 hover:scale-105 cursor-pointer"
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-cyan-400">
              {card.title}
            </h2>
            <p className="text-zinc-400">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
