import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
});

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  language: String,
  starterCode: String,
  testCases: [testCaseSchema],
});

export default mongoose.model("Problem", problemSchema);
