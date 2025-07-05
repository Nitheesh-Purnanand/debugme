import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Route imports
import authRoute from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import userRoutes from "./routes/user.route.js";
import discussRoutes from "./routes/discuss.route.js";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-domain.onrender.com"
    : "http://localhost:5173",
  credentials: true,
}));

// Log every incoming request
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.path}`);
  next();
});


console.log("🔗 Mounting Routes...");
app.use("/api/auth", authRoute);
app.use("/api/problems", problemRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes); // /dashboard & /profile/:id
app.use("/api/discuss", discussRoutes);
console.log(" All routes mounted");


if (process.env.NODE_ENV === "production") {
  console.log(" Serving frontend...");
  app.use(express.static(path.join(__dirname, "../authentication/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../authentication/dist/index.html"));
  });
}


app.use((err, req, res, next) => {
  console.error(" Global error handler:", err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  connectdb();
});
