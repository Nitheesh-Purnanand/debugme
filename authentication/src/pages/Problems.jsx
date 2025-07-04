import { useEffect, useState } from "react";
import { getProblems } from "../api/problemApi";
import { Link } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems().then(res => setProblems(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Problems</h1>
      {problems.map((p) => (
        <Link to={`/problems/${p._id}`} key={p._id}>
          <div className="border border-gray-300 p-4 rounded-lg mb-4 hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-700">{p.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
