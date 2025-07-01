import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import cookieParser from "cookie-parser"
import problemRoutes from "./routes/problem.route.js";
import authRoute from "./routes/auth.route.js"
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.listen(PORT,()=>{
    console.log("app is listening at port")
    connectdb()
})
app.use("/api/problems", problemRoutes);
app.use("/api/auth",authRoute)