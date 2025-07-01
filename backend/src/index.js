import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import cookieParser from "cookie-parser"
import problemRoutes from "./routes/problem.route.js";
import authRoute from "./routes/auth.route.js"
import cors from "cors"
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.listen(PORT,()=>{
    console.log("app is listening at port")
    connectdb()
})
app.use("/api/problems", problemRoutes);
app.use("/api/auth",authRoute)