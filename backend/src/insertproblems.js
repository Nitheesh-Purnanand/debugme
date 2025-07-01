import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import Problem from "./models/problem.model.js";

dotenv.config();
console.log("MONGODB_URI =", process.env.MONGODB_URI); // debug log


const seedProblems = [
  {
    title: "Fix the Addition Function",
    description: "The add function returns the wrong result. Fix it.",
    language: "javascript",
    starterCode: `function add(a, b) {\n  return a - b;\n}`,
    testCases: [
      { input: "add(2, 3)", expectedOutput: "5" },
      { input: "add(0, 0)", expectedOutput: "0" },
      { input: "add(10, 5)", expectedOutput: "15" }
    ]
  },
  {
    title: "Greet the User",
    description: "The greet function has a formatting issue. Fix it.",
    language: "javascript",
    starterCode: `function greet(name) {\n  console.log("Hello" + name);\n}`,
    testCases: [
      { input: `greet("Alice")`, expectedOutput: "Hello Alice" },
      { input: `greet("Bob")`, expectedOutput: "Hello Bob" }
    ]
  },
  {
    title: "Square a Number",
    description: "Fix the function to correctly square a number.",
    language: "javascript",
    starterCode: `function square(n) {\n  return n * n + 1;\n}`,
    testCases: [
      { input: "square(2)", expectedOutput: "4" },
      { input: "square(5)", expectedOutput: "25" },
      { input: "square(0)", expectedOutput: "0" }
    ]
  }
];

async function insertProblems() {
  try {
    await connectdb(); // fix here
    await Problem.insertMany(seedProblems);
    console.log("✅ Demo problems inserted successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting problems:", err.message);
    process.exit(1);
  }
}

insertProblems();
