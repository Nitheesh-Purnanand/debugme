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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProblemById(id).then((res) => {
      setProblem(res.data);
      setCode(res.data.starterCode || CODE_SNIPPETS["javascript"]);
      setLanguage(res.data.language || "javascript");
    });
  }, [id]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await submitSolution(id, { language, code });
      setResults(res.data.results || []);
      setOutput(res.data.success ? "✅ All Test Cases Passed" : "❌ Some Test Cases Failed");
    } catch (err) {
      console.error("❌ Submission Error:", err);
      setOutput("❌ Submission failed. Check console for details.");
    }
    setIsLoading(false);
  };

  if (!problem) return <div className="p-4 text-xl font-semibold text-white">Loading...</div>;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#0e0e10] text-white">
      {/* Left Section */}
      <div className="w-1/2 p-6 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-3 text-cyan-400">{problem.title}</h2>
        <p className="text-gray-300 mb-4 whitespace-pre-wrap">{problem.description}</p>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-300">Language:</label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(CODE_SNIPPETS[e.target.value]);
            }}
            className="bg-[#1a1a1d] text-white border border-gray-600 rounded px-3 py-2 w-full"
          >
            {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Test Case Results Table */}
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Test Case Results</h3>
            <div className="overflow-x-auto border border-gray-700 rounded">
              <table className="w-full table-auto text-sm text-white">
                <thead className="bg-[#1f1f23]">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Input</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Expected</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Actual</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-left">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, idx) => (
                    <tr key={idx} className="bg-[#121214] hover:bg-[#1a1a1d]">
                      <td className="px-4 py-2 border-b border-gray-700">{r.input}</td>
                      <td className="px-4 py-2 border-b border-gray-700">{r.expected}</td>
                      <td className="px-4 py-2 border-b border-gray-700">{r.actual}</td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {r.passed ? "✅" : "❌"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col p-6 bg-[#0e0e10]">
        <div className="flex-1 border border-gray-700 rounded overflow-hidden mb-4">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-cyan-400 hover:bg-cyan-600 text-white font-medium py-2 rounded flex items-center justify-center gap-2 transition disabled:opacity-60"
        >
          {isLoading && (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
              />
            </svg>
          )}
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {output && (
          <p className="mt-3 font-semibold text-lg text-gray-300">{output}</p>
        )}
      </div>
    </div>
  );
}
