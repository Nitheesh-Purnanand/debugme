import Problem from "../models/problem.model.js";
import { execCode } from "../utils/execCode.js";
import User from "../models/user.model.js";

export const getAllProblems = async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
};

export const getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  res.json(problem);
};

export const submitCode = async (req, res) => {
  const { language, code } = req.body;
  const problem = await Problem.findById(req.params.id);
  if (!problem) return res.status(404).json({ error: "Problem not found" });

  for (let test of problem.testCases) {
    const output = await execCode(language, `${code}\nconsole.log(${test.input})`);
    if (!output.run.output.includes(test.expectedOutput)) {
      return res.json({ success: false, failedTest: test });
    }
  }

  const user = await User.findById(req.user._id);
  if (!user.solvedProblems.includes(problem._id)) {
    user.solvedProblems.push(problem._id);
    await user.save();
  }

  res.json({ success: true });
};
