import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById, submitSolution } from "../api/problemApi";
import { LANGUAGE_VERSIONS,CODE_SNIPPETS } from "../utils/constants";
import { Box, Select, Button, Textarea, Text, VStack } from "@chakra-ui/react";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    getProblemById(id).then(res => {
  setProblem(res.data);
  setCode(res.data.starterCode);  // ✅ Set problem-specific code
  setLanguage(res.data.language || "javascript"); // If problem has language
});
  }, [id]);

  const handleSubmit = async () => {
    const res = await submitSolution(id, { language, code });
    if (res.data.success) setOutput("✅ All Test Cases Passed");
    else setOutput(`❌ Failed Test: ${res.data.failedTest.input}`);
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
    </VStack>
  );
}
