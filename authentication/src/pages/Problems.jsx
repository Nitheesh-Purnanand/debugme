import { useEffect, useState } from "react";
import { getProblems } from "../api/problemApi";
import { Link } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems().then(res => setProblems(res.data));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400"> Practice Problems</h1>

      <div className="grid grid-cols-1 gap-5">
        {problems.map((p) => (
          <Link to={`/problems/${p._id}`} key={p._id}>
            <div className="border border-gray-700 bg-gray-900 rounded-xl p-5 hover:border-cyan-400 ">
              <h2 className="text-xl font-semibold text-white mb-2">{p.title}</h2>
              <p className="text-gray-400 text-sm">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
