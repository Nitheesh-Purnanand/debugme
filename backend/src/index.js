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

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// __dirname is not available in ES modules directly, path.resolve() is used to get the current directory
const __dirname = path.resolve();

// Middlewares
// Parse JSON request bodies
app.use(express.json());
// Parse cookies from incoming requests
app.use(cookieParser());
// Enable CORS for cross-origin requests
app.use(cors({
  // Set the origin based on the environment (production or development)
  origin: process.env.NODE_ENV === "production"
    ? "https://your-domain.onrender.com" // Replace with your actual production domain
    : "http://localhost:5173", // Development frontend URL
  credentials: true, // Allow sending cookies with cross-origin requests
}));

// Custom middleware to log every incoming request for debugging purposes
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.path}`);
  next(); // Pass control to the next middleware or route handler
});

// ✅ API Routes
console.log("🔗 Mounting API Routes...");
// Mount authentication routes
app.use("/api/auth", authRoute);
// Mount problem-related routes
app.use("/api/problems", problemRoutes);
// Mount leaderboard routes
app.use("/api/leaderboard", leaderboardRoutes);
// Mount user-related routes (dashboard, profile, etc.)
app.use("/api/user", userRoutes);
// Mount discussion routes
app.use("/api/discuss", discussRoutes);
console.log("✅ All API routes mounted successfully.");

// ✅ Serve frontend in production environment
if (process.env.NODE_ENV === "production") {
  console.log("🌐 Serving frontend static files in production mode...");
  // Serve static files from the 'dist' directory of the frontend application
  app.use(express.static(path.join(__dirname, "../authentication/dist")));
  // For any other GET request, serve the 'index.html' file (SPA fallback)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../authentication/dist/index.html"));
  });
}

// ✅ Global error handler middleware
// This middleware catches any errors thrown by previous middleware or route handlers
app.use((err, req, res, next) => {
  console.error("💥 Global error handler caught an error:", err.stack); // Log the error stack for debugging
  // Send a 500 Internal Server Error response
  res.status(500).json({
    message: "Something broke!", // Generic error message for the client
    error: err.message, // Specific error message (can be more generic in production)
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Connect to the database when the server starts
  connectdb();
});
