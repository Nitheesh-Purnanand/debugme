import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import userRoutes from "./routes/user.route.js";
import discussRoutes from "./routes/discuss.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-domain.onrender.com"
    : "http://localhost:5173",
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.path}`);
  next();
});

console.log(" Mounting API Routes...");
console.log(" /api/auth");
app.use("/api/auth", authRoute);
console.log(" /api/problems");
app.use("/api/problems", problemRoutes);
console.log(" /api/leaderboard");
app.use("/api/leaderboard", leaderboardRoutes);
console.log(" /api/user");
app.use("/api/user", userRoutes);
console.log(" /api/discuss");
app.use("/api/discuss", discussRoutes);
console.log(" All API routes mounted successfully.");

if (process.env.NODE_ENV === "production") {
  console.log(" Production mode: Serving frontend...");
  const frontendPath = path.join(__dirname, "../authentication/dist");
  console.log(" Static path:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("*", (req, res, next) => {
    console.log(`[STATIC REQ] ${req.path}`);
    try {
      if (/\/:($|[^a-zA-Z])/i.test(req.path)) {
        console.log(" Malformed route blocked:", req.path);
        return res.status(400).send("Malformed route.");
      }
      res.sendFile(path.join(frontendPath, "index.html"));
    } catch (err) {
      console.log(" Error serving frontend fallback route:", err.message);
      next(err);
    }
  });
}

app.use((err, req, res, next) => {
  console.error(" Global error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  connectdb();
});
