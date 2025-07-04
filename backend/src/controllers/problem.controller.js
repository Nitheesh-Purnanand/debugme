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

    const results = [];

    for (let test of problem.testCases) {
      const sourceCode = `${code}\nconsole.log(${test.input});`;

      const result = await execCode(language, sourceCode);
      let actual = result?.run?.output ?? "";
      actual = String(actual).trim();
      const expected = String(test.expectedOutput).trim();

      const passed = actual.includes(expected);
      results.push({ input: test.input, expected, actual, passed });

      if (!passed) {
        // ❗ Still record submission even if failed
        const user = await User.findById(req.user._id);
        user.recentSubmissions.unshift({
          title: problem.title,
          problem: problem._id,
          success: false,
        });
        user.recentSubmissions = user.recentSubmissions.slice(0, 5); // limit to last 5
        await user.save();

        return res.json({ success: false, results });
      }
    }

    // ✅ Passed all tests — mark as solved
    const user = await User.findById(req.user._id);
    if (!user.solvedProblems.includes(problem._id)) {
      user.solvedProblems.push(problem._id);
      user.solvedCount += 1;
    }

    // ❗ Record successful submission
    user.recentSubmissions.unshift({
      title: problem.title,
      problem: problem._id,
      success: true,
    });
    user.recentSubmissions = user.recentSubmissions.slice(0, 5); // keep only last 5

    await user.save();

    return res.json({ success: true, results });

  } catch (err) {
    console.error("🔥 Submit Code Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


