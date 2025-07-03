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
  try {
    const { language, code } = req.body;
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    for (let test of problem.testCases) {
      const sourceCode = `${code}\nconsole.log(${test.input});`;

      const result = await execCode(language, sourceCode);

      let actual = result?.run?.output ?? "";
      actual = String(actual).trim();
      const expected = String(test.expectedOutput).trim();

      console.log("🧪 Test input:", test.input);
      console.log("📤 Output:", actual);
      console.log("📥 Expected:", expected);

      if (!actual.includes(expected)) {
        return res.json({ success: false, failedTest: test });
      }
    }

    // ✅ Corrected field name from 'solvedProblems' to 'solved'
    const user = await User.findById(req.user._id);
    if (!user.solved?.includes(problem._id)) {
      user.solved = user.solved || [];
      user.solved.push(problem._id);
      await user.save();
    }

    return res.json({ success: true });

  } catch (err) {
    console.error("🔥 Submit Code Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
