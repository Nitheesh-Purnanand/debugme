import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById, submitSolution } from "../api/problemApi";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../utils/constants";
import {
  Box,
  Select,
  Button,
  Textarea,
  Text,
  VStack
} from "@chakra-ui/react";

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
      setCode(res.data.starterCode || CODE_SNIPPETS["javascript"]); // ✅ Set problem-specific code
      setLanguage(res.data.language || "javascript"); // ✅ Set problem-specific language
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

  if (!problem) return <Text>Loading...</Text>;

  return (
    <VStack align="stretch" spacing={4} p={4}>
      <Text fontSize="2xl" fontWeight="bold">{problem.title}</Text>
      <Text>{problem.description}</Text>

      <Select value={language} onChange={e => {
        setLanguage(e.target.value);
        setCode(CODE_SNIPPETS[e.target.value]);
      }}>
        {Object.keys(LANGUAGE_VERSIONS).map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </Select>

      <Textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        height="300px"
        fontFamily="monospace"
      />

      <Button onClick={handleSubmit} colorScheme="teal">Submit</Button>

      {output && <Text fontWeight="bold">{output}</Text>}

      {results.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold" mb={2}>Test Case Results:</Text>
          <Box overflowX="auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Input</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Expected</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Actual</th>
                  <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "8px" }}><code>{r.input}</code></td>
                    <td style={{ padding: "8px" }}><code>{r.expected}</code></td>
                    <td style={{ padding: "8px" }}><code>{r.actual}</code></td>
                    <td style={{ padding: "8px" }}>{r.passed ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </VStack>
  );
}
