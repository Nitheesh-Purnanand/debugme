import Problem from "../models/problem.model.js";
import User from "../models/user.model.js";
import axios from "axios";

export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}, "title _id");
    res.status(200).json(problems);
  } catch (error) {
    console.log("Error in getAllProblems:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.status(200).json(problem);
  } catch (error) {
    console.log("Error in getProblemById:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const submitCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const userId = req.user._id;
    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    let testCalls = "";
    for (let testCase of problem.testCases) {
      testCalls += `\nconsole.log(${testCase.input});`;
    }
    const fullCode = `${code}\n${testCalls}`;
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: problem.language || "javascript",
      version: "18.15.0",
      files: [{ content: fullCode }],
    });
    const rawOutput = response.data.run.output.trim().split("\n");
    const expectedOutputs = problem.testCases.map(tc => tc.expectedOutput.trim());
    let failedIndex = -1;
    for (let i = 0; i < expectedOutputs.length; i++) {
      if (rawOutput[i] !== expectedOutputs[i]) {
        failedIndex = i;
        break;
      }
    }
    const user = await User.findById(userId);
if (!user.solved.includes(problem._id)) {
  await User.findByIdAndUpdate(userId, {
    $addToSet: { solved: problem._id }
  });
}

    if (failedIndex === -1) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { solved: problem._id }
      });
      res.status(200).json({ passed: true });
    } else {
      res.status(200).json({
        passed: false,
        failedTest: problem.testCases[failedIndex]
      });
    }

  } catch (error) {
    console.log("Error in submitCode:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("solved", "title");
    res.status(200).json({
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
      solvedCount: user.solved.length,
      solvedProblems: user.solved
    });
  } catch (error) {
    console.log("Error in getUserDashboard:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
