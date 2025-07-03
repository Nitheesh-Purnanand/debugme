import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants.js";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const execCode = async (language, sourcecode) => {
  try {
    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourcecode }],
    });
    return response.data;
  } catch (err) {
    console.error("⚠️ execCode failed:", err);
    return { run: { output: "" } }; // Avoid crash
  }
};

