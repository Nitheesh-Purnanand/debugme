import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Route imports
import authRoute from "./routes/auth.route.js"
import problemRoutes from "./routes/problem.route.js"
import leaderboardRoutes from "./routes/leaderboard.routes.js"
import userRoutes from "./routes/user.route.js"
import discussRoutes from "./routes/discuss.route.js"

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// 🔒 CORS (allow frontend)
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "https://your-domain.onrender.com" : "http://localhost:5173",
  credentials: true,
}));

// ✅ API Routes
// app.use("/api/auth", authRoute);
// app.use("/api/problems", problemRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);
// app.use("/api/user", userRoutes); // handles /dashboard and /profile/:id
// app.use("/api/discuss", discussRoutes);

// ✅ Production frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../authentication/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../authentication/dist/index.html"));
  });
}
app._router.stack.forEach((layer) => {
  if (layer.route && layer.route.path) {
    console.log("✅ Route:", layer.route.path);
  } else if (layer.name === 'router' && layer.regexp) {
    console.log("📦 Mounted Router Pattern:", layer.regexp);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectdb();
});
