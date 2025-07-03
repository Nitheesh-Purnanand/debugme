import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  testCases: [
    {
      input: String,
      expectedOutput: String,
    },
  ],
});

export default mongoose.model("Problem", problemSchema);
