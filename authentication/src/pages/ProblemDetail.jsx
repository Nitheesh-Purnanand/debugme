import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById, submitSolution } from "../api/problemApi";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../utils/constants";
import Editor from "@monaco-editor/react";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  const [output, setOutput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    getProblemById(id).then(res => {
      setProblem(res.data);
      setCode(res.data.starterCode || CODE_SNIPPETS["javascript"]);
      setLanguage(res.data.language || "javascript");
    });
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await submitSolution(id, { language, code });
      setResults(res.data.results || []);
      setOutput(res.data.success ? "✅ All Test Cases Passed" : "❌ Some Test Cases Failed");
    } catch (err) {
      console.error("❌ Submission Error:", err);
      setOutput("❌ Submission failed. Check console for details.");
    }
  };

  if (!problem) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{problem.title}</h1>
      <p className="text-gray-800">{problem.description}</p>

      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          setCode(CODE_SNIPPETS[e.target.value]);
        }}
        className="border px-3 py-2 rounded-md"
      >
        {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <div className="border rounded overflow-hidden">
        <Editor
          height="300px"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(val) => setCode(val)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {output && <p className="font-semibold">{output}</p>}

      {results.length > 0 && (
        <div className="border rounded-lg p-4">
          <h2 className="font-bold mb-2">Test Case Results:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Input</th>
                  <th className="border px-4 py-2">Expected</th>
                  <th className="border px-4 py-2">Actual</th>
                  <th className="border px-4 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2"><code>{r.input}</code></td>
                    <td className="border px-4 py-2"><code>{r.expected}</code></td>
                    <td className="border px-4 py-2"><code>{r.actual}</code></td>
                    <td className="border px-4 py-2">{r.passed ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
