import Problem from "../models/problem.model.js";
import { execCode } from "../utils/execCode.js";
import User from "../models/user.model.js";

export const getAllProblems = async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).lean();
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    let solved = false;

    if (req.user) {
      const user = await User.findById(req.user._id).lean();
      solved = user.solvedProblems?.some(
        (pId) => pId.toString() === problem._id.toString()
      );
    }

    res.json({ ...problem, solved });
  } catch (err) {
    console.error("🔥 Problem fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const submitCode = async (req, res) => {
  try {
    const { language, code } = req.body;
    if (language !== "javascript") {
      return res.status(400).json({ error: "Only JavaScript is supported" });
    }

    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const results = [];

    for (let test of problem.testCases) {
      // Inject the test input into the code
      const injectedCode = `${code}\nconsole.log(${test.input});`;

      const result = await execCode(language, injectedCode);
      let actual = result?.run?.output ?? "";
      actual = String(actual).trim();
      const expected = String(test.expectedOutput).trim();

      const passed = actual === expected;
      results.push({ input: test.input, expected, actual, passed });

      if (!passed) {
        const user = await User.findById(req.user._id);
        user.recentSubmissions.unshift({
          title: problem.title,
          problem: problem._id,
          success: false,
        });
        user.recentSubmissions = user.recentSubmissions.slice(0, 5);
        await user.save();

        return res.json({ success: false, results });
      }
    }

    const user = await User.findById(req.user._id);
    if (!user.solvedProblems.includes(problem._id)) {
      user.solvedProblems.push(problem._id);
      user.solvedCount += 1;
    }

    user.recentSubmissions.unshift({
      title: problem.title,
      problem: problem._id,
      success: true,
    });
    user.recentSubmissions = user.recentSubmissions.slice(0, 5);
    await user.save();

    return res.json({ success: true, results });

  } catch (err) {
    console.error("🔥 Submit Code Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


