import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Bug, Code2, Users } from "lucide-react";

const HomePage = () => {
  const { authUser } = useAuthStore();

  const cards = [
    {
      title: "Start Solving",
      description: "Practice curated coding problems.",
      icon: <Code2 size={36} className="text-cyan-400" />,
    },
    {
      title: "Fix & Debug",
      description: "Debug buggy code to level up.",
      icon: <Bug size={36} className="text-orange-400" />,
    },
    {
      title: "Compete & Connect",
      description: "Join contests and discussions.",
      icon: <Users size={36} className="text-purple-400" />,
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
            className="bg-zinc-900 rounded-xl p-6 flex flex-col items-start transition transform shadow-lg"
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
