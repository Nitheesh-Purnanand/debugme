import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import cookieParser from "cookie-parser"
import problemRoutes from "./routes/problem.route.js";
import authRoute from "./routes/auth.route.js"
import cors from "cors"
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import userRoutes from "./routes/user.route.js";
import path from "path"
import discussRoutes from "./routes/discuss.route.js"
dotenv.config()
const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../authentication/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../authentication","dist","index.html"))
    })
}


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.listen(PORT,()=>{
    console.log("app is listening at port")
    connectdb()
})
app.use("/api/user", userRoutes); // ✅ this ensures /api/user/dashboard exists
app.use("/api/discuss", discussRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/auth",authRoute)