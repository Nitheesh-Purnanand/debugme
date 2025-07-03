import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/problems",
  withCredentials: true,
});

export const getProblems = () => API.get("/");
export const getProblemById = (id) => API.get(`/${id}`);
export const submitSolution = (id, data) => API.post(`/${id}/submit`, data);
