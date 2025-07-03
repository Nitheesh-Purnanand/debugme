import { useEffect, useState } from "react";
import { getProblems } from "../api/problemApi";
import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems().then(res => setProblems(res.data));
  }, []);

  return (
    <Box p={4}>
      <Heading mb={4}>Problems</Heading>
      {problems.map(p => (
        <Box key={p._id} p={3} shadow="md" mb={3} border="1px solid #ccc">
          <Link to={`/problems/${p._id}`}>
            <Text fontWeight="bold">{p.title}</Text>
            <Text>{p.difficulty}</Text>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
