import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "javascript",
  },
  starterCode: {
    type: String,
    required: true,
  },
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true },
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.model("Problem", problemSchema);
